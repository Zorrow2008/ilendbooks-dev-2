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
				}
			}

		});