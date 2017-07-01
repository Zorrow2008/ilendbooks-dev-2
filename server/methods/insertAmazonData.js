Meteor.methods({
	insertAmazonData(data) {
		ToAmazon.insert(data);
	}
})