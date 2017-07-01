Meteor.methods({
    // contactParameters object should ccontain
    // 1. contactParameters.contactPreference - required
    // 2. contactParameters.email- required (email)
    // 3. contactParameters.fromEmail - required (email)
    // 4. contactParameters.emailSubject - required (email)
    // 5. contactParameters.emailBody - required (email)
    // 6. contactParameters.phoneNumber - required (sms)
    // 7. contactParameters.smsMessage - required (sms)
    // 8. contactParameters.toUserId - required
    // 9. contactParameters.ilendbooksId - required
    contact(appUUID, contactParameters) {
        for (var contactParametersKey in contactParameters) {
            console.log(appUUID +
                ":contact:" +
                contactParametersKey + "=" + contactParameters[contactParametersKey]
            );
        }
        if (!contactParameters.fromEmail) {
            contactParameters.fromEmail = ilendbooks.private.generic.FROM_EMAIL;
        }

      //  if (ilendbooks.public.contactPreference.EMAIL === contactParameters.contactPreference) {

            var emailResult = Email.send({
                to: contactParameters.email,
                from: contactParameters.fromEmail,
                subject: contactParameters.emailSubject,
                text: contactParameters.emailBody,
            });

            console.log(appUUID + ":contact:email sent." + emailResult);

            contactParameters.contactResult = emailResult;
            contactParameters.status = ilendbooks.public.status.SUCCESS;
            for (var contactResultKey in contactParameters.contactResult) {
                console.log(appUUID +
                    ":contact:contactResult (email):" +
                    contactResultKey + "=" + contactParameters.contactResult[contactResultKey]);
            }

         if (ilendbooks.public.contactPreference.PHONE === contactParameters.contactPreference) {
            var smsParameters = {
                to: contactParameters.phoneNumber,
                message: contactParameters.smsMessage
            }
            var smsResult = Meteor.call('sendSMS', appUUID, smsParameters);
            contactParameters.contactResult = smsResult;
            contactParameters.contactStatus = smsResult.status;
            contactParameters.status = ilendbooks.public.status.SUCCESS;
        }
        // } else {
        //     console.log(appUUID + ":contact: Fatal, no good, no contact preference...");
        //     contactParameters.status = ilendbooks.public.status.FAILED;
        //     contactParameters.contactResult = "No contact preference for this user " + contactParameters.borrowerUserId;
        // }
        Meteor.call("insertCorrespondence", appUUID, contactParameters.toUserId, contactParameters.ilendbooksId, contactParameters);
        console.log(appUUID + ":contact:emailed successfully ");
    }
})