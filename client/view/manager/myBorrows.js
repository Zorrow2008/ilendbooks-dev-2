Template.myBorrows.helpers({
	getBorrowedBooks: function() {

		var doc = UserBorrowShelf.findOne({
			userId: Meteor.userId(),
			bookInfo:{$elemMatch:{status:{$ne: ilendbooks.public.status.WISH_LISTED_DELETED}}}
		});
		return doc.bookInfo;
	},

	hasBooks: function() {
		if( UserBorrowShelf.findOne({
			userId: Meteor.userId(),
			bookInfo:{$elemMatch:{status:{$ne: ilendbooks.public.status.WISH_LISTED_DELETED}}}
		})) {
			return true;
		}
		return false;
	},

	isMatchedAcceptedBorrower: function(status) {
		return status == ilendbooks.public.status.MATCHED_ACCEPTED;
	},

	isTransactionComplete: function(status) {
		console.log(status ==ilendbooks.public.status.TRANSACTION_COMPLETE)
		return status ==ilendbooks.public.status.TRANSACTION_COMPLETE;
	}
})

Template.myBorrows.events({
	'click .yes' :function(event) {
		Meteor.call('updateBorrowerLentReceived', this.bookInfo);
		var borrowerName = UserProfile.findOne({userId: Meteor.userId()}).fName;
		var notificationLink = "";
		var emailInfo = {
			from: "admin@ilendbooks.com",
			to: UserProfile.findOne({userId: this.bookInfo.matchedUserId}).email,
			subject: "Borrower lent received",
			text: borrowerName + "has received your book. Please visit " + notificationLink + " to confirm that you have lent him your book."
		}
		Meteor.call('emailMatchedUser', emailInfo);
	},

	'click .lenderReview': function(event) {
		Session.setAuth('ilendbooksId', this.ilendbooksId);
		Session.setAuth('lenderId', this.matchedUserId);
		Session.setAuth('borrowerId', Meteor.userId());
		console.log("myBorrows ilendbooksId set");
		Modal.show("lenderReview");
		
	}

})