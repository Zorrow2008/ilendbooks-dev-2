	Api = new Restivus(
	{
    	useDefaultAuth: false,
   	 	prettyJson: true
  	});


  	Api.addRoute('syncilendbooksId', {authRequired: false }, {

		get: {
			action: function() {
				var sessionid = Meteor.uuid();
				var resultArray = [];

				var results = {
					status: ilendbooks.public.status.SUCCESS,
					result: resultArray
				}

				var errorlist=[];

				var count =0;
					
				try {
					var bookRefDb = BookRef.find({}).fetch();

					for (var bookRefDbKey in bookRefDb) {
						count = count + 1;
						console.log(sessionid +":count=" + count);
						console.log(sessionid +":ISBN=" + bookRefDb[bookRefDbKey].ISBN);

						var searchResult = SearchResult.findOne({"isbn" : bookRefDb[bookRefDbKey].ISBN});
						for(var key in searchResult) {
							console.log( sessionid + ":api:syncilendbooksId:" + key + "=" + searchResult[key]);	
		
						}
						if(searchResult) {
							if(searchResult.isError) {
								for(var keyError in searchResult.error) {
									console.log( sessionid + ":api:syncilendbooksId:Error:" + keyError + "=" 
										+ JSON.stringify(searchResult.error[keyError], null, 4));	
								
								}
								bookRefDb[bookRefDbKey].ilendbooksId = "none";
							var errorItem ={
								"message": "No item found",
								"ISBN": bookRefDb[bookRefDbKey].ISBN,
								"bookRefDb" : bookRefDb[bookRefDbKey]
							}

							errorlist.push(errorItem)
							} else {

								console.log( sessionid + ":api:syncilendbooksId:searchResult.isError" + searchResult.isError);
								console.log( sessionid + ":api:syncilendbooksId:searchResult.results[0]="	+ searchResult.results[0]);
								var isbnAmazon = searchResult.results[0].ItemAttributes[0].ISBN[0];
								console.log( sessionid + ":api:syncilendbooksId:isbnAmazon="	+ isbnAmazon);
								var ilendbooksId = searchResult.results[0].ilendbooksId;
								console.log( sessionid + ":api:syncilendbooksId:ilendbooksId="	+ ilendbooksId);
								bookRefDb[bookRefDbKey].ilendbooksId = searchResult.results[0].ilendbooksId;
							}
						} else {
							console.log( sessionid + ":api:syncilendbooksId:No Search result for ISBN " + bookRefDb[bookRefDbKey].ISBN);
							bookRefDb[bookRefDbKey].ilendbooksId = "none";
							var errorItem ={
								"message": "No Search result",
								"ISBN": bookRefDb[bookRefDbKey].ISBN,
								"bookRefDb" : bookRefDb[bookRefDbKey]
							}

							errorlist.push(errorItem)
						}

						var result = {};
						result.bookRefDb = bookRefDb[bookRefDbKey];


						console.log(sessionid+":api:syncilendbooksId:calling updateBookRef ...")
						updateBookRef(sessionid, bookRefDb[bookRefDbKey]);
						
						resultArray.push(result);

					}
				} catch (err) {
					console.log(sessionid+":api:syncilendbooksId:" + err)
					results = {
						status: ilendbooks.public.status.FAILED,
						error: err,
						result : resultArray
					}

				}

		      var emailResult = Email.send({
              to: "jayjo7@hotmail.com",
              from: "ilendbooks<admin@ilendbooks.com>",
              subject: "SyncilendbooksId - result",
              text: JSON.stringify(errorlist, null, 4)
           });
		return results;
			}
		}
	});

