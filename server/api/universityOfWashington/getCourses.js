	var Api = new Restivus(
	{
    	useDefaultAuth: false,
   	 	prettyJson: true
  	});

  	Api.addRoute('getCourses', { authRequired: false }, {

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

						var departments = getDepartmentsDb("uw.edu", "seattle");
						console.log("upsertSheet:course department from db="+departments.length);
						departments.forEach(function (department) {

							for (var departmentsKey in department) {
								console.log(departmentsKey + "=" + department[departmentsKey])
							}
							var queryParameter = {
								"id": department.id,
								"term_id": ilendbooks.public.quarters[quartersKey].toUpperCase()
							}
							for (var queryParameterKey in queryParameter) {
								console.log("queryParameter:" + queryParameterKey + "=" + queryParameter[queryParameterKey])
							}

							var courses = HTTP.get("http://uw-seattle.verbacompare.com/compare/courses"
								, {params: queryParameter}
							);
							var result = {};
							result.term = ilendbooks.public.quarters[quartersKey];
							result.departmentId = department.id;
							result.departmentName = department.name;
							result.statusCode = courses.statusCode;
							result.headers = courses.headers;
							result.dataSize =  courses.data.length;

							if (courses.data.length === 1) {
								result.data = departments.data;
								console.log("getCourses:No courses for "
									+ "term_id=" +ilendbooks.public.quarters[quartersKey].toUpperCase()
									+ " id=" +  department.id
								);
							} else {
								console.log("calling upsertCourses ...");
								courses.data.forEach(function (course) {
									var courseToDb = {
										institution:department.institution,
										campus:department.campus,
										quarter:ilendbooks.public.quarters[quartersKey].toUpperCase(),
										departmentId:department.id,
										departmentName:department.name,
										courseId:course.id,
										courseName:course.name,
										sectionsCount:course.sections.length,
										sections:course.sections
									}

									upsertCourses(courseToDb);
								});
							}
							resultArray.push(result);
						})
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

