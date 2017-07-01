Template.verifiedUser.helpers({
   isVerifiedUser: function() {
      var userProfile = UserProfile.findOne({userId: Meteor.userId()});
      return userProfile && Meteor.user().emails[ 0 ].verified;
   },

   isUser:function() {
      var userProfile = UserProfile.findOne({userId: Meteor.userId()});
      return userProfile;
   }
})