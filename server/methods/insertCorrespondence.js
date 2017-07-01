Meteor.methods({
  	insertCorrespondence(appUUID, toUserId, ilendbooksId, correspondanceDetail) {
		console.log( appUUID + ":insertCorrespondence:toUserId=" + toUserId);
		for (var correspondanceDetailKey in correspondanceDetail) {
			console.log( appUUID 
				+ ":insertCorrespondence:" 
				+ correspondanceDetailKey + "=" + correspondanceDetail[correspondanceDetailKey]
			);
		}
            Correspondence.upsert({
				        toUserId:toUserId,
                ilendbooksId:ilendbooksId
            }, {
                  $set: {
					         toUserId:toUserId,
                   ilendbooksId:ilendbooksId
                  },
                    $push: {
                          correspondanceDetail:correspondanceDetail
                  }
               }
            )
  }
});

