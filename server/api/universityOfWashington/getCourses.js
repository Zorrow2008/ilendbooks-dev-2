	var Api = new Restivus(
	{
    	useDefaultAuth: false,
   	 	prettyJson: true
  	});

  	Api.addRoute('getCourses', {authRequired: false }, {

		get: {
			action: function() {
				// console.log("getCourses invoked");
				// var courses = HTTP.get("http://uw-seattle.verbacompare.com/compare/courses/?id=AA&term_id=AUTUMN");
				// // console.log ('departments:' + departments.data );
				// // return {result:{ statusCode:'200', status: ilendbooks.public.status.SUCCESS, data:'getDepartments' }}
				// for (var coursesHeaderKey in courses.headers) {
				// 	console.log(coursesHeaderKey + "=" + courses.headers[coursesHeaderKey]);
				// }
				// var books = HTTP.get("http://uw-seattle.verbacompare.com/comparison?id=10016", courses.headers);
				// return books;
							var departments = Departments.find({});
			var coursesPerDepartment;
			departments.forEach(function (department) {
					
					console.log("key: " + department + "value: " + department.name);
					coursesPerDepartment = HTTP.get("http://uw-seattle.verbacompare.com/compare/courses/?id=" + department.name + "&term_id=AUTUMN").data;
			        Courses.upsert({
			          departmentId: department.id,
			          departmentName: department.name,
			          courses: coursesPerDepartment
			        },{
			            $set: {
			            	department: department.name,
			                courses: coursesPerDepartment
			            }
			          })
				})

				return coursesPerDepartment;
				}
			}

		});