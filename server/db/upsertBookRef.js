upsertBookRef= function(bookRef){

	console.log("upsertBookRef:course=" + bookRef);

	if(bookRef) {
		try {

				BookRef.upsert({     	institution:bookRef.Institution
										, campus:bookRef.Campus  
										, quarter:bookRef.Quarter
										, department:bookRef.Department
										, course:bookRef.Course
										, section:bookRef.Section
										, ISBN:bookRef.ISBN

				}
					, {$set: {			institution:bookRef.Institution
										, campus:bookRef.Campus 
										, quarter:bookRef.Quarter
										, department:bookRef.Department
										, course:bookRef.Course
										, section:bookRef.Section
										, ISBN:bookRef.ISBN
										, createdAt: new Date()
					}
				});

		} catch (err) {
			console.log("Error:upsertBookRef:err = " + err);
			throw err;
		}

	} else {
		console.log("FATAL:upsertBookRef: one of the required parmanter is not present");
		console.log("FATAL:upsertBookRef:course = " + course);
	}
}