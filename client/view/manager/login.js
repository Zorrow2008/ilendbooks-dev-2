Template.login.events({
   'submit form': function(event){
      event.preventDefault();
      var email = $('[name=emailAddress]').val();
      var password = $('[name=password]').val();
      Meteor.loginWithPassword(email, password, function(){
         if (Meteor.user()) {
            console.log("You initiated login process.");
            if(Session.get('backPath')) {
               Router.go('/' + Session.get('backPath'));
               delete Session.keys['backPath'];
            }else{
               Router.go('userHome');
            }
         }else{
            Bert.alert( 'User or password is incorrect', 'danger' );
            document.getElementById("password").style.borderColor="red"
            document.getElementById("user").style.borderColor="red"
         }
      });
   },
   
   'click .resend-verification-link' ( event, template ) {
      Meteor.call( 'sendVerificationLink', ( error, response ) => {
         if ( error ) {
            Bert.alert( error.reason, 'danger' );
         } else {
            let email = Meteor.user().emails[ 0 ].address;
            Bert.alert( `Verification sent to ${ email }!`, 'success' );
         }
      });
   },
   
   'click .sendResetPasswordEmail': function() {
      Router.go('forgotPassword');
   }
})
