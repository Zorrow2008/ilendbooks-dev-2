Meteor.methods({
    updateToLend(appUUID, currentlenderBookInfo) {

        for (var currentlenderBookInfoKey in currentlenderBookInfo) {
            console.log(appUUID + ":updateToLend:currentlenderBookInfo." + currentlenderBookInfoKey + "=" + currentlenderBookInfo[currentlenderBookInfoKey]);
        }

        var dateTime = Meteor.call('getLocalTime');
        var currentBookFromToLendDB = ToLend.findOne({
            title: currentlenderBookInfo.title,
            ilendbooksId: currentlenderBookInfo.ilendbooksId
        });
        var lenderInfo = {
            userId: Meteor.userId(),
            dateTime: dateTime,
            status: ilendbooks.public.status.AVAILABLE,
            bookCondition: currentlenderBookInfo.condition,
            bookDescription: currentlenderBookInfo.description
        };
        if (currentBookFromToLendDB == null) {
            ToLend.upsert({
                title: currentlenderBookInfo.title,
                ilendbooksId: currentlenderBookInfo.ilendbooksId
            }, {
                $set: {
                    title: currentlenderBookInfo.title,
                    ilendbooksId: currentlenderBookInfo.ilendbooksId
                }
            });

            ToLend.upsert({
                title: currentlenderBookInfo.title,
                ilendbooksId: currentlenderBookInfo.ilendbooksId
            }, {
                $push: {
                    lender: lenderInfo
                }
            });
        } else {
            var isUserMarkedLender = false;

            for (currentBookKey in currentBookFromToLendDB.lender) {
                if (currentBookFromToLendDB.lender[currentBookKey].userId === Meteor.userId()) {
                    isUserMarkedLender = true;
                    console.log("currentBookFromToLendDB.lender[currentBookKey].status=" + currentBookFromToLendDB.lender[currentBookKey].status);
                    if (currentBookFromToLendDB.lender[currentBookKey].status === ilendbooks.public.status.REMOVED ||
                        currentBookFromToLendDB.lender[currentBookKey].status === ilendbooks.public.status.DELETE) {
                        console.log(appUUID +
                            ":updateToLend:status changed" +
                            "userId=" + currentBookFromToLendDB.lender[currentBookKey].userId +
                            "to-status=" + ilendbooks.public.status.AVAILABLE
                        );

                        ToLend.update({
                            "ilendbooksId": currentlenderBookInfo.ilendbooksId,
                            "lender.userId": Meteor.userId()
                        }, {
                            "$set": {
                                "lender.$.status": ilendbooks.public.status.AVAILABLE
                            }
                        });
                    }
                    break;
                }
            }

            if (isUserMarkedLender) {
                console.log(appUUID + ":updateToLend:current user is marked as lender already:" + currentBookFromToLendDB.lender[currentBookKey].userId)
            } else {
                ToLend.upsert({
                    title: currentlenderBookInfo.title,
                    ilendbooksId: currentlenderBookInfo.ilendbooksId
                }, {
                    $push: {
                        lender: lenderInfo
                    }
                })
            }
        }
        //Communicate to the user
        var userProfile = UserProfile.findOne({
            userId: Meteor.userId()
        });
        var book = Books.findOne({
            "_id": currentlenderBookInfo.ilendbooksId
        });
        currentlenderBookInfo.appUUID = appUUID;
        currentlenderBookInfo.toUserId = Meteor.userId();
        currentlenderBookInfo.emailSubject = "Book added to your shelf!";

       // if (ilendbooks.public.contactPreference.EMAIL === userProfile.contactPreference) {

            currentlenderBookInfo.email = userProfile.email;
            currentlenderBookInfo.contactPreference = userProfile.contactPreference;
            currentlenderBookInfo.emailBody = "Would like let you know that the below book is added to your shelf:" +
                "\n" +
                book.ItemAttributes[0].Title[0];

         if (ilendbooks.public.contactPreference.PHONE === userProfile.contactPreference) {
            currentlenderBookInfo.phoneNumber = userProfile.phoneNumber;
            currentlenderBookInfo.contactPreference = userProfile.contactPreference;
            currentlenderBookInfo.smsMessage = "Would like let you know that the below book is added to your shelf:" +
                "\n" +
                book.ItemAttributes[0].Title[0];
        }

        currentlenderBookInfo.lenderUserId = Meteor.userId();
        currentlenderBookInfo.status = ilendbooks.public.status.AVILABLE;
        currentlenderBookInfo.statusLend = ilendbooks.public.status.AVAILABLE,
            currentlenderBookInfo.statusBorrow = "",
           // currentlenderBookInfo.bookCoin = ilendbooks.private.bitCoin.ADDONE_BOOK;
        // update user lender shelf
        Meteor.call('updateUserLendShelf', appUUID, currentlenderBookInfo);
        //Meteor.call('addBookcoin', appUUID, currentlenderBookInfo.lenderUserId, currentlenderBookInfo.bookCoin);
        Meteor.call('contact', appUUID, currentlenderBookInfo);
        Meteor.call('insertHistory', appUUID, currentlenderBookInfo);
    }})

