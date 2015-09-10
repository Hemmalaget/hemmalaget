$ = require 'jquery'

$('a[href^="#"]').on 'click', (event) ->
	event.preventDefault()
	menuHeight = $('#navigation').height()
	target = $($(event.target).attr 'href')
	$('html, body').animate { scrollTop: target.offset().top - menuHeight }, 500
