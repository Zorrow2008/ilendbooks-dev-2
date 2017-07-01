Meteor.methods({
	updateLenderLentDeclared(appUUID, contactParameters) { 
		contactParameters.appUUID = appUUID;
		contactParameters.statusLend = ilendbooks.public.status.LENDER_LENT_DECLARED;
	    contactParameters.statusBorrow = ilendbooks.public.status.LENDER_LENT_DECLARED;

		var lenderUserProfile = UserProfile.findOne({userId: contactParameters.lenderUserId});
		var borrowerUserProfile = UserProfile.findOne({userId: contactParameters.borrowerUserId});
		contactParameters.appUUID = appUUID;
		contactParameters.toUserId = contactParameters.lenderUserId;
		contactParameters.emailSubject =  "Borrower received book";
		for (var contactParametersKey in contactParameters) {
			console.log( appUUID 
				+ ":updateLenderLentDeclared:" 
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
			);
		}
	
		//if(ilendbooks.public.contactPreference.EMAIL === borrowerUserProfile.contactPreference) {

			contactParameters.email = borrowerUserProfile.email;
			contactParameters.contactPreference = borrowerUserProfile.contactPreference;
			contactParameters.emailBody = lenderUserProfile.fName 
		    	+ " has declared that he gave the book to you,please go online and confirm " 
		    	+ (Router.routes['myBorrows'].url({_id: 1}))  


		 if (ilendbooks.public.contactPreference.PHONE === borrowerUserProfile.contactPreference){
			contactParameters.phoneNumber = borrowerUserProfile.phoneNumber;
			contactParameters.contactPreference = borrowerUserProfile.contactPreference;
			contactParameters.smsMessage = lenderUserProfile.fName 
		    	+ " has declared that he gave the book to you,please go online and confirm " 
		    	+ (Router.routes['myBorrows'].url({_id: 1}))  
		}
		
		Meteor.call("updateStatus", appUUID, contactParameters );
		Meteor.call("contact", appUUID, contactParameters);
		Meteor.call('insertHistory', appUUID, contactParameters );
   	}
})