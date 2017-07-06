Meteor.methods({
	updateQuarterTrackerStatus(quarterInfo, userType) {
		var userQTDoc = QuarterTracker.findOne({userId: Meteor.userId()});
		if(userQTDoc == null) {
            QuarterTracker.upsert({
                userId: Meteor.userId()
            }, {
                $push: {
                    quarterInfo: quarterInfo
                }
            });
		}else if(userType == ilendbooks.public.userType.LENDER) {
			QuarterTracker.update({
			    "userId": borrowerUserId,
			}, {
			    "$set": {
			        "quarterInfo.$.hasLent": true		       
			    }
			})

		}else{
			QuarterTracker.update({
			    "userId": borrowerUserId,
			}, {
			    "$set": {
			        "quarterInfo.$.hasBorrowed": true		       
			    }
			})
		}
	}
})