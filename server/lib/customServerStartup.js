Meteor.startup(function() {

    if (Meteor.isServer) {
        /**************** Allowed accounts **********************/
        var allowedAccounts = getAllowedAccounts();
        for (accKey in allowedAccounts)
        {
          AllowedAccounts.upsert ({"name" : allowedAccounts[accKey].name, "email":allowedAccounts[accKey].email}, 
                                  {$set:{"name" :allowedAccounts[accKey].name, "email":allowedAccounts[accKey].email}});
        }

        /*************** Departments ***************/
        // var departments = [
        //    {
        //       "id":"AA",
        //       "name":"AA"
        //    },
        //    {
        //       "id":"AAS",
        //       "name":"AAS"
        //    },
        //    {
        //       "id":"ACCTG",
        //       "name":"ACCTG"
        //    },
        //    {
        //       "id":"AES",
        //       "name":"AES"
        //    },
        //    {
        //       "id":"AFRAM",
        //       "name":"AFRAM"
        //    },
        //    {
        //       "id":"AMATH",
        //       "name":"AMATH"
        //    },
        //    {
        //       "id":"ANTH",
        //       "name":"ANTH"
        //    },
        //    {
        //       "id":"ARCH",
        //       "name":"ARCH"
        //    },
        //    {
        //       "id":"ARCHY",
        //       "name":"ARCHY"
        //    },
        //    {
        //       "id":"ARTH",
        //       "name":"ARTH"
        //    },
        //    {
        //       "id":"ASIAN",
        //       "name":"ASIAN"
        //    },
        //    {
        //       "id":"ASL",
        //       "name":"ASL"
        //    },
        //    {
        //       "id":"ASTR",
        //       "name":"ASTR"
        //    },
        //    {
        //       "id":"ATMS",
        //       "name":"ATMS"
        //    },
        //    {
        //       "id":"BCMU",
        //       "name":"BCMU"
        //    },
        //    {
        //       "id":"BCS",
        //       "name":"BCS"
        //    },
        //    {
        //       "id":"BIOA",
        //       "name":"BIOA"
        //    },
        //    {
        //       "id":"BIOC",
        //       "name":"BIOC"
        //    },
        //    {
        //       "id":"BIOL",
        //       "name":"BIOL"
        //    },
        //    {
        //       "id":"BIOST",
        //       "name":"BIOST"
        //    },
        //    {
        //       "id":"BSE",
        //       "name":"BSE"
        //    },
        //    {
        //       "id":"C LIT",
        //       "name":"C LIT"
        //    },
        //    {
        //       "id":"CEE",
        //       "name":"CEE"
        //    },
        //    {
        //       "id":"CHEM",
        //       "name":"CHEM"
        //    },
        //    {
        //       "id":"CHEME",
        //       "name":"CHEME"
        //    },
        //    {
        //       "id":"CHID",
        //       "name":"CHID"
        //    },
        //    {
        //       "id":"CHIN",
        //       "name":"CHIN"
        //    },
        //    {
        //       "id":"CHSTU",
        //       "name":"CHSTU"
        //    },
        //    {
        //       "id":"CLAS",
        //       "name":"CLAS"
        //    },
        //    {
        //       "id":"CM",
        //       "name":"CM"
        //    },
        //    {
        //       "id":"COM",
        //       "name":"COM"
        //    },
        //    {
        //       "id":"CS\u0026SS",
        //       "name":"CS\u0026SS"
        //    },
        //    {
        //       "id":"CSE",
        //       "name":"CSE"
        //    },
        //    {
        //       "id":"DANISH",
        //       "name":"DANISH"
        //    },
        //    {
        //       "id":"DRAMA",
        //       "name":"DRAMA"
        //    },
        //    {
        //       "id":"EARLY",
        //       "name":"EARLY"
        //    },
        //    {
        //       "id":"ECON",
        //       "name":"ECON"
        //    },
        //    {
        //       "id":"EDC\u0026I",
        //       "name":"EDC\u0026I"
        //    },
        //    {
        //       "id":"EDLPS",
        //       "name":"EDLPS"
        //    },
        //    {
        //       "id":"EDPSY",
        //       "name":"EDPSY"
        //    },
        //    {
        //       "id":"EDSPE",
        //       "name":"EDSPE"
        //    },
        //    {
        //       "id":"EDUC",
        //       "name":"EDUC"
        //    },
        //    {
        //       "id":"ENGL",
        //       "name":"ENGL"
        //    },
        //    {
        //       "id":"ENGR",
        //       "name":"ENGR"
        //    },
        //    {
        //       "id":"ENTRE",
        //       "name":"ENTRE"
        //    },
        //    {
        //       "id":"ENVIR",
        //       "name":"ENVIR"
        //    },
        //    {
        //       "id":"EPI",
        //       "name":"EPI"
        //    },
        //    {
        //       "id":"ESRM",
        //       "name":"ESRM"
        //    },
        //    {
        //       "id":"ESS",
        //       "name":"ESS"
        //    },
        //    {
        //       "id":"FINN",
        //       "name":"FINN"
        //    },
        //    {
        //       "id":"FISH",
        //       "name":"FISH"
        //    },
        //    {
        //       "id":"FRENCH",
        //       "name":"FRENCH"
        //    },
        //    {
        //       "id":"GENST",
        //       "name":"GENST"
        //    },
        //    {
        //       "id":"GEOG",
        //       "name":"GEOG"
        //    },
        //    {
        //       "id":"GREEK",
        //       "name":"GREEK"
        //    },
        //    {
        //       "id":"GWSS",
        //       "name":"GWSS"
        //    },
        //    {
        //       "id":"HCDE",
        //       "name":"HCDE"
        //    },
        //    {
        //       "id":"HINDI",
        //       "name":"HINDI"
        //    },
        //    {
        //       "id":"HONORS",
        //       "name":"HONORS"
        //    },
        //    {
        //       "id":"HSERV",
        //       "name":"HSERV"
        //    },
        //    {
        //       "id":"HSMGMT",
        //       "name":"HSMGMT"
        //    },
        //    {
        //       "id":"HSTAA",
        //       "name":"HSTAA"
        //    },
        //    {
        //       "id":"HSTAM",
        //       "name":"HSTAM"
        //    },
        //    {
        //       "id":"HSTAS",
        //       "name":"HSTAS"
        //    },
        //    {
        //       "id":"HSTCMP",
        //       "name":"HSTCMP"
        //    },
        //    {
        //       "id":"HSTEU",
        //       "name":"HSTEU"
        //    },
        //    {
        //       "id":"HSTRY",
        //       "name":"HSTRY"
        //    },
        //    {
        //       "id":"IBUS",
        //       "name":"IBUS"
        //    },
        //    {
        //       "id":"IMMUN",
        //       "name":"IMMUN"
        //    },
        //    {
        //       "id":"INDE",
        //       "name":"INDE"
        //    },
        //    {
        //       "id":"INFX",
        //       "name":"INFX"
        //    },
        //    {
        //       "id":"IS",
        //       "name":"IS"
        //    },
        //    {
        //       "id":"ITAL",
        //       "name":"ITAL"
        //    },
        //    {
        //       "id":"JAPAN",
        //       "name":"JAPAN"
        //    },
        //    {
        //       "id":"JSIS",
        //       "name":"JSIS"
        //    },
        //    {
        //       "id":"JSISA",
        //       "name":"JSISA"
        //    },
        //    {
        //       "id":"KOREAN",
        //       "name":"KOREAN"
        //    },
        //    {
        //       "id":"LATIN",
        //       "name":"LATIN"
        //    },
        //    {
        //       "id":"LING",
        //       "name":"LING"
        //    },
        //    {
        //       "id":"LIS",
        //       "name":"LIS"
        //    },
        //    {
        //       "id":"LSJ",
        //       "name":"LSJ"
        //    },
        //    {
        //       "id":"MATH",
        //       "name":"MATH"
        //    },
        //    {
        //       "id":"ME",
        //       "name":"ME"
        //    },
        //    {
        //       "id":"MEDSCI",
        //       "name":"MEDSCI"
        //    },
        //    {
        //       "id":"MGMT",
        //       "name":"MGMT"
        //    },
        //    {
        //       "id":"MKTG",
        //       "name":"MKTG"
        //    },
        //    {
        //       "id":"MSE",
        //       "name":"MSE"
        //    },
        //    {
        //       "id":"MUHST",
        //       "name":"MUHST"
        //    },
        //    {
        //       "id":"MUSIC",
        //       "name":"MUSIC"
        //    },
        //    {
        //       "id":"NBIO",
        //       "name":"NBIO"
        //    },
        //    {
        //       "id":"NCLIN",
        //       "name":"NCLIN"
        //    },
        //    {
        //       "id":"NEARE",
        //       "name":"NEARE"
        //    },
        //    {
        //       "id":"NORW",
        //       "name":"NORW"
        //    },
        //    {
        //       "id":"NSG",
        //       "name":"NSG"
        //    },
        //    {
        //       "id":"NURS",
        //       "name":"NURS"
        //    },
        //    {
        //       "id":"NUTR",
        //       "name":"NUTR"
        //    },
        //    {
        //       "id":"OCEAN",
        //       "name":"OCEAN"
        //    },
        //    {
        //       "id":"OPMGT",
        //       "name":"OPMGT"
        //    },
        //    {
        //       "id":"PHIL",
        //       "name":"PHIL"
        //    },
        //    {
        //       "id":"PHYS",
        //       "name":"PHYS"
        //    },
        //    {
        //       "id":"POLS",
        //       "name":"POLS"
        //    },
        //    {
        //       "id":"POLSH",
        //       "name":"POLSH"
        //    },
        //    {
        //       "id":"PORT",
        //       "name":"PORT"
        //    },
        //    {
        //       "id":"PSYCH",
        //       "name":"PSYCH"
        //    },
        //    {
        //       "id":"PUBPOL",
        //       "name":"PUBPOL"
        //    },
        //    {
        //       "id":"QMETH",
        //       "name":"QMETH"
        //    },
        //    {
        //       "id":"QSCI",
        //       "name":"QSCI"
        //    },
        //    {
        //       "id":"REHAB",
        //       "name":"REHAB"
        //    },
        //    {
        //       "id":"RELIG",
        //       "name":"RELIG"
        //    },
        //    {
        //       "id":"RUSS",
        //       "name":"RUSS"
        //    },
        //    {
        //       "id":"SCAND",
        //       "name":"SCAND"
        //    },
        //    {
        //       "id":"SCM",
        //       "name":"SCM"
        //    },
        //    {
        //       "id":"SEFS",
        //       "name":"SEFS"
        //    },
        //    {
        //       "id":"SLAVIC",
        //       "name":"SLAVIC"
        //    },
        //    {
        //       "id":"SMEA",
        //       "name":"SMEA"
        //    },
        //    {
        //       "id":"SNKRT",
        //       "name":"SNKRT"
        //    },
        //    {
        //       "id":"SOC",
        //       "name":"SOC"
        //    },
        //    {
        //       "id":"SOCWF",
        //       "name":"SOCWF"
        //    },
        //    {
        //       "id":"SOCWL",
        //       "name":"SOCWL"
        //    },
        //    {
        //       "id":"SPAN",
        //       "name":"SPAN"
        //    },
        //    {
        //       "id":"STAT",
        //       "name":"STAT"
        //    },
        //    {
        //       "id":"SWA",
        //       "name":"SWA"
        //    },
        //    {
        //       "id":"SWED",
        //       "name":"SWED"
        //    },
        //    {
        //       "id":"TAGLG",
        //       "name":"TAGLG"
        //    },
        //    {
        //       "id":"URBDP",
        //       "name":"URBDP"
        //    },
        //    {
        //       "id":"VIET",
        //       "name":"VIET"
        //    }
        // ]
        // Departments.insert({
        //     institute: "uw.edu",
        //     campus: "seattle",
        //     departments: departments
        // });

        /********************* courses ****************************/
        var courses = [
           {
              "id":"AA310",
              "name":"AA310",
              "sections":[
                 {
                    "id":"10016",
                    "name":"A",
                    "instructor":null
                 },
                 {
                    "id":"10017",
                    "name":"B",
                    "instructor":null
                 }
              ]
           },
           {
              "id":"AA402",
              "name":"AA402",
              "sections":[
                 {
                    "id":"10034",
                    "name":"A",
                    "instructor":null
                 }
              ]
           },
           {
              "id":"AA405",
              "name":"AA405",
              "sections":[
                 {
                    "id":"10035",
                    "name":"A",
                    "instructor":null
                 }
              ]
           },
           {
              "id":"AA501",
              "name":"AA501",
              "sections":[
                 {
                    "id":"999999",
                    "name":"A",
                    "instructor":null
                 }
              ]
           },
           {
              "id":"AA504",
              "name":"AA504",
              "sections":[
                 {
                    "id":"10050",
                    "name":"A",
                    "instructor":null
                 },
                 {
                    "id":"10051",
                    "name":"B",
                    "instructor":null
                 }
              ]
           }
        ];
        Courses.insert({
          department: "AA",
          courses: courses
        })

        /********************* textbooks ****************************/
        var textbooksArray = [
          { title: "ORBITAL MECHANICS F/ ENGINEERING STUDENTS (3E 13)",
            author: "CURTIS",
            ISBN: "9780080977478",
            status: "REQUIRED",
            edition: "3",
            copyright: "2013"
          }, 
          { title: "FUNDAMENTALS OF ASTRODYNAMICS",
            author: "BATE",
            ISBN: "9780486600611",
            status: "RECOMMENDED",
            edition: null,
            copyright: "1971"}
        ]

        Textbooks.insert({
          course: "AA310",
          textbooks: textbooksArray
        })

        /********************* start ****************************/
        var statusMeta = [{
            "nextStatus": ilendbooks.public.status.REMOVED,
            "prompt": "Remove from shelf?",
            "option": ilendbooks.public.option.ONE,
            "actionModalNext": true,
            "modalTitle": "Remove from Shelf",
            "modalBody": "Are you sure to remove from shelf?",
            "modalFeedBackFlag": true,
            "modalFeedBackLabel": "Let us know why are you removing from shelf",
            "modalDisplay": "Yes",
            "modalClass": ilendbooks.public.status.REMOVED

        }]


        ILendMetaData.upsert({
            "status": ilendbooks.public.status.AVAILABLE,
            "forWho": ilendbooks.public.userType.LENDER,
            "action": true
        }, {
            $set: {
                statusMeta: statusMeta
            }
        });
        /********************************************************/
        var statusMeta = [{
                "nextStatus": ilendbooks.public.status.AVAILABLE,
                "prompt": "Add back to shelf?",
                "option": ilendbooks.public.option.ONE,
                "actionModalNext": false
            },
            {
                "nextStatus": ilendbooks.public.status.DELETE,
                "prompt": "Delete?",
                "option": ilendbooks.public.option.TWO,
                "actionModalNext": true,
                "modalTitle": "Delete",
                "modalBody": "Are you sure you want to delete from shelf?",
                "modalFeedBackFlag": true,
                "modalFeedBackLabel": "Let us know why are you deleting from shelf",
                "modalDisplay": "Yes",
                "modalClass": ilendbooks.public.status.DELETE
            }
        ]


        ILendMetaData.upsert({
            "status": ilendbooks.public.status.REMOVED,
            "forWho": ilendbooks.public.userType.LENDER,
            "action": true
        }, {
            $set: {
                statusMeta: statusMeta
            }
        });
        /********************************************************/
        var statusMeta = [{
                "nextStatus": ilendbooks.public.status.MATCHED_ACCEPTED,
                "prompt": "Accept?",
                "option": ilendbooks.public.option.ONE
            },
            {
                "nextStatus": ilendbooks.public.status.AVAILABLE,
                "prompt": "Decline?",
                "option": ilendbooks.public.option.TWO,
                "actionModalNext": true,
                "modalTitle": "Decline request",
                "modalBody": "Are you sure you want to decline?",
                "modalFeedBackFlag": true,
                "modalFeedBackLabel": "Let us know why are you declining the request.",
                "modalDisplay": "Yes",
                "modalClass": ilendbooks.public.status.MATCHED_DECLINED
            }
        ]


        ILendMetaData.upsert({
            "status": ilendbooks.public.status.MATCHED_NOTIFIED,
            "forWho": ilendbooks.public.userType.LENDER,
            "action": true
        }, {
            $set: {
                statusMeta: statusMeta
            }
        });
        /********************************************************/

        // Lender's point of view
        var statusMeta = [{
            "nextStatus": ilendbooks.public.status.LENDER_LENT_DECLARED,
            "prompt": "Lent the book?",
            "actionModalNext": true,
            "option": ilendbooks.public.option.ONE,
            "modalTitle": "You successfully lent the book! ",
            "modalBody": "Click yes to confirm you have lent your book.",
            "modalFeedBackFlag": false,
            "modalDisplay": "Yes",
            "modalClass": ilendbooks.public.status.LENDER_LENT_DECLARED
        }]

        ILendMetaData.upsert({
            "status": ilendbooks.public.status.MATCHED_ACCEPTED,
            "forWho": ilendbooks.public.userType.LENDER,
            "action": true
        }, {
            $set: {
                statusMeta: statusMeta
            }
        });

        // Borrower's point of view
        var statusMeta = [{
            "nextStatus": ilendbooks.public.status.BORROWER_LENT_RECEIVED,
            "prompt": "Received the book?",
            "actionModalNext": true,
            "option": ilendbooks.public.option.ONE,
            "modalTitle": "You successfully borrowed a book! ",
            "modalBody": "Click yes to confirm you have received the book.",
            "modalFeedBackFlag": false,
            "modalDisplay": "Yes",
            "modalClass": ilendbooks.public.status.BORROWER_LENT_RECEIVED
        }]

        ILendMetaData.upsert({
            "status": ilendbooks.public.status.MATCHED_ACCEPTED,
            "forWho": ilendbooks.public.userType.BORROWER,
            "action": true
        }, {
            $set: {
                statusMeta: statusMeta
            }
        });
        /********************************************************/
        // Lender --> Borrower 
        // Lender POV
        var statusMeta = [{
            "nextStatus": ilendbooks.public.status.WITH_BORROWER,
            //"prompt": "You lent your book.",
        }]

        ILendMetaData.upsert({
            "status": ilendbooks.public.status.LENDER_LENT_DECLARED,
            "forWho": ilendbooks.public.userType.LENDER,
            "action": false
        }, {
            $set: {
                statusMeta: statusMeta
            }
        });

        // Borrower POV
        var statusMeta = [{
            "nextStatus": ilendbooks.public.status.BORROWED,
            "prompt": "Got the book?",
            "actionModalNext": true,
            "option": ilendbooks.public.option.ONE,
            "modalTitle": "You successfully borrowed a book! ",
            "modalBody": "Click yes to confirm you have received the book.",
            "modalFeedBackFlag": false,
            "modalDisplay": "Yes",
            "modalClass": ilendbooks.public.status.BORROWED
        }]

        ILendMetaData.upsert({
            "status": ilendbooks.public.status.LENDER_LENT_DECLARED,
            "forWho": ilendbooks.public.userType.BORROWER,
            "action": true            
        }, {
            $set: {
                statusMeta: statusMeta
            }
        });

        // Borrower --> Lender
        // Lender POV 
        var statusMeta = [{
            "nextStatus": ilendbooks.public.status.WITH_BORROWER,
            "prompt": "Lent the book?",
            "actionModalNext": true,
            "option": ilendbooks.public.option.ONE,
            "modalTitle": "You successfully lent the book! ",
            "modalBody": "Click yes to confirm you have lent your book.",
            "modalFeedBackFlag": false,
            "modalDisplay": "Yes",
            "modalClass": ilendbooks.public.status.WITH_BORROWER
        }]

        ILendMetaData.upsert({
            "status": ilendbooks.public.status.BORROWER_LENT_RECEIVED,
            "forWho": ilendbooks.public.userType.LENDER,
            "action": true
        }, {
            $set: {
                statusMeta: statusMeta
            }
        });
        // Borrower POV
        var statusMeta = [{
            "nextStatus": ilendbooks.public.status.BORROWED,
            //"prompt": "You received the lender's book.",
        }]

        ILendMetaData.upsert({
            "status": ilendbooks.public.status.BORROWER_LENT_RECEIVED,
            "forWho": ilendbooks.public.userType.BORROWER,
            "action": false
        }, {
            $set: {
                statusMeta: statusMeta
            }
        });
        /********************************************************/
        //Now the book is with the borrower.

        //Lender --> Borrower
        //Lender's point of view
        var statusMeta = [{
               "nextStatus": ilendbooks.public.status.LENDER_RETURN_RECEIVED,
               "prompt": "Received book back?",
               "actionModalNext": true,
               "option": ilendbooks.public.option.ONE,
               "modalTitle": "Congratulations!",
               "modalBody": "After clicking yes, fill out a review to earn BookCoin!",
               "modalFeedBackFlag": false,
               "modalDisplay": "Yes",
               "modalClass": ilendbooks.public.status.LENDER_RETURN_RECEIVED
        }]

         ILendMetaData.upsert({
          "status": ilendbooks.public.status.WITH_BORROWER,
          "forWho": ilendbooks.public.userType.LENDER,
          "action": true
        }, {
           $set: {
             statusMeta :   statusMeta
           }
        }); 

      //  Borrower's point of view
        // var statusMeta = [{
        //        "nextStatus": ilendbooks.public.status.LENDER_RETURN_RECEIVED,
        //        "prompt": "Confirm that you have returned the book.",
        // }]

        //  ILendMetaData.upsert({
        //   "status": ilendbooks.public.status.BORROWED,
        //   "forWho": ilendbooks.public.userType.LENDER
        // }, {
        //    $set: {
        //      statusMeta :   statusMeta
        //    }
        // }); 
        //Borrower --> Lender
        //Borrower's point of view           
         var statusMeta = [{
               "nextStatus": ilendbooks.public.status.BORROWER_RETURN_DECLARED,
               "prompt": "Returned the book?",
               "actionModalNext": true,
               "option": ilendbooks.public.option.ONE,
               "modalTitle": "Congratulations!",
               "modalBody": "After clicking yes, fill out a review to earn BookCoin!",
               "modalFeedBackFlag": false,
               "modalDisplay": "Yes",
               "modalClass": ilendbooks.public.status.BORROWER_RETURN_DECLARED
        }]

         ILendMetaData.upsert({
          "status": ilendbooks.public.status.BORROWED ,
          "forWho": ilendbooks.public.userType.BORROWER,
          "action": true
        }, {
           $set: {
             statusMeta :   statusMeta
           }
        }); 

        //Lender's point of view
        // var statusMeta = [{
        //        "nextStatus": ilendbooks.public.status.BORROWER_RETURN_DECLARED,
        //        "prompt": "Confirm that you have received your book back.",
        // }]

        //  ILendMetaData.upsert({
        //   "status": ilendbooks.public.status.WITH_BORROWER,
        //   "forWho": ilendbooks.public.userType.LENDER
        // }, {
        //    $set: {
        //      statusMeta :   statusMeta
        //    }
        // });    

         /********************************************************/
       // LENDER CONFIRMS HE GOT BOOK BACK FIRST
       var statusMeta = [{
               "nextStatus": ilendbooks.public.status.TRANSACTION_COMPLETE_LENDER,
              // "prompt": "You have confirmed that you have received your book back.",
        }]

         ILendMetaData.upsert({
          "status": ilendbooks.public.status.LENDER_RETURN_RECEIVED,
          "forWho": ilendbooks.public.userType.LENDER,
          "action": false
        }, {
           $set: {
             statusMeta :   statusMeta
           }
        });  

        var statusMeta = [{
            "nextStatus": ilendbooks.public.status.TRANSACTION_COMPLETE,
            "prompt": "Returned the book?",
            "actionModalNext": true,
            "option": ilendbooks.public.option.ONE,
            "modalTitle": "Congratulations!",
            "modalBody": "Click yes to confirm you have returned the book. Then fill out a survey to earn BookCoin!",
            "modalFeedBackFlag": false,
            "modalDisplay": "Yes",
            "modalClass": ilendbooks.public.status.TRANSACTION_COMPLETE
        }]

        ILendMetaData.upsert({
            "status": ilendbooks.public.status.LENDER_RETURN_RECEIVED,
            "forWho": ilendbooks.public.userType.BORROWER,
            "action": true
        }, {
            $set: {
                statusMeta: statusMeta
            }
        });

         //Borrower had to confirm with a modal he has returned it.

       //WHEN BORROWER SAYS HE RETURNED IT FIRST
        var statusMeta = [{
               "nextStatus": ilendbooks.public.status.TRANSACTION_COMPLETE,
              // "prompt": "You have confirmed that you have returned the book.",
        }]

         ILendMetaData.upsert({
          "status": ilendbooks.public.status.BORROWER_RETURN_DECLARED,
          "forWho": ilendbooks.public.userType.BORROWER,
          "action": false
        }, {
           $set: {
             statusMeta :   statusMeta
           }
        }); 
        var statusMeta = [{
            "nextStatus": ilendbooks.public.status.TRANSACTION_COMPLETE_LENDER,
            "prompt": "Received book back?",
            "actionModalNext": true,
            "option": ilendbooks.public.option.ONE,
            "modalTitle": "Congratulations!",
            "modalBody": "Click yes to confirm you have received your book back. Then fill out a survey to earn BookCoin!",
            "modalFeedBackFlag": false,
            "modalDisplay": "Yes",
            "modalClass": ilendbooks.public.status.TRANSACTION_COMPLETE_LENDER
        }]

        ILendMetaData.upsert({
            "status": ilendbooks.public.status.BORROWER_RETURN_DECLARED,
            "forWho": ilendbooks.public.userType.LENDER,
            "action": true
        }, {
            $set: {
                statusMeta: statusMeta
            }
        });
        /********************************************************/
        var statusMeta = [{
               "nextStatus": ilendbooks.public.status.PAST_LEND,
               "prompt": "Review borrower?",
        }]

         ILendMetaData.upsert({
          "status": ilendbooks.public.status.TRANSACTION_COMPLETE_LENDER,
          "forWho": ilendbooks.public.userType.LENDER,
          "action": true
        }, {
           $set: {
             statusMeta :   statusMeta
           }
        }); 

         var statusMeta = [{
               "nextStatus": ilendbooks.public.status.PAST_BORROW,
               "prompt": "Review lender?",
        }]

         ILendMetaData.upsert({
          "status": ilendbooks.public.status.TRANSACTION_COMPLETE,
          "forWho": ilendbooks.public.userType.BORROWER,
          "action": true,
        }, {
           $set: {
             statusMeta :   statusMeta
           }
        }); 
        /********************************************************/
        var statusMeta = [{
               "nextStatus": ilendbooks.public.status.AVAILABLE,
               "prompt": "Add to shelf?",
        }]
        ILendMetaData.upsert({
          "status": ilendbooks.public.status.PAST_LEND,
          "forWho": ilendbooks.public.userType.LENDER,
          "action": true
        }, {
           $set: {
             statusMeta :   statusMeta
           }
        }); 

        //*************** Wish List*******************************/
        /********************* start ****************************/
        var statusMeta = [{
            "nextStatus": ilendbooks.public.status.WISH_LISTED_REMOVED,
            "prompt": "Remove wishlist?",
            "option": ilendbooks.public.option.ONE,
            "actionModalNext": false
        }]

        ILendMetaData.upsert({
            "status": ilendbooks.public.status.WISH_LISTED,
            "forWho": ilendbooks.public.userType.BORROWER,
            "action": true
        }, {
            $set: {
                statusMeta: statusMeta
            }
        });

        var statusMeta = [{
            "nextStatus": ilendbooks.public.status.WISH_LISTED_DELETED,
            "prompt": "Delete?",
            "option": ilendbooks.public.option.ONE,
            "actionModalNext": false
        },
        {
            "nextStatus": ilendbooks.public.status.WISH_LISTED,
            "prompt": "Add to wishlist?",
            "option": ilendbooks.public.option.ONE,
            "actionModalNext": false
        }]

        ILendMetaData.upsert({
            "status": ilendbooks.public.status.WISH_LISTED_REMOVED,
            "forWho": ilendbooks.public.userType.BORROWER,
            "action": true
        }, {
            $set: {
                statusMeta: statusMeta
            }
        });

    }
});