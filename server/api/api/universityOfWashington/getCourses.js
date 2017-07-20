	var Api = new Restivus(
	{
    	useDefaultAuth: false,
   	 	prettyJson: true
  	});


  		Api.addRoute('getCourses', {authRequired: false }, {

		get: 
		{
			action: function()
			{	
				// var depCount = 0;
				// var departments = Departments.findOne({
				// 	institute: "uw.edu",
				// 	campus: "seattle"
				// }).departments;
				// console.log("getCourses started");
				// for(var key in departments) {
				// 	console.log("key: " + key + "valie: " + departments[key].id);
				// 	console.log("key: " + key + "valie: " + departments[key].name);
				// }
				// for(var specificDepartment in departments) {
				// 	console.log("specificDepartment: " + departments[specificDepartment].name)
				// 	var coursesPerDepartment = HTTP.get("http://uw-seattle.verbacompare.com/compare/courses/?id=" + departments[specificDepartment].name + "&term_id=AUTUMN");			
			 //        Courses.upsert({
			 //          department: departments[specificDepartment].name,
			 //          courses: coursesPerDepartment.data
			 //        },{
			 //            $set: {
			 //            	department: departments[specificDepartment].name,
			 //                courses: coursesPerDepartment.data
			 //            }
			 //          })
			 //         depCount++;
			        

				// }
				// console.log("depCount" + depCount)
			var departments = Departments.find({});
			var coursesPerDepartment;
			departments.forEach(function (row) {
					
					console.log("key: " + row + "value: " + row.name);
					coursesPerDepartment = HTTP.get("http://uw-seattle.verbacompare.com/compare/courses/?id=" + row.name + "&term_id=AUTUMN").data;
			        Courses.upsert({
			          department: row.name,
			          courses: coursesPerDepartment
			        },{
			            $set: {
			            	department: row.name,
			                courses: coursesPerDepartment
			            }
			          })
				})

				return coursesPerDepartment;
			}
		}

		});

