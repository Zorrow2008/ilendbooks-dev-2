Meteor.methods({
	updateUserBookRemoved: function(appUUID, contactParameters) {

		var userProfile = UserProfile.findOne({userId: Meteor.userId()});
		var book = Books.findOne({"_id":contactParameters.ilendbooksId });

		contactParameters.appUUID = appUUID;
		contactParameters.toUserId = Meteor.userId();
	    contactParameters.lenderUserId=Meteor.userId();
	    contactParameters.statusLend = ilendbooks.public.status.REMOVED;
	    contactParameters.statusBorrow = "";
	    contactParameters.bookCoin = ilendbooks.private.bitCoin.REMOVE_ONE_BOOK;
		contactParameters.emailSubject =  "Book removed from your shelf!";

		for (var contactParametersKey in contactParameters) {
		
			console.log(appUUID 
				+ ":updateUserBookRemoved:"
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
				);
		}

		//if(ilendbooks.public.contactPreference.EMAIL === userProfile.contactPreference) {

			contactParameters.email = userProfile.email;
			contactParameters.contactPreference = userProfile.contactPreference;
			contactParameters.emailBody = "Would like let you know that the below book is removed from your shelf:"
		    	+ "\n"
		    	+ book.ItemAttributes[0].Title[0]; 

		if (ilendbooks.public.contactPreference.PHONE === userProfile.contactPreference){
			contactParameters.phoneNumber = userProfile.phoneNumber;
			contactParameters.contactPreference = userProfile.contactPreference;
			contactParameters.smsMessage = "Would like let you know that the below book is removed from your shelf:"
		    	+ "\n"
		    	+ book.ItemAttributes[0].Title[0]; 
		}

		Meteor.call('updateStatus', appUUID, contactParameters);
		Meteor.call('contact', appUUID, contactParameters);
		Meteor.call('insertHistory', appUUID, contactParameters);
		Meteor.call('addBookcoin', appUUID, contactParameters.lenderUserId, contactParameters.bookCoin);
	}
})
