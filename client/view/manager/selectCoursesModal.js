Template.selectCoursesModal.events({
  'submit form': function() {
    event.preventDefault();
    var classes = $('select.selectpicker').val()
    console.log("did i get here");
    for(var key in classes) {
      console.log("key " + key + "value: " + classes[key]);
    }
    Session.set('classes', classes);
  }
});
