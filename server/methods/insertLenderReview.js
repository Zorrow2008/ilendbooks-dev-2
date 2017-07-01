Meteor.methods({
	insertLenderReview(appUUID, contactParameters) {

		//make sure there is rating value if not set it to zero
		if(! contactParameters.lenderReview.userInteractionRating) {
			contactParameters.lenderReview.userInteractionRating = 0;
		}

		if(! contactParameters.lenderReview.advertisedQualityRating) {
			contactParameters.lenderReview.advertisedQualityRating = 0;
		}

		for (var contactParametersKey in contactParameters) {
		
			console.log(appUUID 
				+ ":insertLenderReview:"
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
				);
		}
		for (var lenderReviewKey in contactParameters.lenderReview) {
			console.log( appUUID 
				+ ":insertLenderReview:" 
				+ lenderReviewKey + "=" + contactParameters.lenderReview[lenderReviewKey]
			);
		}

		var lenderReviewDoc = Reviews.findOne({userId: contactParameters.lenderUserId});
		//as the lenderReviewDoc initilized on creating user profile, this is expected to be 
		//present all the time,  if  not it is fatal 
		var countLenderRatings = 1;
		var totalLenderRatings = contactParameters.lenderReview.userInteractionRating 
								+ contactParameters.lenderReview.advertisedQualityRating;
		var averageUserRating;
		var averageLenderRating;					
		if (lenderReviewDoc) {

			countLenderRatings += lenderReviewDoc.countLenderRatings;
			totalLenderRatings += lenderReviewDoc.totalLenderRatings;
			averageLenderRating = Math.round((totalLenderRatings / ((2 * countLenderRatings).toPrecision(3)))* 100) / 100;
			if (lenderReviewDoc.averageBorrowerRating) {
				averageUserRating = Math.round(((lenderReviewDoc.averageBorrowerRating + averageLenderRating)/2)* 100) / 100;
			} else {
				//in case there is no any average borrower ratings
				averageUserRating = averageLenderRating;
			}

		console.log(appUUID + ":insertLenderReview:countLenderRatings=" + countLenderRatings);
		console.log(appUUID + ":insertLenderReview:totalLenderRatings=" + totalLenderRatings);
		console.log(appUUID + ":insertLenderReview:averageLenderRating=" + averageLenderRating);
		console.log(appUUID + ":insertLenderReview:averageUserRating=" + averageUserRating);


		} else {
			console.log(appUUID: ":insertLenderReview:***** FATAL lenderReviewDoc is null *****" )
		}

		Reviews.update({userId: contactParameters.lenderUserId}, {$set: {averageLenderRating: averageLenderRating
																		, averageUserRating: averageUserRating
																		, totalLenderRatings: totalLenderRatings
																		, countLenderRatings, countLenderRatings
																  }
					  });

		Reviews.update({userId: contactParameters.lenderUserId}, {$push: {asLenderReviews: contactParameters.lenderReview}});

	}

})