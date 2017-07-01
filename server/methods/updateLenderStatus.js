Meteor.methods({
	updateLenderStatus(appUUID, ilendbooksId, lenderUserId, status ) {
	     console.log( appUUID + ":updateLenderStatus:ilendbooksId=" + ilendbooksId);
	     console.log( appUUID + ":updateLenderStatus:lenderUserId=" + lenderUserId);
	     console.log( appUUID + ":updateLenderStatus:status=" + status);
	    
	    ToLend.update({
	        "ilendbooksId": ilendbooksId,
	        "lender.userId": lenderUserId
	    }, {
	        "$set": {
	            "lender.$.status": status
	        }
	    });

		UserLendShelf.update({
		    "userId": lenderUserId,
		    "bookInfo.ilendbooksId": ilendbooksId
		}, {
		    	"$set": {
		        	"bookInfo.$.status": status
		    	}
		});
	}
})