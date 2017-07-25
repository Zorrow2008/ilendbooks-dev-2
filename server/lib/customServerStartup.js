Meteor.startup(function() {

    if (Meteor.isServer) {
        /**************** Allowed accounts **********************/
        var allowedAccounts = getAllowedAccounts();
        for (accKey in allowedAccounts)
        {
          AllowedAccounts.upsert ({"name" : allowedAccounts[accKey].name, "email":allowedAccounts[accKey].email}, 
                                  {$set:{"name" :allowedAccounts[accKey].name, "email":allowedAccounts[accKey].email}});
        }


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

        // Textbooks.insert({
        //   course: "AA310",
        //   textbooks: textbooksArray
        // })

        Textbooks.upsert({
          course: "AA310",
          textbooks: textbooksArray
            },{
                $set: {
              course: "AA310",
             textbooks: textbooksArray
                }
        })

        BookRef.upsert({
            quarter: ilendbooks.public.quarters.AUTUMN,
            department: "AA",
            course: "AA310",
            section: "A",
            ISBN: 9780080977478,
            ilendbooksId: "TPJkBjJnC4wzGJQLz"
        }, {
            $set: {
                quarter: ilendbooks.public.quarters.AUTUMN,
                department: "AA",
                course: "AA310",
                section: "A",
                ISBN: 9780080977478,
                ilendbooksId: "TPJkBjJnC4wzGJQLz"
            }
        }
        )

        BookRef.upsert({
            quarter: ilendbooks.public.quarters.AUTUMN,
            department: "AA",
            course: "AA310",
            section: "A",
            ISBN: 9780486600611,
            ilendbooksId: "Hy24DuEAd2rszfpm7"
        }, {
            $set: {
                quarter: ilendbooks.public.quarters.AUTUMN,
                department: "AA",
                course: "AA310",
                section: "A",
                ISBN: 9780486600611,
                ilendbooksId: "Hy24DuEAd2rszfpm7"
            }
        }
        )

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