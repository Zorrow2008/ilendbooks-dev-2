Meteor.methods({
	updateLenderStatusAndMatchedUserId(appUUID, transactionInfo) {

		for (var transactionInfoKey in transactionInfo) {
			console.log( appUUID 
				+ ":updateLenderStatusAndMatchedUserId:" 
				+ transactionInfoKey + "=" + transactionInfo[transactionInfoKey]
			);
		}

		ToLend.update({
		    "ilendbooksId": transactionInfo.ilendbooksId,
		    "lender.userId": transactionInfo.lenderUserId
		}, {
		    "$set": {
		        "lender.$.status": transactionInfo.statusLend
		    }
		})

		UserLendShelf.update({
		    "userId": transactionInfo.lenderUserId,
		    "bookInfo.ilendbooksId": transactionInfo.ilendbooksId
		}, {
		    "$set": {
		        "bookInfo.$.status": transactionInfo.statusLend,
		        "bookInfo.$.matchedUserId": transactionInfo.borrowerUserId
		    }

		})
	}
})