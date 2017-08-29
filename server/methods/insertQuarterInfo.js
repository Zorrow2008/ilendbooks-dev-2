Meteor.methods({
    insertQuarterInfo(quarterInfo) {
    	var userQTDoc = QuarterTracker.findOne({userId: Meteor.userId()});
        if(userQTDoc == null) {
	        QuarterTracker.upsert({
	            userId: Meteor.userId()
	        }, {
	            $push: {
	                quarterInfo: quarterInfo
	            }
	        });
	        console.log("new document made")
		}else {

			QuarterTracker.update({
			    "userId":  Meteor.userId(),
			    "quarterInfo.userId":  Meteor.userId()
			}, {
			    $set: {
			        "quarterInfo.$.previousQuarterClasses": quarterInfo.previousQuarterClasses
			       
			    }
			})
			console.log("new previous classes added");
	}
    }
})