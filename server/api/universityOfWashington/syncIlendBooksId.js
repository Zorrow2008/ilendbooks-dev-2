	Api = new Restivus(
	{
    	useDefaultAuth: false,
   	 	prettyJson: true
  	});


  	Api.addRoute('syncIlendBooksId', {authRequired: false }, {

		get: {
			action: function() {
				var sessionid = Meteor.uuid();
				var resultArray = [];

				var results = {
					status: ilendbooks.public.status.SUCCESS,
					result: resultArray
				}
					
				try {
					var bookRefDb = BookRef.find({}).fetch();

					for (var bookRefDbKey in bookRefDb) {
						console.log(sessionid +":ISBN=" + bookRefDb[bookRefDbKey].ISBN);

						var searchResult = SearchResult.findOne({"isbn" : bookRefDb[bookRefDbKey].ISBN});
						for(var key in searchResult) {
							console.log( sessionid + ":api:syncIlendBooksId:" + key + "=" + searchResult[key]);	
		
						}
						if(searchResult.error) {
							for(var keyError in searchResult.error) {
								console.log( sessionid + ":api:syncIlendBooksId:Error:" + keyError + "=" 
									+ JSON.stringify(searchResult.error[keyError], null, 4));	
							
							}
							bookRefDb[bookRefDbKey].ilendBooksId = "none";
						} else {

							console.log( sessionid + ":api:syncIlendBooksId:searchResult.isError" + searchResult.isError);
							console.log( sessionid + ":api:syncIlendBooksId:searchResult.results[0]="	+ searchResult.results[0]);
							var isbnAmazon = searchResult.results[0].ItemAttributes[0].ISBN[0];
							console.log( sessionid + ":api:syncIlendBooksId:isbnAmazon="	+ isbnAmazon);
							var ilendbooksId = searchResult.results[0].ilendbooksId;
							console.log( sessionid + ":api:syncIlendBooksId:ilendbooksId="	+ ilendbooksId);
							bookRefDb[bookRefDbKey].ilendBooksId = searchResult.results[0].ilendbooksId;
						}

						var result = {};
						result.bookRefDb = bookRefDb[bookRefDbKey];

						if (searchResult.length ===1) {
							result.data = searchResult;
						} else {
							console.log(sessionid+":api:syncIlendBooksId:calling updateBookRef ...")
							updateBookRef(sessionid, bookRefDb[bookRefDbKey]);
						}
						resultArray.push(result);

					}
				} catch (err) {
					console.log(sessionid+":api:syncIlendBooksId:" + err)
					results = {
						status: ilendbooks.public.status.FAILED,
						error: err,
						result : resultArray
					}

				}
					return results;
			}
		}
	});

