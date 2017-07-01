Meteor.methods({
	submitFeedBack(appUUID, userInfo) {
		console.log("submitFeedBack reached");
		Feedback.insert({
			userId: userInfo.userId,
			feedback: userInfo.feedback,
			dateTime: Meteor.call('getLocalTime')
		});
	}
})