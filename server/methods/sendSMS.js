var twilioClient = new Twilio({
  from: Meteor.settings.private.twilio.from,
  sid: Meteor.settings.private.twilio.sid,
  token: Meteor.settings.private.twilio.token
});


Meteor.methods({
  // smsParameters should contain
  // smsParameters.to - SMS to phone number
  // smsParameters.message - SMS message
  'sendSMS': function (appUUID, smsParameters) {
    var smsResult = {};
    for (var smsParametersKey in smsParameters)
    {
      console.log(appUUID + ":sendSMS:" + smsParametersKey + "=" + smsParameters[smsParametersKey]);
    }
    // for (twilioClientKey in twilioClient)
    // {
    //   console.log(appUUID + ":sendSMS:" + twilioClientKey + "=" + twilioClient[twilioClientKey]);
    // }

        twilioClient.sendSMS({
            to: smsParameters.to,         
            from: twilioClient.from,      
            body: smsParameters.message  + ' - ilendbooks.com'
        }, function(err, responseData) { 
            smsResult.status = ilendbooks.public.status.SUCCESS
            smsResult.responseData = responseData;
            smsResult.err = err;
            if (!err) {   
              for (responseDataKey in responseData)
              {
                console.log(appUUID + ":sendSMS:" + responseDataKey + "=" + responseData[responseDataKey]);
              }          
            } else {
              smsResult.status = ilendbooks.public.status.FAILED
              console.log(appUUID + ":sendSMS" + "Oops, something is wrong sending sms... ", err);
              for (errKey in err) {
                console.log(appUUID + ":sendSMS" + errKey + "="+ err[errKey]);
              }
            }
        });
    return smsResult;
  }
});
