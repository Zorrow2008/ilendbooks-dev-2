
Meteor.methods({
   	updateToBorrowAndContactLender(appUUID, borrowerInfoBook) {  
   		borrowerInfoBook.appUUID=appUUID;
   		borrowerInfoBook.statusLend=ilendbooks.public.status.MATCHED_NOTIFIED;
   		borrowerInfoBook.statusBorrow=ilendbooks.public.status.MATCHED_NOTIFIED;

		for (var borrowerInfoBookKey in borrowerInfoBook) {
			console.log( appUUID + ":updateToBorrowAndContactLender:" + borrowerInfoBookKey + "=" + borrowerInfoBook[borrowerInfoBookKey]);
		}
		

		Meteor.call('updateToBorrow', appUUID, borrowerInfoBook);
		Meteor.call('contactLender', appUUID, borrowerInfoBook);
   	}
})
