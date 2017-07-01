Template.registerHelper('getSearchResult', function() {
	var appUUID = Session.get('appUUID');
	var title = Session.get('title');
	var author = Session.get('author');
	var keywords = Session.get('keywords');
	//var searchResult = SearchResult.findOne({$and : [{appUUID: appUUID}, {title:title}, {author: author}]});
	var searchResult = {};
	if(title && author) {
		searchResult = SearchResult.findOne({$and : [{appUUID: appUUID}, {title:title}, {author: author}]});
	}else{
		searchResult = SearchResult.findOne({$and : [{appUUID: appUUID}, {keyWords: keywords} ]});
	}

	for(key in searchResult) {
		console.log("searchResult key: " + key + "; searchResult value: " + searchResult[key]);
	}
	Session.set('SearchResult', searchResult);
	return searchResult;
})

Template.registerHelper('imageFormatter', function(){
	return Meteor.settings.public.imageFormatter;
});

Template.registerHelper('imageFormatterOne', function(){
	return Meteor.settings.public.imageFormatter_one;
});

Template.registerHelper('imageFormatter', function(){
	return Meteor.settings.public.imageFormatter;
});

Template.registerHelper('getFacebookUrl', function() {
	return Meteor.settings.public.socialMedia.facebookUrl;
});

Template.registerHelper('getTwitterUrl', function() {
	return Meteor.settings.public.socialMedia.twitterUrl;
});

Template.registerHelper('getInstagramUrl', function() {
	return Meteor.settings.public.socialMedia.instagramUrl;
});


isAllowedAccount = function(email){
	if (AllowedAccounts.findOne({"email": email})) {
		return true;
	} else {
		return false;
	}
}