Meteor.methods({
    updateDeleteFromBorrowWishList(appUUID, currentBorrowBookInfo) {

        for (var currentBorrowBookInfoKey in currentBorrowBookInfo) {
            console.log(appUUID + ":updateDeleteFromBorrowWishList:currentBorrowBookInfo." + currentBorrowBookInfoKey + "=" + currentBorrowBookInfo[currentBorrowBookInfoKey]);
        }


            UserBorrowShelf.update({
                "userId": Meteor.userId(),
                "bookInfo.ilendbooksId": currentBorrowBookInfo.ilendbooksId
            }, {
                "$set": {
                    "bookInfo.$.status": ilendbooks.public.status.WISH_LISTED_DELETED
                   
                }
            })

            //Communicate to the user
            var userProfile = UserProfile.findOne({
                userId: Meteor.userId()
            });
            var book = Books.findOne({
                "_id": currentBorrowBookInfo.ilendbooksId
            });
            currentBorrowBookInfo.appUUID = appUUID;
            currentBorrowBookInfo.toUserId = Meteor.userId();
            currentBorrowBookInfo.emailSubject = "Book deleted from your borrow wish-list!";
            currentBorrowBookInfo.email = userProfile.email;
            currentBorrowBookInfo.contactPreference = userProfile.contactPreference;
            currentBorrowBookInfo.emailBody = "Would like let you know that the below book is deleted from your borrow wish shelf:" +
                    "\n" +
                    book.ItemAttributes[0].Title[0];

            if (ilendbooks.public.contactPreference.PHONE === userProfile.contactPreference) {
                currentBorrowBookInfo.phoneNumber = userProfile.phoneNumber;
                currentBorrowBookInfo.contactPreference = userProfile.contactPreference;
                currentBorrowBookInfo.smsMessage = "Would like let you know that the below book is deleted to your borrow wish shelf:" +
                    "\n" +
                    book.ItemAttributes[0].Title[0];
            }

            currentBorrowBookInfo.borrowerUserId = Meteor.userId();
            currentBorrowBookInfo.statusLend = "";
            currentBorrowBookInfo.statusBorrow = ilendbooks.public.status.WISH_LISTED_REMOVED;
            // update user borrower shelf
            Meteor.call('contact', appUUID, currentBorrowBookInfo);
            Meteor.call('insertHistory', appUUID, currentBorrowBookInfo);
    }})

