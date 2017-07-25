Template.searchResults.helpers({
   
   getSearchResults:function() {
      var searchResult = Session.get('SearchResult');
      return searchResult.results;    
   },
//<<<<<<< HEAD

   isVerifiedUser: function() {
      var userProfile = UserProfile.findOne({userId: Meteor.userId()});
      return userProfile && Meteor.user().emails[ 0 ].verified;
   },

   isUser:function() {
      var userProfile = UserProfile.findOne({userId: Meteor.userId()});
      return userProfile;
   },

   getRowStartEnd:function(index) {
    var result = "";
    if (index === 0){
      result = "<div>";
    } else if (index % 4 === 0) {
      result = "</div><div>";
    } 
    console.log(`getRowStartEnd:result=${result}`);
    return result;
   }
})

Template.searchResults.events({
	'click .resend-verification-link':function(event, template) {
       Meteor.call( 'sendVerificationLink', ( error, response ) => {
          if ( error ) {
             Router.go('login');
             Bert.alert( error.reason, 'danger' );
          } else {
             Bert.alert( 'Welcome!', 'success' );
             Router.go('verificationEmailSent');
          }
       });
	}

   
//>>>>>>> ba210b31acc8a5965af80cbc84097d1e1c53de42
})
