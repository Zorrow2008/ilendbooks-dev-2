Template.feedback.events({
   'submit form': function(event) {
      event.preventDefault();  
      var feedback = event.target.feedback.value;
      var appUUID = Session.get('appUUID');
      var userId = Meteor.userId();
      var userInfo = {
      	userId : userId,
      	feedback : feedback,
  
      }
      Meteor.call('submitFeedBack', appUUID, userInfo);
      console.log("feedback received");
      Modal.hide('feedback');
      Bert.alert( 'Your feedback is highly appreciated!', 'success' );
   }
})