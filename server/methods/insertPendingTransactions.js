
Meteor.methods({
	insertPendingTransactions(appUUID, contactParameters){

		for (var contactParametersKey in contactParameters) {
			console.log( appUUID 
				+ ":insertPendingTransactions:" 
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
			);
		}
		PendingTransactions.insert({
			lenderUserId: contactParameters.lenderUserId,
			borrowerUserId: contactParameters.borrowerUserId,
			ilendbooksId: contactParameters.ilendbooksId,
			statusLend:contactParameters.statusLend,
			statusBorrow:contactParameters.statusBorrow,
			contactParameters: contactParameters
		});
	}

});
