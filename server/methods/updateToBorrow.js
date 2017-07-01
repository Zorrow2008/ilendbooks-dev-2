Meteor.methods({
    updateToBorrow(appUUID, borrowerInfoBook) {
        borrowerInfoBook.dateTime = Meteor.call('getLocalTime');
        borrowerInfoBook.userId = Meteor.userId();
        borrowerInfoBook.matchedUserId = borrowerInfoBook.lenderUserId;
        for (var borrowerInfoBookKey in borrowerInfoBook) {
            console.log(appUUID + ":updateToBorrow:borrowerInfoBook." + borrowerInfoBookKey + "=" + borrowerInfoBook[borrowerInfoBookKey]);
        }


        var dateTime = Meteor.call('getLocalTime');
        var currentBookFromToBorrowDB = ToBorrow.findOne({
            title: borrowerInfoBook.title,
            ilendbooksId: borrowerInfoBook.ilendbooksId
        });
        var currentBorrowerInfo = {
            ilendbooksId: borrowerInfoBook.ilendbooksId,
            userId: borrowerInfoBook.userId,
            dateTime: borrowerInfoBook.dateTime,
            status: borrowerInfoBook.statusBorrow,
            matchedUserId: borrowerInfoBook.matchedUserId
        };
        if (currentBookFromToBorrowDB == null) {

            ToBorrow.upsert({
                title: borrowerInfoBook.title,
                ilendbooksId: borrowerInfoBook.ilendbooksId
            }, {
                $set: {
                    title: borrowerInfoBook.title,
                    ilendbooksId: borrowerInfoBook.ilendbooksId
                }
            })

            ToBorrow.upsert({
                title: borrowerInfoBook.title,
                ilendbooksId: borrowerInfoBook.ilendbooksId
            }, {
                $push: {
                    borrower: currentBorrowerInfo,
                }
            })
        } else {
            var userPastBorrower = false;
            var isUserMarkedBorrower = false;
            for (currentBookKey in currentBookFromToBorrowDB.borrower) {
                if (currentBookFromToBorrowDB.borrower[currentBookKey].userId === Meteor.userId()) {
                    isUserMarkedBorrower = true;
                    if (currentBookFromToBorrowDB.borrower[currentBookKey].status == ilendbooks.public.status.PAST_BORROWER) {
                        userPastBorrower = true;
                    } 
                }
                break;
            }

            if (isUserMarkedBorrower && !userPastBorrower) {
                console.log(appUUID + ":updateToBorrow:current user is marked as borrower already:" + currentBookFromToBorrowDB.borrower[currentBookKey].userId)
            } else if (userPastBorrower) {
                ToBorrow.insert({
                    title: borrowerInfoBook.title,
                    ilendbooksId: borrowerInfoBook.ilendbooksId
                }, {
                    $push: {
                        borrower: currentBorrowerInfo,
                    }
                })
            } else {
                ToBorrow.upsert({
                    title: borrowerInfoBook.title,
                    ilendbooksId: borrowerInfoBook.ilendbooksId
                }, {
                    $push: {
                        borrower: currentBorrowerInfo,
                    }
                })
            }
        }


        Meteor.call('updateUserBorrowShelf', appUUID, borrowerInfoBook);
        Meteor.call('updateLenderStatusAndMatchedUserId', appUUID, borrowerInfoBook);
        Meteor.call("updateStatus", appUUID, borrowerInfoBook);
        Meteor.call('insertHistory', appUUID, borrowerInfoBook);
        
    }

})