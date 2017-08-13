getBookRefDb= function(institution, campus, quarter, departmentId, courseId){
	console.log("getBookRefDb:institution=" + institution);
	console.log("getBookRefDb:campus=" + campus);
	console.log("getBookRefDb:quarter=" + quarter);
	console.log("getBookRefDb:departmentId=" + departmentId);
	console.log("getBookRefDb:courseId=" + courseId);

	var bookRef = BookRef.find({
		institution:institution
		, campus:campus
		, quarter:quarter
		, department:departmentId
		, course:courseId
	});

	return bookRef;
};