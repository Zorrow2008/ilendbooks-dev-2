BookRef.after.insert(function (userId, doc) {
	console.log("BookRef.after.insert:userId=" + userId);
	console.log("BookRef.after.insert:doc=" + doc);
	getIlendbooksId(doc.ISBN);
});

BookRef.after.update(function (userId, doc, fieldNames, modifier, options) {
	console.log("BookRef.after.update:userId=" + userId);
	console.log("BookRef.after.update:doc=" + doc);
	console.log("BookRef.after.update:fieldNames=" + fieldNames);
	console.log("BookRef.after.update:modifier=" + modifier);
	console.log("BookRef.after.update:options=" + options);
	if( fieldNames[0] !== 'ilendBooksId') {
		getIlendbooksId(doc.ISBN);
	} else {
		console.log("BookRef.after.update:do nothing as the insert/update ilendBooksId");
	}
});


//search amazon by isbn and update the books collection
getIlendbooksId = function (isbn){
	var sessionid = Meteor.uuid();
	var searchParameters = { "isbn": isbn};
	// var searchResult = itemSearchCommon('api-'+sessionid, searchParameters);
	itemSearchCommon('api-'+sessionid, searchParameters, function(error, searchResult){


	});
	// for(var key in searchResult) {
	// 	console.log( sessionid + ":getIlendbooksId:" + key + "=" + searchResult[key]);	
	// }
	// console.log( sessionid + ":getIlendbooksId:searchResult.results[0]="	+ searchResult.results[0]);
	// var isbnAmazon = searchResult.results[0].ItemAttributes[0].ISBN[0];
	// console.log( sessionid + ":getIlendbooksId:isbnAmazon="	+ isbnAmazon);
	// var ilendbooksId = searchResult.results[0].ilendbooksId;
	// console.log( sessionid + ":getIlendbooksId:ilendbooksId="	+ ilendbooksId);
}