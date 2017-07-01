Meteor.methods({
updateUserLendShelf(appUUID, currentlenderBookInfo) {
    for (var currentlenderBookInfoKey in currentlenderBookInfo) {
        console.log(appUUID + ":updateUserLendShelf:" + currentlenderBookInfoKey + "=" + currentlenderBookInfo[currentlenderBookInfoKey]);
    }


    var dateTime = Meteor.call('getLocalTime');

    var currentUserFromUserLendShelfDB = UserLendShelf.findOne({
        userId: Meteor.userId()
    });
    for (var currentUserFromUserLendShelfDBKey in currentUserFromUserLendShelfDB) {
        console.log(appUUID + ":currentUserFromUserLendShelfDBKey=" + currentUserFromUserLendShelfDBKey + ":value=" + currentUserFromUserLendShelfDB[currentUserFromUserLendShelfDBKey])
    }
    var bookInfo = {
        ilendbooksId: currentlenderBookInfo.ilendbooksId,
        dateTime: dateTime,
        status: ilendbooks.public.status.AVAILABLE,
        matchedUserId: ""
    };
    if (currentUserFromUserLendShelfDB == null) {
        UserLendShelf.upsert({
            userId: Meteor.userId()
        }, {
            $set: {
                userId: Meteor.userId()
            }
        });

        UserLendShelf.upsert({
            userId: Meteor.userId()
        }, {
            $push: {
                bookInfo: bookInfo
            }
        });

    } else {

        var isBookInUserLendShelf = false;

        for (currentBookInfoKey in currentUserFromUserLendShelfDB.bookInfo) {
            if (currentUserFromUserLendShelfDB.bookInfo[currentBookInfoKey].ilendbooksId === currentlenderBookInfo.ilendbooksId) {
                isBookInUserLendShelf = true;

                console.log("currentUserFromUserLendShelfDB.bookInfo[currentBookInfoKey].status=" + currentUserFromUserLendShelfDB.bookInfo[currentBookInfoKey].status);
                if (currentUserFromUserLendShelfDB.bookInfo[currentBookInfoKey].status === ilendbooks.public.status.REMOVED ||
                    currentUserFromUserLendShelfDB.bookInfo[currentBookInfoKey].status === ilendbooks.public.status.DELETE) {
                    console.log(appUUID +
                        ":updateUserLendShelf:status changed" +
                        "userId=" + currentUserFromUserLendShelfDB.userId +
                        "ilendbooksId=" + currentlenderBookInfo.ilendbooksId +
                        "to-status=" + ilendbooks.public.status.AVAILABLE
                    );
                    UserLendShelf.update({
                        "userId": Meteor.userId(),
                        "bookInfo.ilendbooksId": currentlenderBookInfo.ilendbooksId
                    }, {
                        "$set": {
                            "bookInfo.$.status": ilendbooks.public.status.AVAILABLE
                        }
                    });
                }

                break;
            }
        }
        if (isBookInUserLendShelf) {
            console.log(appUUID + ":updateUserLendShelf:current book is already in the user lend shelf: userId=" + Meteor.userId() + ";ilendbooksId=" + currentlenderBookInfo.ilendbooksId);
        } else {
            console.log(appUUID + ":updateUserLendShelf:user exist, trying to upsert the book");
            UserLendShelf.upsert({
                userId: Meteor.userId()
            }, {
                $push: {
                    bookInfo: bookInfo
                }
            });
        }
    }
}
});

