Template.displayCourseBooks.helpers({
	getCourses: function() {
		return Session.get('classes');
	},
  	getTextbooks: function(course) {
	    var textbookDoc = Textbooks.findOne({course: course});
	    return textbookDoc.textbooks;
  }
})

Template.displayCourseBooks.events({
	'click .finished': function() {
		console.log("displayCourseBooks: " + Session.get('userType'))
		Meteor.call('updateQuarterTrackerStatus',Session.get('userType'));
	}
})