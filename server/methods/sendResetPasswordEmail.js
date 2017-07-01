Meteor.methods({
  sendResetPasswordEmail(user) {
    let userId = Accounts.findUserByEmail(user);
    if ( userId ) {
      return Accounts.sendResetPasswordEmail( userId );
    }
  }
});