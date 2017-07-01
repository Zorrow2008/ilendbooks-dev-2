Template.lenderReview.helpers({
	getLenderName: function() {
		return UserProfile.findOne({userId: Session.get('lenderUserId')}).fName;
	}
})

Template.lenderReview.events({

	'submit form': function(event) {
	    event.preventDefault();
		var contactParameters = {
			ilendbooksId: Session.get('ilendbooksId'),
			lenderUserId: Session.get('lenderUserId'),
			borrowerUserId: Meteor.userId(),
			lenderReview : {
				matchedReviewerId: Session.get('lenderUserId'),
				userInteractionRating :$('#userInteractionRating').data('userrating'),
				advertisedQualityRating : $('#advertisedQualityRating').data('userrating'),
				optionalNotes : event.target.optionalNotes.value
			}
		}
		Meteor.call('updatePastBorrow', Session.get('appUUID'), contactParameters)
		Modal.hide('lenderReview');
	}
})