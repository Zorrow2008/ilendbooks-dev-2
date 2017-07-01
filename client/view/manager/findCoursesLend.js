Template.findCoursesLend.helpers({
	getUserName: function() {
		return UserProfile.findOne({userId: Meteor.userId()}).fName;
	},

	isFirstTime: function() {
		return Session.get('isFirstTime');
	}
})

Template.findCoursesLend.events({
	'click .findCourses': function() {
		Modal.show('selectCoursesModal');
	}
})