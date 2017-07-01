Meteor.methods({
	updateAvailable(appUUID, contactParameters) {
	    var updateStatusInfo = {
	    	status : ilendbooks.public.status.AVAILABLE,
	    	ilendbooksId : contactParameters.ilendbooksId,
	    	lenderUserId : contactParameters.lenderUserId,
	    	borrowerUserId : contactParameters.borrowerUserId
	    }
		Meteor.call("updateStatus", appUUID, updateStatusInfo );
		Meteor.call('insertHistory', appUUID, updateStatusInfo );
	}
})