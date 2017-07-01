Meteor.methods({
	updateBorrowerLentReceived(appUUID, contactParameters) {   
		console.log(appUUID +':contactParameters='+ contactParameters);
		contactParameters.appUUID = appUUID;
		contactParameters.statusBorrow = ilendbooks.public.status.BORROWER_LENT_RECEIVED;
		contactParameters.statusLend = ilendbooks.public.status.BORROWER_LENT_RECEIVED;
	

		var lenderUserProfile = UserProfile.findOne({userId: contactParameters.lenderUserId});
		var borrowerUserProfile = UserProfile.findOne({userId: contactParameters.borrowerUserId});
		contactParameters.appUUID = appUUID;
		contactParameters.toUserId = contactParameters.lenderUserId;
		contactParameters.emailSubject =  "Borrower received book";

		for (var contactParametersKey in contactParameters) {
			console.log( appUUID 
				+ ":updateBorrowerLentReceived:" 
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
			);
		}

		//if(ilendbooks.public.contactPreference.EMAIL === lenderUserProfile.contactPreference) {

			contactParameters.email = lenderUserProfile.email;
			contactParameters.contactPreference = lenderUserProfile.contactPreference;
			contactParameters.emailBody = borrowerUserProfile.fName 
		    	+ " has declared that he received the book from you,please go online and confirm " 
		    	+ (Router.routes['myShelf'].url({_id: 1}))  


		if (ilendbooks.public.contactPreference.PHONE === lenderUserProfile.contactPreference){
			contactParameters.phoneNumber = lenderUserProfile.phoneNumber;
			contactParameters.contactPreference = lenderUserProfile.contactPreference;
			contactParameters.smsMessage = borrowerUserProfile.fName 
		    	+ " has declared that he received the book from you,please go online and confirm " 
		    	+ (Router.routes['myShelf'].url({_id: 1}))  
		}

		Meteor.call("updateStatus", appUUID, contactParameters );
		Meteor.call("contact", appUUID, contactParameters);
		Meteor.call('insertHistory', appUUID, contactParameters );
   	}
})
