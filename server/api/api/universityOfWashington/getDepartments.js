	var Api = new Restivus(
	{
    	useDefaultAuth: false,
   	 	prettyJson: true
  	});


  		Api.addRoute('getDepartments', {authRequired: false }, {

		get: 
		{	action: function()
				{
					var departments;
					for(var season in ilendbooks.public.quarters) {
							var queryParameter= {
								"term": season
							}
						departments = HTTP.get("http://uw-seattle.verbacompare.com/compare/departments", queryParameter.term ).data;
						console.log("key: " + season + "value: " + ilendbooks.public.quarters[season])
						 for(var specificDepartment in departments) {		
						 	console.log("key: " + specificDepartment + "value: " + departments[specificDepartment].name);
							Departments.upsert({
					            institute: "uw.edu",
					            campus: "seattle",
					            id: departments[specificDepartment].id,
					            name: departments[specificDepartment].name
					        },{
					            $set: {
					          	    institute: "uw.edu",
					           	    campus: "seattle",
	    				            id: departments[specificDepartment].id,
					        	    name: departments[specificDepartment].name
					            }
					          }        
					        );
						}
							
					}
					return departments;
				}
			// action: function()
			// {
			// 	for(var season in ilendbooks.public.quarters) {
			// 		console.log("key: " + season + "value: " + ilendbooks.public.quarters[season])
			// 		var departments = HTTP.get("http://uw-seattle.verbacompare.com/compare/departments/?term=autumn").data;
			// 		for(var specificDepartment in departments) {
			// 	        Departments.upsert({
			// 	            institute: "uw.edu",
			// 	            campus: "seattle",
			// 	            id: departments[specificDepartment].id,
			// 	            name: departments[specificDepartment].name
			// 	        },{
			// 	            $set: {
			// 	          	    institute: "uw.edu",
			// 	           	    campus: "seattle",
   //  				            id: departments[specificDepartment].id,
			// 	        	    name: departments[specificDepartment].name
			// 	            }
			// 	          }        
			// 	        );
					
			// 		}
			// 	}
			// 	return departments;
			// }
		}

		});

