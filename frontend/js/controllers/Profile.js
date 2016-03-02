var Friends = require('../models/Friends');

module.exports = Ractive.extend({
	template: require('../../tpl/profile'),
	components: {
		navigation: require('../views/Navigation'),
		appfooter: require('../views/Footer')
	},
	data: {
		friends: []
	},
	onrender: function() {
		var friends = new Friends();
		var self = this;
		this.set(userModel.get('value'));
		this.on('updateProfile', function() {
			userModel.set('value.firstName', this.get('firstName'));
			userModel.set('value.lastName', this.get('lastName'));
			if(this.get('password') != '') {
				userModel.set('value.password', this.get('password'));
			}
			userModel.save(function(error, result) {
				if(error)
					self.set('error', error.error);
				else {
					self.set('error', false);
					self.set('success', 'Profile updated successfully.');
				}
			});
		});
		
		friends.fetch(function(err, result) {
			self.set('friends', result.friends); 
		});
	}
});