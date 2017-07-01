Meteor.methods({
  	insertUserProfile(appUUID, userProfile) {
		for (var userProfileKey in userProfile) {
			console.log( appUUID 
				+ ":insertUserProfile:" 
				+ userProfileKey + "=" + userProfile[userProfileKey]
			);
		}

      	UserProfile.insert({
	         userId: Meteor.userId(),
	         fName: userProfile.firstName,
	         lName: userProfile.lastName,
	         studentID: userProfile.studentID,
	         phoneNumber : userProfile.phoneNumber,
	         email: Meteor.user().emails[0].address,
	         contactPreference: userProfile.contactPreference,
	         degree: userProfile.degree,
	         bookcoin: ilendbooks.private.bitCoin.ACCOUT_CREATION
      	});
  	}
});