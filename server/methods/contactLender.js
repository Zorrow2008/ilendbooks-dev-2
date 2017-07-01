Meteor.methods({
	// contactParameters should contain 
	// contactParameters.lenderUserId 
	// contactParameters.borrowerUserId 
	// contactParameters.ilendbooksId  -- (Books Id)
	contactLender(appUUID, contactParameters){
		for(var contactParametersKey in contactParameters) {
			console.log(appUUID + ":contactLender:"+ contactParametersKey + "=" +contactParameters[contactParametersKey]);
		}
		contactParameters.appUUID = appUUID;
		var lenderUserProfile = UserProfile.findOne({userId:contactParameters.lenderUserId});
		var book = Books.findOne({"_id" : contactParameters.ilendbooksId});
		var borrowerUserProfile = UserProfile.findOne({userId:contactParameters.borrowerUserId });
		var notifLink = "your notifications";
		if(book && lenderUserProfile && borrowerUserProfile) {
			for(var lenderUserProfileKey in lenderUserProfile) {
				console.log(appUUID + ":contactLender:userProfile(lender):"+ lenderUserProfileKey + "=" + lenderUserProfile[lenderUserProfileKey]);
			}
			
			//if(ilendbooks.public.contactPreference.EMAIL === lenderUserProfile.contactPreference) {
				// email the lender that someone is intrested in borrowing the book
				contactParameters.contactPreference = lenderUserProfile.contactPreference;
				contactParameters.email = lenderUserProfile.email;
				contactParameters.fromEmail = ilendbooks.private.generic.FROM_EMAIL;
				contactParameters.emailSubject = 'Intrested Borrower...',
				contactParameters.emailBody = 'A borrower would like to borrow the book ' + contactParameters.title +'. Go to ' + (Router.routes['myNotifications'].url({_id: 1}));
				for(var contactParametersKey in contactParameters) {
					console.log(appUUID + ":contactLender(email):"+ contactParametersKey + "=" + contactParameters[contactParametersKey]);
				}
				console.log(appUUID + ":contactLender:getBcc()=" + getBcc());
				console.log(appUUID + ":contactLender:start email sending ...");
		        var emailResult = Email.send({
		            to: contactParameters.email,
                    bcc: getBcc(),
		            from: contactParameters.fromEmail,
		            subject: contactParameters.emailSubject,
		            text: contactParameters.emailBody,
		            
		        });

          		console.log(appUUID + ":contactLender:email sent." + emailResult);

		        contactParameters.contactResult = emailResult;
		        contactParameters.status = ilendbooks.public.status.SUCCESS;

		        for(var contactResultKey in contactParameters.contactResult)
		        {
		        	console.log(appUUID + ":contactLender:contactResult (email):"+ contactResultKey + "=" + contactParameters.contactResult[contactResultKey]);
		        }

			if (ilendbooks.public.contactPreference.PHONE=== lenderUserProfile.contactPreference){ 
				contactParameters.contactPreference = lenderUserProfile.contactPreference;
				contactParameters.phoneNumber = lenderUserProfile.phoneNumber
				contactParameters.smsMessage = 'A borrower would like to borrow the book ' + contactParameters.title+'. Go to ' + (Router.routes['myNotifications'].url({_id: 1}));
				var smsParameters = {
					to:contactParameters.phoneNumber,
					message: contactParameters.smsMessage 
				}
				var smsResult = Meteor.call('sendSMS', appUUID, smsParameters);
				contactParameters.contactResult = smsResult;
				contactParameters.contactStatus = smsResult.status;
				contactParameters.status = ilendbooks.public.status.SUCCESS;

			} else {
				console.log(appUUID + ":contactLender: Fatal, no good, no contact preference...");
				contactParameters.contactStatus = ilendbooks.public.status.FAILED;
				contactParameters.status = ilendbooks.public.status.FAILED;

				contactParameters.contactResult = "No contact preference for this user " + contactParameters.lenderUserId;
			}

		} else {
			contactParameters.contactStatus = ilendbooks.public.status.FAILED;
			contactParameters.status = ilendbooks.public.status.FAILED;
			console.log(appUUID + ":contactLender:************************* Fatal *************************");
			console.log(appUUID + ":contactLender: Fatal, no good, not all data available");
			console.log(appUUID + ":contactLender: Fatal: lenderUserProfile = " + lenderUserProfile);
			console.log(appUUID + ":contactLender: Fatal: borrowerUserProfile = " + borrowerUserProfile);
			console.log(appUUID + ":contactLender: Fatal: book = " + book);
			console.log(appUUID + ":contactLender:************************* Fatal *************************");
		}
		Meteor.call("insertPendingTransactions", appUUID, contactParameters);
		Meteor.call("insertCorrespondence", appUUID, contactParameters.lenderUserId, contactParameters.ilendbooksId, contactParameters);
	}
});