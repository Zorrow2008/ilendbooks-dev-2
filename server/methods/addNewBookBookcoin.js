Meteor.methods({
	addNewBookBookcoin(appUUID, amount) {
		console.log(appUUID + ":addNewBookBookcoin:amount=" + amount);
		var currentUser = Meteor.userId();
		var currentUserProfileDoc = UserProfile.findOne({userId: currentUser});
		console.log(appUUID + ":addNewBookBookcoin:currentUserProfileDoc.bookcoin=" + currentUserProfileDoc.bookcoin);
		var newScore;
		if(currentUserProfileDoc.bookcoin) {
			newScore = currentUserProfileDoc.bookcoin + amount;
		} else {
			newScore = amount;
		}
		UserProfile.update({userId: currentUser}, {$set: {bookcoin: newScore}});
	}
})
