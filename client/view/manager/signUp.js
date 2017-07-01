Template.signup.events({
   'submit form': function(event, template) {
      event.preventDefault();
      var validationPassword = template.find( '[name="password2"]' ).value.trim();
      let user = {
         // email: template.find( '[name="emailAddress"]' ).value + "@uw.edu",
         email: template.find( '[name="emailAddress"]' ).value.trim(),
         password: template.find( '[name="password"]' ).value.trim()
         
      };
      var goodToCreateAccount = true;
      var alertMeassage = [];
      if ("@uw.edu" != user.email.slice(-7) && ! isAllowedAccount(user.email)) {
         $('#email-text-div').addClass("has-error has-feedback");
         $('#email-error-glyphicon').removeClass("error-mesage-display-none");
         var email_error_message = $("#email-error-message");
         email_error_message.removeClass("error-mesage-display-none");
         email_error_message.addClass("error-mesage-display");
         alertMeassage.push('At this time only "UW" email id with "@uw.edu" is supported');
         goodToCreateAccount = false;
      } else{
         $("#email-error-message").addClass("error-mesage-display-none");
         $('#email-text-div').removeClass("has-error has-feedback");
         $('#email-error-glyphicon').addClass("error-mesage-display-none");
      }

      if( validationPassword != user.password ) {
         $('#password-one-text-div').addClass("has-error has-feedback");
         $('#password-two-text-div').addClass("has-error has-feedback");
         $('#password-one-error-glyphicon').removeClass("error-mesage-display-none");
         $('#password-two-error-glyphicon').removeClass("error-mesage-display-none");
         var password_no_match_error_message = $("#password-no-match-error-message");
         password_no_match_error_message.removeClass("error-mesage-display-none");
         password_no_match_error_message.addClass("error-mesage-display");
         goodToCreateAccount = false;
         alertMeassage.push("Entered password values didn't match, please make sure they match.");
      } else {
         $("#password-no-match-error-message").addClass("error-mesage-display-none");
         $('#password-one-text-div').removeClass("has-error has-feedback");
         $('#password-two-text-div').removeClass("has-error has-feedback");
         $('#password-one-error-glyphicon').addClass("error-mesage-display-none");
         $('#password-two-error-glyphicon').addClass("error-mesage-display-none");
      }

      console.log($('#terms-condions-agree').is(':checked'));
      if( ! $('#terms-condions-agree').is(':checked'))
      {
         var terms_error_message = $("#terms-error-message");
         terms_error_message.removeClass("error-mesage-display-none");
         terms_error_message.addClass("error-mesage-display");
         goodToCreateAccount = false;
         alertMeassage.push('Please accept terms and condition by checking the box below.');
      } else {
         $("#terms-error-message").addClass("error-mesage-display-none")
      }

      if (! goodToCreateAccount)
      {
         var bertAlertMeassage="";
         for (var key in alertMeassage)
         {
            bertAlertMeassage += alertMeassage[key]
            bertAlertMeassage += '\n';
         }
         Bert.alert(bertAlertMeassage, 'danger')
      }


      if (goodToCreateAccount) {
         Accounts.createUser( user, ( error ) => {
            if ( error ) {
               Bert.alert( error.reason, 'danger' );

            } else {
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
         });
      }  
   },

   'click .terms':function() {
      Modal.show('termsAndConditions');
   }
});
//Make it only for UW email ----> should display an error when non-uw.edu signs up
//drop down for current degree
//drop down for Major - use tags
// ex: Economics book --> economics, firstyear, etc.
// amazong url api , adding book to list---> 1) search for name book if its in website
// 2)provide amazon url, 3)type in ISBN number
// url scrapers, prove url, call them, and gives all text from the page they findff
