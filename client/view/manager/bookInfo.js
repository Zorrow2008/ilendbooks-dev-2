Template.bookInfo.helpers({

	getNumberOfPages: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
		var currentLentBook = Books.findOne({_id: ilendbooksId});
		return currentLentBook.ItemAttributes[0].NumberOfPages[0];
	},

	getAuthor: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
		var currentLentBook = Books.findOne({_id: ilendbooksId});
		return currentLentBook.ItemAttributes[0].Author[0];
	},

	getTitle: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
		var currentLentBook = Books.findOne({_id: ilendbooksId});
		return currentLentBook.ItemAttributes[0].Title[0];
	},

	getImage: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
		var currentLentBook = Books.findOne({_id: ilendbooksId});
		return currentLentBook.LargeImage[0].URL[0];
	},

	getPublisher: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
		var currentLentBook = Books.findOne({_id: ilendbooksId});
		return currentLentBook.ItemAttributes[0].Publisher[0];

	},

	getISBN: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
		var currentLentBook = Books.findOne({_id: ilendbooksId});
		return currentLentBook.ItemAttributes[0].ISBN[0];
	},

	getEdition: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
		var currentLentBook = Books.findOne({_id: ilendbooksId});
		return currentLentBook.ItemAttributes[0].Edition[0];
	},

	getPublicationDate: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
		var currentLentBook = Books.findOne({_id: ilendbooksId});
		return currentLentBook.ItemAttributes[0].PublicationDate[0];
	},


	isMatchedAcceptedLender: function(status) {
		return status = ilendbooks.public.status.MATCHED_ACCEPTED;
	}, 

   getNextStatePrompt() {
   		var currentRoute=Router.current().route.getName();
   		var forWho;
   		if(currentRoute == "myBorrows"){
   			forWho=ilendbooks.public.userType.BORROWER;
   		} else if(currentRoute == "myShelf") {
   			forWho=ilendbooks.public.userType.LENDER;
   		}
		var iLendMetaData = ILendMetaData.findOne(
			{
				$and: [
					{status:this.status},
					{ $or: [{forWho:forWho},{forWho:ilendbooks.public.userType.BOTH}]}
				]
			}
		)
		console.log("iLendMetaData.action=" + iLendMetaData.action);
		if(iLendMetaData.action) {
			return iLendMetaData.statusMeta;
		} else {
			return;
		}
   },
    getProductGroup:function (ilendbooksId){
      
      return Books.findOne({_id: ilendbooksId}).ItemAttributes[0].ProductGroup[0];
   	}
})

Template.bookInfo.events({

	'click .option': function(event) {
		event.preventDefault();

		// for (var thisKey in this) {
		// 	console.log("option-1:" + thisKey +"=" + this[thisKey]);
		// }
		// for (var eventKey in event) {
		// 	console.log("option-1:" + eventKey +"=" + event[eventKey]);
		// }
		var ilendbooksId=event.currentTarget.id;
		var appUUID = Session.get('appUUID');
		console.log('option:ilendbooksId=' + ilendbooksId)
		if (this.actionModalNext){
		    Session.set(ilendbooks.public.modal.action.TITLE,this.modalTitle);
		    Session.set(ilendbooks.public.modal.action.BODY, this.modalBody);
		    Session.set(ilendbooks.public.modal.action.FEED_BACK_FLAG, this.modalFeedBackFlag);
		    Session.set(ilendbooks.public.modal.action.FEED_BACK_LABEL, this.modalFeedBackLabel);
		    Session.set(ilendbooks.public.modal.action.DISPLAY, this.modalDisplay);
		    Session.set(ilendbooks.public.modal.action.CLASS, this.modalClass);
		    Session.set("ilendbooksId", ilendbooksId);

		    Modal.show('ilendActionModal');	
		} else {
	   		switch(this.nextStatus) {
			case ilendbooks.public.status.WISH_LISTED_REMOVED:
				var title= Books.findOne({_id: ilendbooksId}).ItemAttributes[0].ISBN[0];
      			Meteor.call("updateRemoveFromBorrowWishList" 
      				, Session.get('appUUID')
					, {title:title, ilendbooksId :ilendbooksId}
      			);
				break;
			case ilendbooks.public.status.WISH_LISTED:
				var title= Books.findOne({_id: ilendbooksId}).ItemAttributes[0].ISBN[0];
			    Meteor.call("updateAddToBorrowWishList" 
			      	, Session.get('appUUID')
			      	, {title:title, ilendbooksId : ilendbooksId}
			     );
				break;
			case ilendbooks.public.status.WISH_LISTED_DELETED:
				var title= Books.findOne({_id: ilendbooksId}).ItemAttributes[0].ISBN[0];
			    Meteor.call("updateDeleteFromBorrowWishList" 
			      	, Session.get('appUUID')
			      	, {title:title, ilendbooksId : ilendbooksId}
			     );
				break;
	   		case ilendbooks.public.status.AVAILABLE:
	   			Meteor.call("updateUserBookAddedBack", appUUID, ilendbooksId);
	   			break;
			case ilendbooks.public.status.MATCHED_ACCEPTED:
		    	  var appUUID = Session.get('appUUID');
		    	  console.log("lenderUserId: " + Meteor.userId());
			      var contactParameters = PendingTransactions.findOne({
			         lenderUserId: Meteor.userId(),  
			         ilendbooksId: ilendbooksId,
			         statusLend:ilendbooks.public.status.MATCHED_NOTIFIED,
                     statusBorrow:ilendbooks.public.status.MATCHED_NOTIFIED
			      }).contactParameters;
			      Meteor.call("updateMatchAcceptedAndContactBorrower", appUUID, contactParameters);
		        break;
	        case ilendbooks.public.status.PAST_BORROW:
		        var contactParameters = PendingTransactions.findOne({
			         borrowerUserId: Meteor.userId(),  
			         ilendbooksId: ilendbooksId,
			         statusLend:ilendbooks.public.status.TRANSACTION_COMPLETE_LENDER,
                     statusBorrow:ilendbooks.public.status.TRANSACTION_COMPLETE
			      }).contactParameters;	  
			    console.log("bookInfo:contactParameters.lenderUserId=" + contactParameters.lenderUserId);  	
				Session.set('ilendbooksId', ilendbooksId);
				Session.set('lenderUserId', contactParameters.lenderUserId);
				Session.set('borrowerUserId', Meteor.userId());
				Modal.show("lenderReview");
				break;
			case ilendbooks.public.status.PAST_LEND:
		        var contactParameters = PendingTransactions.findOne({
			         lenderUserId: Meteor.userId(),  
			         ilendbooksId: ilendbooksId,
			         statusLend:ilendbooks.public.status.TRANSACTION_COMPLETE_LENDER,
                     statusBorrow:ilendbooks.public.status.TRANSACTION_COMPLETE
			      }).contactParameters;	
			      Session.set('ilendbooksId', ilendbooksId);
			      Session.set('lenderUserId', Meteor.userId());
			      Session.set('borrowerUserId', contactParameters.borrowerUserId);
			      Modal.show("borrowerReview");		
				break;
			}
		}
	},
	   'click .ilendInfoModal' : function(event) {
	   	var ilendbooksId = this.ilendbooksId;
	   	var status = this.status;
	   	console.log("status: " + status);
	   	var modalTitle = "ilendbooks";
	   	var modalBodyArray = ["It is great that you are lending/borrowing text books... SAVE THE EARTH!"];

	   	var matchedUserName="";
		
	   	switch(this.status) {
		    case ilendbooks.public.status.AVAILABLE:
		        modalTitle = "Available";
		        modalBodyArray =  ["This book is available for lending."];
		        break;
		    case ilendbooks.public.status.REMOVED:
		        modalTitle = "Removed";
		        modalBodyArray =  ["This book has been removed from your shelf."];
		        break;
		    case ilendbooks.public.status.MATCHED_NOTIFIED:
		        matchedUserName= UserProfile.findOne({userId: this.matchedUserId}).fName;
		        modalTitle = "Lender Notified";
		        modalBodyArray =  [" The Lender has been notified of the borrower's request."];
		        break;
		    case ilendbooks.public.status.MATCHED_ACCEPTED:
		        modalTitle = "Borrow Request Accepted";
		        modalBodyArray =  ["The lender has accepted the borrow reqeust. Please arrange a meeting to exchange the book."
		        				  ];
		        break;
			case ilendbooks.public.status.MATCHED_DECLINED:
		        modalTitle = "Borrow Request Declined";
		        modalBodyArray =  ["The lender has declined the borrower's request."
		        				   ];
		        break;
		    case ilendbooks.public.status.BORROWER_LENT_RECEIVED:
		        modalTitle = "Borrower received the book";
		        modalBodyArray =  ["The borrower has indicated that they have received the book from the lender. The lender has yet to confirm"];
		        break;
		    case ilendbooks.public.status.LENDER_LENT_DECLARED:
		        modalTitle = "Lender lent the book";
		        modalBodyArray =  ["The lender indicated that they gave the book to the borrower. The borrower has yet to confirm."];
		        break;
		    case ilendbooks.public.status.WITH_BORROWER:
		        matchedUserName= UserProfile.findOne({userId: this.matchedUserId}).fName;
		        modalTitle = "With Borrower";
		        modalBodyArray = ["This book is with " + matchedUserName];
		        break;
		    case ilendbooks.public.status.BORROWED:
		        matchedUserName= UserProfile.findOne({userId: this.matchedUserId}).fName;
		        modalTitle = "Borrowed";
		        modalBodyArray = ["You have borrowed this book from " + matchedUserName];
		        break;
		    case ilendbooks.public.status.LENDER_RETURN_RECEIVED:
		        modalTitle = "Lender got the book back";
		        modalBodyArray =  ["The lender has indicated that they have received the book back from the borrower. The borrower has yet to confirm."];
		        break;
		    case ilendbooks.public.status.BORROWER_RETURN_DECLARED:
		        modalTitle = "Borrower returned the book";
		        modalBodyArray =  ["The Borrower has indicated that they returned the book back to the lender. The lender has yet to confirm."];
		        break;
		    case ilendbooks.public.status.MATCHED:
		        matchedUserName= UserProfile.findOne({userId: this.matchedUserId}).fName;
		        modalTitle = "Borrower Matched";
		        modalBodyArray =  ["This book is set to be lended to " + matchedUserName + ". Please contact " + matchedUserName ];
		        break;
		    case ilendbooks.public.status.NO_LENDER:
		        modalTitle = "No Lender";
		        modalBodyArray =  ["Don't worry! we are working hard to find a lender will contact you as soon as we find one."];
		        break;
		    case ilendbooks.public.status.TRANSACTION_COMPLETE:
		        modalTitle = "Transaction Complete";
		        modalBodyArray = ["Transaction Complete, borrower returned the book back to lender."];
		        break;
		    case ilendbooks.public.status.PAST_BORROW:
		        modalTitle = "Past Borrow";
		        modalBodyArray = ["You have enjoyed this book in the past."];
		        break;
	    }
	    Session.set(ilendbooks.public.modal.TITLE, modalTitle);
	    Session.set(ilendbooks.public.modal.BODY_ARRAY, modalBodyArray);

	    Modal.show('ilendInfoModal');
	}
})
