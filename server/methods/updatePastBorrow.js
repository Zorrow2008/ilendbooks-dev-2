Meteor.methods({
	updatePastBorrow(appUUID, contactParameters) {
		contactParameters.statusBorrow = ilendbooks.public.status.PAST_BORROW;
		for (var contactParametersKey in contactParameters) {
			console.log( appUUID 
				+ ":updatePastBorrow:" 
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
			);
		}
		Meteor.call("insertLenderReview", appUUID, contactParameters)
		Meteor.call('updateStatus', appUUID, contactParameters)
		Meteor.call('insertHistory', appUUID, contactParameters );
	}
})