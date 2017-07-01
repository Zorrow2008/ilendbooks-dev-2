Meteor.methods({
	updateTransactionComplete(appUUID, contactParameters) {
		contactParameters.appUUID = appUUID;
		contactParameters.statusLend = ilendbooks.public.status.TRANSACTION_COMPLETE_LENDER
		contactParameters.statusBorrow = ilendbooks.public.status.TRANSACTION_COMPLETE;

		Meteor.call("updateStatus", appUUID, contactParameters );
		//Meteor.call("contact", appUUID, contactParameters);
		Meteor.call('insertHistory', appUUID, contactParameters );
	}
})