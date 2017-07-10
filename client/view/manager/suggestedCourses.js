Template.suggestedCourses.helpers({
  selectedCourses: function() {
    return Session.get('classes');
  }
})