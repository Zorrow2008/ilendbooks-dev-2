updateBookRef= function(sessionid, bookRef){
	for( var  key in bookRef) {
		console.log(sessionid +":updateBookRef:"+ key +"=" + bookRef[key]);
	}

	if(bookRef) {
		try {

			BookRef.update({"_id" : bookRef._id},{$set:{"ilendBooksId":bookRef.ilendBooksId}});

		} catch (err) {
			console.log("Error:updateBookRef:err = " + err);
			throw err;
		}

	} else {
		console.log("FATAL:updateBookRef: one of the required parmanter is not present");
		console.log("FATAL:updateBookRef:course = " + course);
	}
};