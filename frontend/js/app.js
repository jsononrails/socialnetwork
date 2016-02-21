// frontend/js/app.js
var Router = require('./lib/Router')();

// routes
var Home = require('./controllers/Home');
var Register = require('./controllers/Register');

// models
var UserModel = require('./models/User');

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
	
	// create global user model
	userModel = new UserModel();
	
	body = document.querySelector('body');
	
	Router
	.add('home', function() {
		var p = new Home();
		showPage(p);
	})
	.add(function() {
		Router.navigate('home');
	})
	.listen()
	.check();
	
	Router
	.add('register', function() {
		var p = new Register();
		showPage(p);
	})
}