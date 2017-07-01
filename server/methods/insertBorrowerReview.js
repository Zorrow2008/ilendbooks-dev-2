Meteor.methods({
	insertBorrowerReview(appUUID, contactParameters ) {
		// var borrowerReviewDoc = Reviews.findOne({userId: borrowerUserId});
		// var borrowerReview = {
		// 	matchedReviewerId: Meteor.userId(),
		// 	userInteractionRating: userInteractionRating,
		// 	returnQuality: returnQuality,
		// 	optionalNotes: optionalNotes
		// }
		// for(var key in borrowerReview) {
		// 	console.log("borrowerReviewKey: " + key + "value: " + borrowerReview[key]);
		// }
		// var totalBorrowerRatings = 0;
		// var keyCount = 1;
		// //if(borrowerReviewDoc.asBorrowerReviews.length >= 1) {
		// 	for(var key in borrowerReviewDoc.asBorrowerReviews) {
		// 		totalBorrowerRatings = borrowerReviewDoc.asBorrowerReviews[key].userInteractionRating 
		// 		+ borrowerReviewDoc.asBorrowerReviews[key].returnQuality;
		// 		keyCount++;
		// 	}
		// //}
		// if(keyCount == 1) {
		// 	averageBorrowerRating = userInteractionRating + returnQuality;
		// 	averageBorrowerRating = Math.round(averageBorrowerRating * 100)/100;
		// 	if(borrowerReviewDoc.averageBorrowerRating == 0) {
		// 		averageUserRating =  averageBorrowerRating;
		// 	}else{
		// 		averageUserRating = (borrowerReviewDoc.averageBorrowerRating + averageBorrowerRating)/2;
		// 	}
		// 	averageUserRating = Math.round(averageUserRating * 100) / 100;
		// }else{
		// 	console.log("asBorrowerReviews size: " + borrowerReviewDoc.asBorrowerReviews.length)
		// 	totalBorrowerRatings += userInteractionRating + returnQuality;
		// 	console.log("totalBorrowerRatings: " + totalBorrowerRatings);
		// 	averageBorrowerRating = totalBorrowerRatings / ((2 * keyCount).toPrecision(3));
		// 	averageBorrowerRating = Math.round(averageBorrowerRating * 100)/100;
		// 	averageUserRating = (borrowerReviewDoc.averageBorrowerRating + averageBorrowerRating)/2;
		// 	averageUserRating = Math.round(averageUserRating * 100) / 100;
		// 	console.log("averageBorrowerRating: " + averageBorrowerRating);
		// 	Reviews.update({userId: borrowerUserId}, {$set: {averageBorrowerRating: averageBorrowerRating, averageUserRating: averageUserRating}});
		// 	Reviews.update({userId: borrowerUserId}, {$push: {asBorrowerReviews: borrowerReview}});
		// }

		//make sure there is rating value if not set it to zero
		if(! contactParameters.borrowerReview.userInteractionRating) {
			contactParameters.borrowerReview.userInteractionRating = 0;
		}

		if(! contactParameters.borrowerReview.returnQualityRating) {
			contactParameters.borrowerReview.returnQualityRating = 0;
		}

		for (var contactParametersKey in contactParameters) {
		
			console.log(appUUID 
				+ ":insertBorrowerReview:"
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
				);
		}
		for (var borrowerReviewKey in contactParameters.borrowerReview) {
			console.log( appUUID 
				+ ":insertBorrowerReview:" 
				+ borrowerReviewKey + "=" + contactParameters.borrowerReview[borrowerReviewKey]
			);
		}
		var averageBorrowerRating;
		var borrowerReviewDoc = Reviews.findOne({userId: contactParameters.borrowerUserId});
		//as the borrowerReviewDoc initilized on creating user profile, this is expected to be 
		//present all the time,  if  not it is fatal 
		var countBorrowerRatings = 1;
		var totalBorrowerRatings = contactParameters.borrowerReview.userInteractionRating 
								+ contactParameters.borrowerReview.returnQualityRating;
		var averageUserRating;					
		if (borrowerReviewDoc) {

			countBorrowerRatings += borrowerReviewDoc.countBorrowerRatings;
			totalBorrowerRatings += borrowerReviewDoc.totalBorrowerRatings;
			averageBorrowerRating = Math.round((totalBorrowerRatings / ((2 * countBorrowerRatings).toPrecision(3)))* 100) / 100;
			if (borrowerReviewDoc.averageBorrowerRating) {
				averageUserRating = Math.round(((borrowerReviewDoc.averageBorrowerRating + averageBorrowerRating)/2)* 100) / 100;
			} else {
				//in case there is no any average borrower ratings
				averageUserRating = averageBorrowerRating;
			}

		console.log(appUUID + ":insertBorrowerReview:countBorrowerRatings=" + countBorrowerRatings);
		console.log(appUUID + ":insertBorrowerReview:totalBorrowerRatings=" + totalBorrowerRatings);
		console.log(appUUID + ":insertBorrowerReview:averageBorrowerRating=" + averageBorrowerRating);
		console.log(appUUID + ":insertBorrowerReview:averageUserRating=" + averageUserRating);


		} else {
			console.log(appUUID: ":insertBorrowerReview:***** FATAL borrowerReviewDoc is null *****" )
		}

		Reviews.update({userId: contactParameters.borrowerUserId}, {$set: {averageBorrowerRating: averageBorrowerRating
																		, averageUserRating: averageUserRating
																		, totalBorrowerRatings: totalBorrowerRatings
																		, countBorrowerRatings, countBorrowerRatings
																  }
					  });

		Reviews.update({userId: contactParameters.borrowerUserId}, {$push: {asBorrowerReviews: contactParameters.borrowerReview}});
	}
})