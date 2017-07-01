Accounts.emailTemplates.siteName = "ilendbooks";
Accounts.emailTemplates.from     = ilendbooks.private.generic.FROM_EMAIL;

Accounts.emailTemplates.verifyEmail = {
   subject() {
      return "[ilendbooks] Verify Your Email Address";
   },
   text( user, url ) {
      let emailAddress   = user.emails[0].address,
      urlWithoutHash = url.replace( '#/', '' ),
      supportEmail   = "ilendbooksofficial@gmail.com",
      emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;
      
      return emailBody;
   }
};