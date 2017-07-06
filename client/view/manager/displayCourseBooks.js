Template.displayCourseBooks.helpers({
	getCourses: function() {
		return Session.get('classes');
	},
  	getTextbooks: function(course) {
	    var textbookDoc = Textbooks.findOne({course: course});
	    return textbookDoc.textbooks;
  }
})