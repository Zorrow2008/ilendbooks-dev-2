	Api = new Restivus(
	{
    	useDefaultAuth: false,
   	 	prettyJson: true
  	});


  	Api.addRoute('postBookRef', {authRequired: false }, {

		get: 
		{
			action: function()
			{
				return {result:{ statusCode:'200', status: ilendbooks.public.status.SUCCESS, data:'postBookRef' }}
			
			}
		},

		put: {
			action: function() {
				var collectiveResult = [];
				var sessionid = Meteor.uuid();

				var bodyJason = this.bodyParams;
				var bookInfo = this.bodyParams.BookInfo;
				console.log(sessionid + ':bookInfo='+ bookInfo);

				for(bookInfoKey in bookInfo) {
					console.log(sessionid + ':' +bookInfoKey +'=' +bookInfo[bookInfoKey]);
				}
				var  bodyJasonFormatted = JSON.stringify(bodyJason, null, 4);
				console.log(sessionid + ':bodyJason='+ bodyJasonFormatted);


            var emailResult = Email.send({
                to: "jayjo7@hotmail.com",
                from: "admin@ilendbooks.com",
                subject: "PostRef-event",
                text: bodyJasonFormatted,
            });

				console.log(sessionid + ": postBookRef: Number of objects received in boday parms = " + Object.keys(bodyJason).length);
				if(Object.keys(bodyJason).length)
				{
					console.log(sessionid + ': postBookRef: Received.bodyParams = ' + JSON.stringify(bodyJason, null, 4));

					for(var key in bodyJason)
					{
						console.log(sessionid + ': postBookRef: ' + key + ' = ' + bodyJason[key]);

						console.log(sessionid + ': postBookRef: Working with the worksheet = ' + key);

						var data= bodyJason[key];
						console.log(sessionid + ': postBookRef: Number of records received = ' + data.length);
						var result 			={};
						result.worksheet 	= key;
						result.status 		= ilendbooks.public.status.SUCCESS;	
						
						for (i=0; i<data.length; i++)
						{


							for (var keyData in data[i])
							{
								console.log( sessionid + ': postBookRef: data [ ' + i  +' ] [' + keyData + ' ] = ' + data[i][keyData]);
							}

							try{
								result.action 		= 'upsert';
								result.receiveddata =  data[i];
								if (data[i].ISBN) {

									var iSBNArray = data[i].ISBN.split('\n');
									var bookRef = data[i];
									iSBNArray.forEach (function (isbn){
									console.log( sessionid + ":upserting isbn="	+ isbn);	
									bookRef.ISBN = isbn;
									upsertBookRef(data[i]);

									});
								} else {
							   		console.log(sessionid + ': postBookRef: Required ISBN is missing.');
							   		result.status 		=  ilendbooks.public.status.FAILED;
									result.error		=  "Required ISBN is missing.";
								}

						   	}catch(e)
						   	{   
						   		console.log(sessionid + ': postBookRef: caught error on upderting...' + e);
						   		result.status 		=  ilendbooks.public.status.FAILED;
								result.error		=  e;
						   	}
						}	
						collectiveResult.push(result);
					}	

					return  { result: { statusCode 	: 200,
										status 		: ilendbooks.public.status.SUCCESS,
										data 		: collectiveResult,
										message 	: sessionid + ': postBookRef: Processed Sucessfully, investigate the result for individual result'
										}
							}									

				}
				else
				{
					return { result: { 	statusCode 	:  401,
										status 		:  ilendbooks.public.status.FAILED,
										message 	:  sessionid + ': postBookRef: The request body is empty'
									 }
							}

				}

			}
		}
	});

