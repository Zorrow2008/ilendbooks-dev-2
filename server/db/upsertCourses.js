upsertCourses= function(course){

	console.log("upsertCourses:course=" + course);

	if(course) {
		try {

				Courses.upsert({
										institution:course.institution
										, campus:course.campus
										, quarter:course.quarter
										, departmentId:course.departmentId
										, departmentName:course.departmentName
										, courseId:course.courseId
										, courseName:course.courseName
				}
					, {$set: {			institution:course.institution							
										, campus:course.campus
										, quarter:course.quarter
										, departmentId:course.departmentId
										, departmentName:course.departmentName
										, courseId:course.courseId
										, courseName:course.courseName
										, sectionsCount:course.sectionsCount
										, sections:course.sections
										, createdAt: new Date()
					}
				});

		} catch (err) {
			console.log("Error:upsertCourses:err = " + err);
			throw err;
		}

	} else {
		console.log("FATAL:upsertCourses: one of the required parmanter is not present");
		console.log("FATAL:upsertCourses:course = " + course);
	}
}