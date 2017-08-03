getDepartmentsDb = function(institution, campus){
	console.log("getDepartmentsDb:institution=" + institution);
	console.log("getDepartmentsDb:campus=" + campus);

	var departments = Departments.find({institution:institution, campus:campus});

	return departments;
};