Meteor.methods({
    insertQuarterInfo(quarterInfo) {
        QuarterTracker.upsert({
            userId: Meteor.userId()
        }, {
            $push: {
                quarterInfo: quarterInfo
            }
        });
    }
})