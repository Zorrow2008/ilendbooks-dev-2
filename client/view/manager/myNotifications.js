Template.myNotifications.helpers({
	getPendingTransactions: function() {
		return PendingTransactions.find({
			$or: [{lenderUserId: Meteor.userId()},
				 {borrowerUserId: Meteor.userId()}],
		   	statusBorrow: {$ne: ilendbooks.public.status.TRANSACTION_COMPLETE},
		   	statusLend: {$ne: ilendbooks.public.status.TRANSACTION_COMPLETE_LENDER}

		});
	},

	hasPendingTransactions: function() {
		return ( PendingTransactions.findOne({lenderUserId: Meteor.userId()}) != null)
		||  (PendingTransactions.findOne({borrowerUserId: Meteor.userId()}) != null)
	},

	placeMessageInSession: function(statusLend, statusBorrow, contactParameters) {
		var message = "";
		var lenderMessage;
		var borrowerMessage;
		var lenderName;
		var borrowerName;
		var booktitle = contactParameters.title;
		if(contactParameters.lenderUserId == Meteor.userId()) {
			lenderName = UserProfile.findOne({userId: Meteor.userId()}).fName;
			borrowerName = UserProfile.findOne({userId: contactParameters.borrowerUserId}).fName;
		}else{
			borrowerName = UserProfile.findOne({userId: Meteor.userId()}).fName;
			lenderName = UserProfile.findOne({userId: contactParameters.lenderUserId}).fName;			
		}
		switch(statusLend) {
		    case ilendbooks.public.status.MATCHED_NOTIFIED:
		        lenderMessage = borrowerName + " has sent you a borrow request for the book " + booktitle;
		        break;
		    case ilendbooks.public.status.MATCHED_ACCEPTED:
		       	borrowerMessage = lenderName + " has accepted your borrow request for the book " + booktitle;
		        break;
			case ilendbooks.public.status.MATCHED_DECLINED:
				lenderMessage = lenderName + " has declined your borrow request for the book " + booktitle;
		        break;
		    case ilendbooks.public.status.BORROWER_LENT_RECEIVED:
				lenderMessage = borrowerName + " has said that they have received your book " + booktitle + 
				". Go to your shelf to confirm";
			    break;
		    case ilendbooks.public.status.LENDER_LENT_DECLARED:
			  	borrowerMessage = lenderName + " has said that they have lent their book " + booktitle +
			  	". Go to your borrows to confirm.";
			    break;
		    case ilendbooks.public.status.WITH_BORROWER:
		    	borrowerMessage = lenderName + "'s book " + booktitle + " is with you.";
		    	lenderMessage = borrowerName + " has your book " + booktitle;
		        break;
		    case ilendbooks.public.status.BORROWED:
		    	borrowerMessage = lenderName + "'s book " + booktitle + "is with you.";
		    	lenderMessage = borrowerName + " has your book " + booktitle;		    
		        break;
		    case ilendbooks.public.status.LENDER_RETURN_RECEIVED:
		    	borrowerMessage = lenderName +" has said that they have received their book " 
		    	+ booktitle + " back from you. Go to your borrows to confirm.";
		        break;
		    case ilendbooks.public.status.BORROWER_RETURN_DECLARED:
		    	lenderMessage = borrowerName + " has said that they have returned the book "
		    	+ booktitle +" to you. Go to your shelf to confirm.";
			    break;
		    case ilendbooks.public.status.TRANSACTION_COMPLETE:
		    	lenderMessage = "Your transaction with " + borrowerName + " for the book " + booktitle +" is completed.";
			    borrowerMessage = "Your transaction with " + lenderName + " for the book " + booktitle +" is completed.";
			    break;
		    case ilendbooks.public.status.TRANSACTION_COMPLETE_LENDER:
		    	lenderMessage = "Your transaction with " + borrowerName + " for the book " + booktitle +" is completed.";
			    borrowerMessage = "Your transaction with " + lenderName + " for the book " + booktitle +" is completed.";
		}
		Session.set('lenderMessage', lenderMessage );
		Session.set('borrowerMessage', borrowerMessage);
	},

	getLenderMessage: function() {
		return Session.get('lenderMessage');
	},

	getBorrowerMessage: function() {
		return Session.get('borrowerMessage');
	},

	isLender: function(contactParameters) {
		return contactParameters.lenderUserId == Meteor.userId();
	},

	isBorrower: function(contactParameters) {
		return contactParameters.borrowerUserId == Meteor.userId();
	},

	getBorrowerName: function(contactParameters) {
		return UserProfile.findOne({userId: contactParameters.borrowerUserId}).fName;
	},

	getLenderBook: function(contactParameters) {
		return Books.findOne({_id: contactParameters.ilendbooksId}).ItemAttributes[0].Title[0];
	},
	//if theres none, display a message saying theres none.
	// getPath: function() {
	// 	console.log("current path: " + Iron.Location.get().path);
	// 	//console.log(Router.current().route.path(this))
	// 	console.log("current url: " + Router.routes['myNotifications'].url({_id: 1}));
	// 	return Iron.Location.get().path;
	// },
	// toLogin: function() {

	// 	Session.setAuth("backPath", Iron.Location.get().path)
	// 	Session.setAuth("author", author);
	// 	this.redirect('login')
	// },

	setPathInSession: function() {
		
		Session.setTemp("backPath", Router.current().route.getName());
		Session.setAuth("author", author);
		//this.redirect('login')
	},

 	isLoggedIn: function() {
 		return Meteor.userId() != null;
    },	

    getModalTitle: function() {
      return Session.get(ilendbooks.public.modal.TITLE);
   },

    getModalBody: function() {
      return Session.get(ilendbooks.public.modal.BODY);
   },
})

Template.myNotifications.events({
	'click .accept': function() {
	    var appUUID = Session.get('appUUID');
	    this.contactParameters.appUUID = appUUID;
	    //set status in userLendShelf and userBorrowShelf to matched-accepted
	    var borrowerUserId = this.contactParameters.borrowerUserId
	    var borrowerName = UserProfile.findOne({userId: this.contactParameters.borrowerUserId}).fName;
	    Meteor.call('updateMatchAcceptedAndContactBorrower'
	    	, appUUID
	    	, this.contactParameters
	    );
		console.log("matched-accepted");
		var modalTitle = "Borrow request accepted!";
		var modalBody = "You accepted " 
			+ borrowerName 
			+ "'s borrow request! We will provide " 
			+ borrowerName 
			+" with your contact information for him to reach out to you."
		;
	    Session.set(ilendbooks.public.modal.TITLE, modalTitle);
	    Session.set(ilendbooks.public.modal.BODY, modalBody);
	    Modal.show('ilendInfoModal');    
	},

	'click .decline': function() {
	    console.log("I CLICKED DECLINE");
	    //set status in userLendShelf and userBorrowShelf to matched-accepted
	    var borrowerName = UserProfile.findOne({userId: this.contactParameters.borrowerUserId}).fName;
	    Session.set(ilendbooks.public.modal.action.TITLE,"Borrow request declined.");
	    Session.set(ilendbooks.public.modal.action.BODY, "Are you sure you want to decline " + borrowerName + "'s borrow request?");
	    Session.set(ilendbooks.public.modal.action.FEED_BACK_FLAG, true);
	    Session.set(ilendbooks.public.modal.action.FEED_BACK_LABEL, "Would you like to give a reason?");
	    Session.set(ilendbooks.public.modal.action.DISPLAY, "Yes, please");
	    Session.set(ilendbooks.public.modal.action.CLASS, "matched-declined");
	    Session.set(ilendbooks.public.other.CONTACT_PARAMETERS, this.contactParameters);

	    Modal.show('ilendActionModal');		
	},

	'click .confirm': function() {
		console.log("matched-declined");
    	var borrowerUserId = this.contactParameters.borrowerUserId
	    var borrowerName = UserProfile.findOne({userId: this.contactParameters.borrowerUserId}).fName;
	    Meteor.call('updateMatchDeclined', this.contactParameters);
	    var lenderName = UserProfile.findOne({userId: Meteor.userId()}).fName;
	    var emailInfo = {
	    	to: UserProfile.findOne({userId: borrowerUserId}).email,
	    	from: this.contactParameters.fromEmail,
	    	subject: "Borrow request declined",
	    	text: lenderName + " has declined your trade request."
	    }
	    Meteor.call('emailMatchedUser', emailInfo);
		//console.log("emailMatchedUser-declined");
	}
})

