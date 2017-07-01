Meteor.methods({
	updatePastLend(appUUID, contactParameters) {
		contactParameters.statusLend = ilendbooks.public.status.PAST_LEND;
		for (var contactParametersKey in contactParameters) {
			console.log( appUUID 
				+ ":updatePastLend:" 
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
			);
		}
		Meteor.call("insertBorrowerReview", appUUID, contactParameters)
		Meteor.call('updateStatus', appUUID, contactParameters)
		Meteor.call('insertHistory', appUUID, contactParameters );
	}
})