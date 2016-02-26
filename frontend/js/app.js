// frontend/js/app.js
var Router = require('./lib/Router')();

// controller references for routes
var Home 			= require('./controllers/Home');
var Register 		= require('./controllers/Register');
var Profile 		= require('./controllers/Profile');
var FindFriends 	= require('./controllers/FindFriends');

// models
var UserModel 		= require('./models/User');

var currentPage;
var body;

var showPage = function(newPage) {
	if(currentPage) currentPage.teardown();
	currentPage = newPage;
	body.innerHTML = '';
	currentPage.render(body);
	currentPage.on('navigation.goto', function(e, route) {
		Router.navigate(route);
	});
}

window.onload = function() {
	body = document.querySelector('body');
	
	// user model for route authentication
	userModel = new UserModel();
	userModel.fetch(function(error, result) {
		
		// routes
		Router
		.add('home', function() {
			var p = new Home();
			showPage(p);
		})
		.add('register', function() {
			var p = new Register();
			showPage(p);
		})
		.add('login', function() {
			var p = new Login();
			showPage(p);
		})
		.add('profile', function() {
			if(userModel.isLogged()) {
				var p = new Profile();
				showPage(p);
			} else {
				Router.navigate('login');
			}
		})
		.add('find-friends', function() {
			if(userModel.isLogged()) {
				var p = new FindFriends();
				showPage(p);
			} else {
				Router.navigate('login');
			}
		})
		.add(function() {
			Router.navigate('home');
		})
		.listen()
		.check();
		
	});
}