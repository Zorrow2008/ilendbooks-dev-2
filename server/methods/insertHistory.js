Meteor.methods({
    insertHistory(appUUID, transactionInfo) {

        for (var transactionInfoKey in transactionInfo) {
            console.log(appUUID +
                ":insertHistory:" +
                transactionInfoKey + "=" + transactionInfo[transactionInfoKey]
            );
        }

        var historyInfo = {
            appUUID: appUUID,
            statusLend: transactionInfo.statusLend,
            statusBorrow: transactionInfo.statusBorrow,
            userReason: transactionInfo.userReason,
            createdAt: new Date(),
            contactParameters: transactionInfo
        }

        History.upsert({
            lenderUserId: transactionInfo.lenderUserId,
            borrowerUserId: transactionInfo.borrowerUserId,
            ilendbooksId: transactionInfo.ilendbooksId
        }, {
            $set: {
                lenderUserId: transactionInfo.lenderUserId,
                borrowerUserId: transactionInfo.borrowerUserId,
                ilendbooksId: transactionInfo.ilendbooksId
            },
            $push: {
                historyInfo: historyInfo
            }
        })
    }
});