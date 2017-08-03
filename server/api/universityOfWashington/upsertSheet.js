	Api = new Restivus(
	{
    	useDefaultAuth: false,
   	 	prettyJson: true
  	});

  	Api.addRoute('upsertSheet', { authRequired: false }, {

		get: {
			action: function() {
				var resultArray = [];
				var errorDataArray =[];

				var results = {
					status: ilendbooks.public.status.SUCCESS,
					result: resultArray
				}
					
				try {

					var departments = getDepartmentsDb("uw.edu", "seattle");
// 					var departments =["ARCHY","BCMU","BCS","BIOA","BIOC","BSE","DENTPC","ECFS","EDUC"
// ,"GENST"
// ,"INFX"
// ,"KOREAN"
// ,"LAW"
// ,"LAWT"
// ,"MKTG"
// ,"MSE"
// ,"MUHST"
// ,"MUSEUM"
// ,"MUSIC"
// ,"NBIO"
// ,"NCLIN"
// ,"NEARE"
// ,"NORW"
// ,"NSG"
// ,"NURS"
// ,"NUTR"
// ,"OCEAN"
// ,"OPMGT"
// ,"PHARM"
// ,"PHIL"
// ,"PHYS"
// ,"POLS"
// ,"POLSH"
// ,"PORT"
// ,"PSYCH"
// ,"PUBPOL"
// ,"QMETH"
// ,"QSCI"
// ,"REHAB"
// ,"RELIG"
// ,"RUSS"
// ,"SCAND"
// ,"SCM"
// ,"SEFS"
// ,"SLAVIC"
// ,"SMEA"
// ,"SNKRT"
// ,"SOC"
// ,"SOCW"
// ,"SOCWF"
// ,"SOCWL"
// ,"SPAN"
// ,"SPHSC"
// ,"STAT"
// ,"SWA"
// ,"SWED"
// ,"TAGLG"
// ,"URBDP"
// ,"VIET"
// ,"ARAB"
// ,"BECON"
// ,"CMS"
// ,"DENTCL"
// ,"DPHS"
// ,"EMBA"
// ,"ESL"
// ,"FIN"
// ,"HSTAFM"
// ,"HSTLAC"
// ,"JSISD"
// ,"LABM"
// ,"LAWC"
// ,"LAWH"
// ,"MODHEB"
// ,"MSIS"
// ,"NMETH"
// ,"PCE"
// ,"RHBPO"
// ,"TMMBA"];
					console.log("upsertSheet:course department from db="+departments.length);
					departments.forEach(function (department) {

						var courses = getCoursesDb ("uw.edu", "seattle", department);
						console.log("upsertSheet:course count from db="+courses.length);
						courses.forEach(function (course) {
							console.log("upsertSheet:" 
								+ "course_id=" + course._id 
								+ ";quarter=" + course.quarter
								+";departmentName=" + course.departmentName
								+";courseName=" + course.courseName

							)
							// for (var courseKey in course) {
							// 	console.log("upsertSheet:" + courseKey + "=" + course[courseKey])
							// }
							var sections = course.sections;
							// console.log("upsertSheet:section count from db="+ sections.length);
							sections.forEach(function(section) {


							var postParameter = {
								"UniqueId": Random.id() + "-" + course._id,
								"Status" : "new",
								"Institution":course.institution,
								"Campus":course.campus,
								"Quarter":course.quarter,
								"Department":course.departmentName,
								"Course":course.courseName,
								"Section":section.name
							}
							// for (var postParameterKey in postParameter) {
							// 	console.log("postParameter:" + postParameterKey + "=" + postParameter[postParameterKey])
							// }
							var result = {};
							var errorData ={};
							try {
								var upsertSheetResult = HTTP.post("https://script.google.com/macros/s/AKfycbyG-ganKrUcCiOYlPbdITuv4mf5pP4cDEbrbNqdkToKimws3c0/exec"
									, {  
											data: postParameter,
		  									followAllRedirects: true
		  							  }
								);


								result.upsertSheetResult = upsertSheetResult;
								result.postParameter = postParameter;


							} catch (error) {
								result.error = error;
								result.postParameter = postParameter;
								result.section = section;
								result.course = course;

								errorData.error = error;
								errorData.postParameter = postParameter;
								errorData.section = section;
								errorData.course = course;
								errorDataArray.push(errorData);
							}
							resultArray.push(result);
							});
						});
					});
				} catch (err) {
					console.log("api:upsertSheet:" + err)
					results = {
						status: ilendbooks.public.status.FAILED,
						error: err,
						result : resultArray
					}

				}

			if(errorDataArray.length >0) {

				errorDataArray.forEach(function(errorDataOne) {
							console.log("api:upsertSheet:" 
								+ "course_id=" + errorDataOne.course._id 
								+ ";quarter=" + errorDataOne.course.quarter
								+";departmentName=" + errorDataOne.course.departmentName
								+";courseName=" + errorDataOne.course.courseName
							);
					});			

			} else {
				console.log("api:upsertSheet: No Error Data captured")
			}

			return results;
			}
		}
	});