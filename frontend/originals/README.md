# Original images

Unmodified source images for the photos in `public/`.

## Hero photo

`public/header.jpg` is made from `header-tinted.png`, the mint-tinted crop of
`header.png`. Its tint is matched to `--mint-dark` in `app/globals.css`, so
the hero's fade has no seam. After changing `--mint-chroma`, regenerate it and
adjust the second `-modulate` value until the photo's bottom edge matches
`--mint-dark`:

```sh
magick originals/header-tinted.png -resize 1800x -modulate 100,119,101 -quality 82 -strip public/header.jpg
```
