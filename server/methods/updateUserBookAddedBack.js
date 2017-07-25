Meteor.methods({
	updateUserBookAddedBack: function(appUUID, ilendbooksId ) {
		console.log(appUUID + ":updateUserBookAddedBack:ilendbooksId="+ ilendbooksId);

		var userProfile = UserProfile.findOne({userId: Meteor.userId()});
		var book = Books.findOne({"_id":ilendbooksId});
		var contactParameters = {};
		contactParameters.appUUID = appUUID;
		contactParameters.toUserId = Meteor.userId();
	    contactParameters.ilendbooksId=ilendbooksId;
	    contactParameters.lenderUserId=Meteor.userId();
	    contactParameters.statusLend = ilendbooks.public.status.AVAILABLE;
	    contactParameters.statusBorrow = "";
	    contactParameters.bookCoin = ilendbooks.private.bitCoin.ADDONE_BOOK;
		contactParameters.emailSubject =  "Book added back to  shelf!";

		for (var contactParametersKey in contactParameters) {
		
			console.log(appUUID 
				+ ":updateUserBookAddedBack:"
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
				);
		}

		//if(ilendbooks.public.contactPreference.EMAIL === userProfile.contactPreference) {

			contactParameters.email = userProfile.email;
			contactParameters.contactPreference = userProfile.contactPreference;
			contactParameters.emailBody = "Would like let you know that the below book is added back to  your shelf:"
		    	+ "\n"
		    	+ book.ItemAttributes[0].Title[0]; 

		if (ilendbooks.public.contactPreference.PHONE === userProfile.contactPreference){
			contactParameters.phoneNumber = userProfile.phoneNumber;
			contactParameters.contactPreference = userProfile.contactPreference;
			contactParameters.smsMessage = "Would like let you know that the below book is added back to  your shelf:"
		    	+ "\n"
		    	+ book.ItemAttributes[0].Title[0]; 
		}


	    
		Meteor.call('updateStatus', appUUID, contactParameters);
		Meteor.call('contact', appUUID, contactParameters);
		Meteor.call('insertHistory', appUUID, contactParameters);
		//Meteor.call('addBookcoin', appUUID, contactParameters.lenderUserId, contactParameters.bookCoin);
	}
})
