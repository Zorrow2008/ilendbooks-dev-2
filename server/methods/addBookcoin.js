Meteor.methods({
    addBookcoin(appUUID, toUserId, amount) {
        console.log(appUUID + ":addBookcoin:amount=" + amount);
        var userProfileDoc = UserProfile.findOne({
            userId: toUserId
        });
        if (userProfileDoc) {
            console.log(appUUID + ":addBookcoin:userProfileDoc.bookcoin(before)=" + userProfileDoc.bookcoin);
            var newScore;
            if (userProfileDoc.bookcoin) {
                newScore = userProfileDoc.bookcoin + amount;
            } else {
                newScore = amount;
            }
            UserProfile.update({
                userId: toUserId
            }, {
                $set: {
                    bookcoin: newScore
                }
            });
        } else {
            console.log(appUUID + "addBookcoin:**** FATAL - No User Profile for given user id = " + toUserId);
        }
    }
})