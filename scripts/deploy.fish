#!/usr/local/bin/fish

#
# This script "deploys" changes by commiting a freshly built snapshot of all
# build artifacts in the docs/ folder.
#
# NOTE: This script relies on the assumption that timing issues with conccurrent
#       commits can be neglected. This assumption is built on the fact that there
#       is only a single collaborator on the repository. If this changes, the
#       script should not be used as it relies on changing history on the remote.
#

#
# Setup and helpers
#

# The deployment directory.
set dir docs/

# Helper function for setting assume-unchanged; makes for DRYer code.
function ignore_changes
  git ls-files $argv | tr '\n' ' ' | xargs git update-index --assume-unchanged
end

# Echo with a preceding newline.
function print
  echo ''
  echo $argv
end

# Print and exit
function fail
  print $argv
  echo ''
  exit 1
end

# Checks if there are no changes or untracked files present.
function repository_is_clean
  test -z (git status -s)
end

function print_success
  print "Deployment was a success! 😍"

  print "Latest commits:"
  git log -n 5 --oneline

  print "Repository status:"
  if repository_is_clean
    echo 'clean'
  else
    git status -s
  end

  print 'Run'
  print '  git push -f'
  print 'when you\'re satisfied everything went well. 👍'
end

# Removes a file or directory from all of history.
function prune_from_history
  git filter-branch \
    --force \
    --index-filter "git rm -r --ignore-unmatch $argv" \
    --prune-empty \
    --tag-name-filter cat -- --all
end

# Checks if there are remote changes not in the local repository
function is_up_to_date_with_remote
  git fetch
  test (git merge-base @ '@{upstream}') = (git rev-parse '@{upstream}')
end


#
# Sanity checks
#

print "Making some sanity checks..."

# Make sure we're in the correct directory before running this script.
if not cat ./package.json | grep --quiet '"name": "Hemmalaget"'
  print "You're probably in the wrong directory; aborting. 😱"
  echo "You should be in the project root for hemmalaget."
  echo "Current position:" (pwd)
  echo ''
  exit 1
end

# Check if there are unstaged changes present and exit early if there are.
# Generally, all changes outside of $dir should be committed before deploying.
if not repository_is_clean
  print "There are unstaged changes; aborting. 😨"
  echo ''
  git status -s
  echo ''
  exit 1
end

# Ensure that the local repository is up to date with the remote.
if not is_up_to_date_with_remote
  fail "Remote has changes not in local repository; aborting. 😰"
end

# Take care to only deploy on the master branch.
if not git rev-parse --abbrev-ref HEAD | grep --quiet 'master'
  fail "You should only deploy on the master branch; aborting. 🙀"
end

echo "... everything seems ok!"
echo ''


#
# Start of script
#

# Remove any references to $dir from all of history.
# This prevents unnecessarily storing duplicate artifacts as any generated files
# can be regenerated from the source files.
git filter-branch --force --index-filter "git rm -r --ignore-unmatch $dir" --prune-empty --tag-name-filter cat -- --all

# Tell git to notice changes in the $dir directory.
git ls-files $dir | tr '\n' ' ' | xargs git update-index --no-assume-unchanged

# Regenerate the build artifacts.
./node_modules/yarn/bin/yarn run build

# Make sure everything built correctly before continuing
if not test $status -eq 0
  print "There was a problem building the project 😿"
  ignore_changes $dir
  echo ''
  exit 1
end

# Make a commit saving a snapshot of the $dir folder.
git add $dir
git commit -m "Deploy generated files to $dir"

# Tell git to ignore changes in $dir folder
ignore_changes $dir

# Notify the user that everything went well.
print_success
