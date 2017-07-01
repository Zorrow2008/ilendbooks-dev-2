Template.borrowerReview.helpers({
	getBorrowerName: function() {
		var borrowerId = Session.get('borrowerId');
		var borrowerName = UserProfile.findOne({userId: borrowerId}).fName;
		return borrowerName;
	}
})

Template.borrowerReview.events({

	'submit form': function(event) {
	 	 event.preventDefault();
		// var rating1 = $('#rating1').data('userrating');
		// var rating2 = $('#rating2').data('userrating');
		// var notes = event.target.notes.value;
		// console.log("rating1: " + rating1);
		// console.log("rating2: " + rating2);
		// console.log("notes: " + notes)
		// var borrowerId = Session.get('borrowerId');
		// var ilendbooksId = Session.get('ilendbooksId');
		// Meteor.call('insertBorrowerReview', borrowerId, rating1, rating2, notes);
		// var contactParameters = {
		// 	ilendbooksId: ilendbooksId,
		// 	lenderUserId: Meteor.userId(),
		// 	borrowerUserId: Session.get('borrowerId')
		// }
		// var appUUID = Session.get('appUUID');
		// Meteor.call('updateAvailable', appUUID, contactParameters);
		
	  //	Router.go("myShelf");
	  	var contactParameters = {
	  		ilendbooksId: Session.get('ilendbooksId'),
	  		borrowerUserId: Session.get('borrowerUserId'),
	  		lenderUserId: Meteor.userId(),
	  		borrowerReview: {
	  			matchedReviewerId: Session.get('borrowerUserId'),
	  			userInteractionRating: $('#userInteractionRating').data('userrating'),
	  			returnQualityRating: $('#returnQualityRating').data('userrating'),
	  			optionalNotes : event.target.optionalNotes.value
	  		}
	  	}
	  	Meteor.call('updatePastLend', Session.get('appUUID'), contactParameters)
	  	Modal.hide('borrowerReview');

	   }
})