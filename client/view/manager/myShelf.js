Template.myShelf.helpers({
	getLentBooks: function() {
		var doc = UserLendShelf.findOne({
			userId: Meteor.userId(),
			bookInfo:{$elemMatch:{status:{$ne: ilendbooks.public.status.DELETE}}}});
		return doc.bookInfo;
	},

	hasBooks: function() {
		var doc = UserLendShelf.findOne({userId: Meteor.userId()})
		if( UserLendShelf.findOne({
			userId: Meteor.userId(),
				bookInfo:{$elemMatch:{status:{$ne: ilendbooks.public.status.DELETE}}}})) {
			return true;
		}
		return false;

	},

	isNotDelete: function(status) {
		return status != ilendbooks.public.status.DELETE;
	},

	isTransactionCompleteLender: function(status) {
		console.log(status ==ilendbooks.public.status.TRANSACTION_COMPLETE_LENDER)
		return status ==ilendbooks.public.status.TRANSACTION_COMPLETE_LENDER;
	}
})

Template.myShelf.events({
	'click .borrowerReview': function(event) {
		Session.setAuth('ilendbooksId', this.ilendbooksId);
		Session.setAuth('lenderId', Meteor.userId());
		Session.setAuth('borrowerId',this.matchedUserId);
		console.log("myShelf ilendbooksId set");
		Modal.show("borrowerReview");
		
	}
})