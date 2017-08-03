getCoursesDb = function(institution, campus, departmentId){
	console.log("getCoursesDb:institution=" + institution);
	console.log("getCoursesDb:campus=" + campus);
	console.log("getCoursesDb:departmentId=" + departmentId);

	var courses = Courses.find({institution:institution, campus:campus, departmentId:departmentId});

	return courses;
};