var ContentModel = require('../models/Content');
var PagesModel = require('../models/Pages');

module.exports = Ractive.extend({
	template: require('../../tpl/pages'),
	components: {
		navigation: require('../views/Navigation'),
		appfooter: require('../views/Footer')
	},
	data: {},
	onrender: function() {
		var model = new PagesModel();
		var self = this;
		
		var pageId = this.get('pageId');
		if(pageId) {
			var showPage = function() {
				model.getPage(pageId, function(err, result) {
					if(!err && result.pages.length > 0) {
						var page = result.pages[0];
						self.set('pageTitle', page.title);
						self.set('pageDescription', page.description);
						self.set('comments', page.comments);
						self.set('events', page.events);
					} else {
						self.set('pageTitle', 'Missing page.');
					}
				});
			}
			showPage();
		}
		
		this.on('create', function() {
			var formData = new FormData();
			formData.append('title', this.get('title'));
			formData.append('description', this.get('description'));
			model.create(formData, function(error, result) {
				if(error) {
					self.set('error', error.error);
				} else {
					self.set('title', '');
					self.set('description', '');
					self.set('error', false);
					self.set('success', 'The page was created successfully');
				}
			});
		});
		
		this.on('add-comment', function() {
			var contentModel = new ContentModel();
			var formData = new FormData();
			formData.append('text', this.get('text'));
			formData.append('pageId', pageId);
			contentModel.create(formData, function(error, result) {
				self.set('text', '');
				if(error) {
					self.set('error', error.error);
				} else {
					self.set('error', false);
					self.set('success', 'The post is saved successfully.');
				}
			});
		});
		
		this.on('add-event', function() {
			var contentModel = new ContentModel();
			var formData = new FormData();
			formData.append('text', this.get('text'));
			formData.append('eventDate', this.get('date'));
			formData.append('pageId', pageId);
			contentModel.create(formData, function(error, result) {
				self.set('text', '');
				self.set('eventDate', '');
				self.set('pageId', '');
				if(error) {
					self.set('error', error.error);
				} else {
					self.set('error', false);
					self.set('success', 'The event is saved successfully.');
				}
			});
		});
		
		var getPages = function() {
			model.fetch(function(err, result) {
				if(!err) {
					self.set('pages', result.pages);
				} else {
					self.set('error', err.error);
				}
			});
		};
		getPages();
	}
});