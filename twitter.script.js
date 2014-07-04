(function($) {
	console.log($('li.profile > a.js-nav').attr('href'));

	var username = $('li.profile > a.js-nav').attr('href').substr(1);

	console.log(username);

	console.log('hello');

	return username;
})(jQuery);