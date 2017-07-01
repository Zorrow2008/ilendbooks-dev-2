Template.forgotPassword.events({
   
   'submit form': function(event){
      event.preventDefault();
      Meteor.call( 'sendResetPasswordEmail', $('[name=emailAddress]').val(), ( error, response ) => {
         if ( error ) {
            Bert.alert( error.reason, 'danger' );
         } else {
            let email = $('[name=emailAddress]').val();//Meteor.user().emails[ 0 ].address;
            Bert.alert( `Verification sent to ${ email }!`, 'success' );
         }
      });
   },
})