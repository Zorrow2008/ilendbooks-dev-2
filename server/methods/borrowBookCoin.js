Meteor.methods({
	borrowBookCoin(appUUID, borrowerUserId,  amount) {
		console.log(appUUID + ":borrowBookCoin:amount=" + amount);
		//var currentUser = Meteor.userId();
		var borrowerUseProfileDoc = UserProfile.findOne({userId: currentUser});
		console.log(appUUID + ":borrowBookCoin:borrowerUseProfileDoc.bookcoin=" + borrowerUseProfileDoc.bookcoin);
		var newScore;
		if(borrowerUseProfileDoc.bookcoin) {
			newScore = borrowerUseProfileDoc.bookcoin + amount;
		} else {
			newScore = amount;
		}
		UserProfile.update({userId: currentUser}, {$set: {bookcoin: newScore}});
	}
})
