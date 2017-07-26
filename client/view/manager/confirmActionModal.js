Template.confirmActionModal.events({
	'click .lend': function() {
		console.log("displayCourseBooks: " + Session.get('userType'))
		Meteor.call('updateQuarterTrackerStatus',Session.get('userType'));
	},

	
})

Template.confirmActionModal.helpers({
	getModalTitle: function() {
      return Session.get(ilendbooks.public.modal.TITLE);
   	},

   	getModalBodyArray: function() {
      return Session.get(ilendbooks.public.modal.BODY_ARRAY);
   	},

})