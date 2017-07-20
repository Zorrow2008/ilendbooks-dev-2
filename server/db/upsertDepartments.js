upsertDepartments = function(institution, campus, data){
	console.log("upsertDepartments:institution=" + institution);
	console.log("upsertDepartments:campus=" + campus);
	console.log("upsertDepartments:data=" + data);

	if(institution && campus && data) {
		try {
			data.forEach( function (department)
			{
				console.log("upsertDepartments:department.id=" + department.id);
				console.log("upsertDepartments:department.name=" + department.name);
				Departments.upsert({institution:institution, campus:campus, id:department.id, name:department.name}
					, {$set: {institution:institution, campus:campus, id:department.id, name:department.name, createdAt: new Date()}}
				);
			});
		} catch (err) {
			console.log("Error:upsertDepartments:err = " + err);
			throw err;
		}

	} else {
		console.log("FATAL:upsertDepartments: one of the required parmanter is not present");
		console.log("FATAL:upsertDepartments:institution = " + institution);
		console.log("FATAL:upsertDepartments:campus = " + campus);
		console.log("FATAL:upsertDepartments:data = " + data);
	}
}