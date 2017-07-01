Meteor.methods({
  	createUserProfile(appUUID, userProfile) {
		for (var userProfileKey in userProfile) {
			console.log( appUUID 
				+ ":createUserProfile:" 
				+ userProfileKey + "=" + userProfile[userProfileKey]
			);
		}

	    Meteor.call("insertUserProfile", appUUID, userProfile );
	    Meteor.call("insertInitialReview", appUUID );
	}

});