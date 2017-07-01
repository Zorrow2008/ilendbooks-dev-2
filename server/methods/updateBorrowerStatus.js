Meteor.methods({
	updateBorrowerStatus(appUUID, ilendbooksId, borrowerUserId, status ) {
	     console.log( appUUID + ":updateBorrowerStatus:ilendbooksId=" + ilendbooksId);
	     console.log( appUUID + ":updateBorrowerStatus:borrowerUserId=" + borrowerUserId);
	     console.log( appUUID + ":updateBorrowerStatus:status=" + status);
	    
	  	ToBorrow.update({
	        "ilendbooksId": ilendbooksId,
	        "borrower.userId": borrowerUserId
	    }, {
	        "$set": {
	            "borrower.$.status": status
	        }
	    });

		UserBorrowShelf.update({
		    "userId": borrowerUserId,
		    "bookInfo.ilendbooksId": ilendbooksId
		}, {
		    "$set": {
		        "bookInfo.$.status": status
		       
		    }
		})
	}
})