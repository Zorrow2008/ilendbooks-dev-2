Meteor.methods({
    updateQuarterTrackerStatus(userType) {
        var userQTDoc = QuarterTracker.findOne({
            userId: Meteor.userId()
        });
        var userProfileDoc = UserProfile.findOne({
            userId: Meteor.userId()
        });
        if (userType == ilendbooks.public.userType.LENDER) {
            QuarterTracker.update({
                "userId": Meteor.userId(),
                "quarterInfo.userId": Meteor.userId()
            }, {
                "$set": {
                    "quarterInfo.$.hasLent": true
                }
            })
            if (userProfileDoc.isFirstLend) {
                UserProfile.update({
                    userId: Meteor.userId()
                }, {
                    $set: {
                        isFirstLend: false
                    }
                })
            }

        } else {
            QuarterTracker.update({
                "userId": Meteor.userId(),
                "quarterInfo.userId": Meteor.userId()
            }, {
                "$set": {
                    "quarterInfo.$.hasBorrowed": true
                }
            })
        }
        console.log("updateQuarterTrackerStatus finished");
    }
})