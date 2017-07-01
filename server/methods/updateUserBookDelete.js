Meteor.methods({
	updateUserBookDelete: function(appUUID, contactParameters) {
		contactParameters.statusLend = ilendbooks.public.status.DELETE;
		contactParameters.lenderUserId = Meteor.userId();
		var userProfile = UserProfile.findOne({userId: Meteor.userId()});
		var book = Books.findOne({"_id":contactParameters.ilendbooksId});
		contactParameters.appUUID = appUUID;
		contactParameters.toUserId = Meteor.userId();
		contactParameters.emailSubject =  "Book deleted from your shelf!";

		for (var contactParametersKey in contactParameters) {
		
			console.log(appUUID 
				+ ":updateUserBookDelete:"
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
				);
		}

		//if(ilendbooks.public.contactPreference.EMAIL === userProfile.contactPreference) {

			contactParameters.email = userProfile.email;
			contactParameters.contactPreference = userProfile.contactPreference;
			contactParameters.emailBody = "Would like let you know that the below book is deleted from your shelf:"
		    	+ "\n"
		    	+ book.ItemAttributes[0].Title[0]; 

		 if (ilendbooks.public.contactPreference.PHONE === userProfile.contactPreference){
			contactParameters.phoneNumber = userProfile.phoneNumber;
			contactParameters.contactPreference = userProfile.contactPreference;
			contactParameters.smsMessage = "Would like let you know that the below book is deleted from your shelf:"
		    	+ "\n"
		    	+ book.ItemAttributes[0].Title[0]; 
		}

		Meteor.call('updateStatus', appUUID, contactParameters);
		Meteor.call('contact', appUUID, contactParameters);
		Meteor.call('insertHistory', appUUID, contactParameters);
		
	}
})