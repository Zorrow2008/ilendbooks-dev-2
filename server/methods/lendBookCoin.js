Meteor.methods({
	lendBookCoin(appUUID, lenderUserId, amount) {
		console.log(appUUID + ":lendBookCoin:amount=" + amount);
		//var currentUser = Meteor.userId();
		var lenderUseProfileDoc = UserProfile.findOne({userId: currentUser});
		console.log(appUUID + ":lendBookCoin:lenderUseProfileDoc.bookcoin=" + lenderUseProfileDoc.bookcoin);
		var newScore;
		if(lenderUseProfileDoc.bookcoin) {
			newScore = lenderUseProfileDoc.bookcoin + amount;
		} else {
			newScore = amount;
		}
		UserProfile.update({userId: currentUser}, {$set: {bookcoin: newScore}});
	}
})
