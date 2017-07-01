Meteor.methods({
	updateWithBorrower(appUUID, contactParameters) {   
		contactParameters.appUUID = appUUID;
		contactParameters.statusLend = ilendbooks.public.status.WITH_BORROWER;
		contactParameters.statusBorrow = ilendbooks.public.status.BORROWED;
	

		 var lenderUserProfile = UserProfile.findOne({userId: contactParameters.lenderUserId});
		 var borrowerUserProfile = UserProfile.findOne({userId: contactParameters.borrowerUserId});
		 contactParameters.appUUID = appUUID;
		 contactParameters.toUserId = contactParameters.lenderUserId;
		 contactParameters.emailSubject =  "Status changed to with borrower";
		for (var contactParametersKey in contactParameters) {
			console.log( appUUID 
				+ ":updateWithBorrower:" 
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
			);
		}

		// if(ilendbooks.public.contactPreference.EMAIL === borrowerUserProfile.contactPreference) {

		 	contactParameters.email = borrowerUserProfile.email;
		 	contactParameters.contactPreference = borrowerUserProfile.contactPreference;
		 	contactParameters.emailBody = lenderUserProfile.fName 
		     	+ "'s status has changed to \"With Borrower\"";
     	 if (ilendbooks.public.contactPreference.PHONE === borrowerUserProfile.contactPreference){
		 	contactParameters.phoneNumber = borrowerUserProfile.phoneNumber;
			contactParameters.contactPreference = borrowerUserProfile.contactPreference;
		 	contactParameters.smsMessage = lenderUserProfile.fName 
		     	+ "'s status has changed to \"With Borrower\"";  
		 }

		 Meteor.call("updateStatus", appUUID, contactParameters);
		 Meteor.call("contact", appUUID, contactParameters);
		 Meteor.call('insertHistory', appUUID, contactParameters);
		 Meteor.call('addBookcoin', appUUID, contactParameters.lenderUserId, ilendbooks.private.bitCoin.LEND_BOOK)
		 Meteor.call('addBookcoin', appUUID, contactParameters.borrowerUserId, ilendbooks.private.bitCoin.BORROW_BOOK)
   	}
})