Meteor.methods({
	insertCurrentClasses(classes){
        var userQTDoc = QuarterTracker.findOne({
            userId: Meteor.userId()
        });
        QuarterTracker.update({
            "userId": Meteor.userId(),
            "quarterInfo.userId": Meteor.userId()
        }, {
            "$set": {
                "quarterInfo.$.currentQuarterClasses": classes
            }
        })
	}
})