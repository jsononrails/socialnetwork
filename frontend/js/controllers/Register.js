module.exports = Ractive.extend({
	template: require('../../tpl/register'),
	components: {
		navigation: require('../views/Navigation'),
		appfooter: require('../views/Footer')
	},
	onrender: function() {
		var self = this;
		this.observer('firstName', userModel.setter('value.firstName'));
		this.observer('lastName', userModel.setter('value.lastName'));
		this.observer('email', userModel.setter('value.email'));
		this.observer('password', userModel.setter('value.password'));
		this.on('register', function() {
			userModel.create(function(error, result) {
				if(error) {
					self.set('error', error.error);
				} else {
					self.set('error', false);
					self.set('success', 'Registration successful. Click <a href="/login">here</a> to login.');
				}
			});
		});
	}
});