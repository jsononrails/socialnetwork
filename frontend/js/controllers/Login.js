// frontend/js/controllers/Login.js
module.exports = Ractive.extend({
	template: require('../../tpl/login'),
	components: {
		navigation: require('../views/Navigation'),
		appfooter: rquire('../views/Footer')
	},
	onrender: function() {
		var self = this;
		this.observer('email', userModel.setter('email'));
		this.observer('password', userModel.setter('password'));
		this.on('login', function() {
			userModel.login(function(error, result) {
				if(error)
					self.set('error', error.error);
				else {
					self.set('error', false);
					// redirect user to homepage
					window.location.href = '/';
				}
			});
		});
	}
});