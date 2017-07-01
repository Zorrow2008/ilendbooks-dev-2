Meteor.methods({
    updateAddToBorrowWishList(appUUID, currentBorrowBookInfo) {

        for (var currentBorrowBookInfoKey in currentBorrowBookInfo) {
            console.log(appUUID + ":updateAddToBorrowWishList:currentBorrowBookInfo." + currentBorrowBookInfoKey + "=" + currentBorrowBookInfo[currentBorrowBookInfoKey]);
        }

        // var currentBookFromBorrowWishListDB = BorrowWishList.findOne({
        //  ilendbooksId:currentBorrowBookInfo.ilendbooksId
        //  , title: currentBorrowBookInfo.title
        //  , borrower: {$elemMatch:{userId: Meteor.userId() 
        //        , status:{$in:[ilendbooks.public.status.WISH_LISTED]}}}

        // })

        if(UserBorrowShelf.findOne({userId: Meteor.userId()}) != null) {
            var currentBookFromUserBorrowShelf = UserBorrowShelf.findOne({
                "userId": Meteor.userId(),
                "bookInfo.ilendbooksId": currentBorrowBookInfo.ilendbooksId
            });
            var bookInWishList = false;
            if(currentBookFromUserBorrowShelf != null){
            for(var key in currentBookFromUserBorrowShelf.bookInfo) {
                if(currentBookFromUserBorrowShelf.bookInfo[key].ilendbooksId
                 == currentBorrowBookInfo.ilendbooksId) {
                    if(currentBookFromUserBorrowShelf.bookInfo[key].status
                        == ilendbooks.public.status.WISH_LISTED){
                    bookInWishList = true;
                  }
                }
            }
          }
        }

        // if (currentBookFromBorrowWishListDB ) {
        //     console.log(appUUID + ":updateAddToBorrowWishList:ilendbooksId "
        //         + "'" + currentBookFromBorrowWishListDB.ilendbooksId + "'"
        //         + " is in user's "
        //         + "'" +currentBookFromBorrowWishListDB.borrower[0].userId + "'"
        //         +" wish list" 
        //     )
        if(bookInWishList) {
            console.log("book already in wish list");
        } else {
            // var currentBookFromBorrowWishListRemoved = BorrowWishList.findOne({
            //  ilendbooksId:currentBorrowBookInfo.ilendbooksId
            //  , title: currentBorrowBookInfo.title
            //  , borrower: {$elemMatch:{userId: Meteor.userId() 
            //        , status:{$in:[ilendbooks.public.status.WISH_LISTED_REMOVED]}}}

            // })
            var bookInWishListRemoved;
            if(UserBorrowShelf.findOne({userId: Meteor.userId()}) != null) {
                var currentBookFromUserBorrowShelfRemoved = UserBorrowShelf.findOne({
                    "userId": Meteor.userId(),
                    "bookInfo.ilendbooksId": currentBorrowBookInfo.ilendbooksId
                });
                 bookInWishListRemoved = false;
                 if(currentBookFromUserBorrowShelfRemoved !=null) {
                for(var key in currentBookFromUserBorrowShelf.bookInfo) {
                    if(currentBookFromUserBorrowShelf.bookInfo[key].status === ilendbooks.public.status.WISH_LISTED_REMOVED
                        || currentBookFromUserBorrowShelf.bookInfo[key].status === ilendbooks.public.status.WISH_LISTED_DELETED) {
                        bookInWishListRemoved = true;
                    }
                }
                 }
             }

            // if(currentBookFromBorrowWishListRemoved){
            //     BorrowWishList.update({
            //         "ilendbooksId":currentBorrowBookInfo.ilendbooksId,
            //         "title": currentBorrowBookInfo.title,
            //         "borrower.userId": Meteor.userId()
            //     }, {
            //         "$set": {
            //             "borrower.$.status": ilendbooks.public.status.WISH_LISTED
            //         }
            //     });
            if(bookInWishListRemoved) {   
                UserBorrowShelf.update({
                    "userId": Meteor.userId(),
                    "bookInfo.ilendbooksId": currentBorrowBookInfo.ilendbooksId
                }, {
                    "$set": {
                        "bookInfo.$.status": ilendbooks.public.status.WISH_LISTED
                       
                    }
                })

            } else {

                var borrowerInfo = {
                    userId: Meteor.userId(),
                    dateTime: Meteor.call('getLocalTime'),
                    status: ilendbooks.public.status.WISH_LISTED,
                };

                // BorrowWishList.upsert({
                //     title: currentBorrowBookInfo.title,
                //     ilendbooksId: currentBorrowBookInfo.ilendbooksId
                // }, {
                //     $set: {
                //         title: currentBorrowBookInfo.title,
                //         ilendbooksId: currentBorrowBookInfo.ilendbooksId
                //     }
                // });

                // BorrowWishList.upsert({
                //     title: currentBorrowBookInfo.title,
                //     ilendbooksId: currentBorrowBookInfo.ilendbooksId
                // }, {
                //     $push: {
                //         borrower: borrowerInfo
                //     }
                // });
                var bookInfo = {
                    ilendbooksId: currentBorrowBookInfo.ilendbooksId,
                    dateTime: Meteor.call('getLocalTime'),
                    status: ilendbooks.public.status.WISH_LISTED, 
                    matchedUserId: null 
                };
                UserBorrowShelf.upsert({
                    userId: Meteor.userId()
                }, {
                    $set: {
                        userId: Meteor.userId()
                    }
                });

                UserBorrowShelf.upsert({
                    userId: Meteor.userId()
                }, {
                    $push: {
                        bookInfo: bookInfo
                    }
                });  
            
            }
        }
            //Communicate to the user
            var userProfile = UserProfile.findOne({
                userId: Meteor.userId()
            });
            var book = Books.findOne({
                "_id": currentBorrowBookInfo.ilendbooksId
            });
            currentBorrowBookInfo.appUUID = appUUID;
            currentBorrowBookInfo.toUserId = Meteor.userId();
            currentBorrowBookInfo.emailSubject = "Book added to your borrow wish-list!";
            currentBorrowBookInfo.email = userProfile.email;
            currentBorrowBookInfo.contactPreference = userProfile.contactPreference;
            currentBorrowBookInfo.emailBody = "Would like let you know that the below book is added to your borrow wish shelf:" +
                    "\n" +
                    book.ItemAttributes[0].Title[0];

            if (ilendbooks.public.contactPreference.PHONE === userProfile.contactPreference) {
                currentBorrowBookInfo.phoneNumber = userProfile.phoneNumber;
                currentBorrowBookInfo.contactPreference = userProfile.contactPreference;
                currentBorrowBookInfo.smsMessage = "Would like let you know that the below book is added to your borrow wish shelf:" +
                    "\n" +
                    book.ItemAttributes[0].Title[0];
            }

            currentBorrowBookInfo.borrowerUserId = Meteor.userId();
            // currentBorrowBookInfo.status = ilendbooks.public.status.AVILABLE;
            currentBorrowBookInfo.statusLend = "",
            currentBorrowBookInfo.statusBorrow = ilendbooks.public.status.WISH_LISTED,
            // update user borrower shelf
            Meteor.call('contact', appUUID, currentBorrowBookInfo);
            Meteor.call('insertHistory', appUUID, currentBorrowBookInfo);
            
        
    }})

