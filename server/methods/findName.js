Meteor.methods({
   'findName': function(){
      userProfile = UserProfile.findOne({userID: Meteor.userID()})
      
      console.log(userProfile);
   }
})