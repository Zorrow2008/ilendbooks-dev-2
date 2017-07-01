Template.selectCoursesModal.events({
  'submit form': function() {
    event.preventDefault();
    var arr = $('select.selectpicker').val()
    console.log("did i get here");
    for(var key in arr) {
      console.log("key " + key + "value: " + arr[key]);
    }
  }
});
