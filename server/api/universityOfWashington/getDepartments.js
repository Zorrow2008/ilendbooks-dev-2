	Api = new Restivus(
	{
    	useDefaultAuth: false,
   	 	prettyJson: true
  	});


  	Api.addRoute('getDepartments', {authRequired: false }, {

		get: {
			action: function() {
				var resultArray = [];

				var results = {
					status: ilendbooks.public.status.SUCCESS,
					result: resultArray
				}
					
				try {
					for (var quartersKey in ilendbooks.public.quarters) {
						console.log(quartersKey + "=" + ilendbooks.public.quarters[quartersKey])
						
						var queryParameter = {
							"term": ilendbooks.public.quarters[quartersKey]
						}
						for (var queryParameterKey in queryParameter) {
							console.log("queryParameter:" + queryParameterKey + "=" + queryParameter[queryParameterKey])
						}
					

						var departments = HTTP.get("http://uw-seattle.verbacompare.com/compare/departments"
							, {params: queryParameter}
						);

						var result = {};
						result.term = ilendbooks.public.quarters[quartersKey];
						result.statusCode = departments.statusCode;
						result.headers = departments.headers;
						result.dataSize =  departments.data.length;

						if (departments.data.slength ===1) {
							result.data = departments.data;
						} else {
							console.log("calling upsertDepartments ...")
							upsertDepartments("uw.edu"
								, "seattle"
								, departments.data
							);
						}
						resultArray.push(result);

					}
				} catch (err) {
					console.log("api:getDepartments:" + err)
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

