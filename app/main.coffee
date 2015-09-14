$ = require 'jquery'

$('a[href^="#"]').on 'click', (event) ->
	event.preventDefault()
	target = $($(event.target).attr 'href')
	$('.navigation').addClass('hide_nav')
	if $('#fixed').css('display') == 'none'
		offset = 0
	else
		offset = $('#fixed').height()
	$('html, body').animate { scrollTop: target.offset().top - offset }, 500

$('#nav_button').on 'click', (event) ->
	event.preventDefault()
	console.log 'Hello'
	$('.navigation').toggleClass('hide_nav')
