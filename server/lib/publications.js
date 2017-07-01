Meteor.publish('allowedAccounts', function(userId) {
	return AllowedAccounts.find();
});

Meteor.publish('searchResults', function(appUUID, keywords) {
  return SearchResult.find({appUUID: appUUID, keyWords: keywords});
});

Meteor.publish('myShelf', function(userId) {
	return UserLendShelf.find({
		userId: userId,
		bookInfo:{$elemMatch:{status:{$ne: ilendbooks.public.status.DELETE}}}
	});
});



Meteor.publish('myBorrows', function(userId) {
	return UserBorrowShelf.find({
		userId: userId		
	});
});

Meteor.publish('userProfile', function(userId) {
	return UserProfile.find();
});

Meteor.publish('toLend', function(){
	return ToLend.find();
});

Meteor.publish('toBorrow', function() {
	return ToBorrow.find();
});

Meteor.publish('books', function() {
	return Books.find();
});

Meteor.publish('reviews', function(userId) {
	return Reviews.find(userId: userId );
});

Meteor.publish('pendingTransactions', function() {
	return PendingTransactions.find();
});

Meteor.publish('iLendMetaData', function() {
	return ILendMetaData.find();
})