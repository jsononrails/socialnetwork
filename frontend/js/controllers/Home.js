var ContentModel = require('../models/Content');
var Friends = require('../models/Friends');

module.exports = Ractive.extend({
  template: require('../../tpl/home'),
  components: {
    navigation: require('../views/Navigation'),
    appfooter: require('../views/Footer')
  },
  data: {
    posting: true
  },
  onrender: function() {
    if(userModel.isLogged()) {
      var model = new ContentModel();
	  var friends = new Friends();
	
	  friends.fetch(function(err, result) {
	  	if(err) { throw err; }
		self.set('friends', result.friends);
	  });
	
      var self = this;
this.on('post', function() {
  var files = this.find('input[type="file"]').files;
  var formData = new FormData();
  if(files.length > 0) {
    var file = files[0];
    if(file.type.match('image.*')) {
      formData.append('files', file, file.name);
    }
  }
  formData.append('text', this.get('text'));
  formData.append('taggedFriends', JSON.stringify(this.get('taggedFriends')));
  model.create(formData, function(error, result) {
    self.set('text', '');
    if(error) {
      self.set('error', error.error);
    } else {
      self.set('error', false);
      self.set('success', 'The post is saved successfully.<br />What about adding another one?');
      getPosts();
    }
  });
});

this.on('share', function(e, id) {
	var formData = new FormData();
	formData.append('postId', id);
	model.sharePost(formData, getPosts);
});

      var getPosts = function() {
        model.fetch(function(err, result) {
          if(!err) {
            self.set('posts', result.posts);
          }
        });
      };

      getPosts();
    } else {
      this.set('posting', false);
    }
  }
});