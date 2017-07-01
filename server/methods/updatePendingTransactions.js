
Meteor.methods({
  updatePendingTransactions(appUUID, lenderUserId, borrowerUserId, ilendbooksId, statusLend, statusBorrow){
    console.log(appUUID + ":updatePendingTransactions:lenderUserId="+ lenderUserId);
    console.log(appUUID + ":updatePendingTransactions:borrowerUserId="+ borrowerUserId);
    console.log(appUUID + ":updatePendingTransactions:ilendbooksId="+ ilendbooksId);
    console.log(appUUID + ":updatePendingTransactions:statusLend="+ statusLend);
    console.log(appUUID + ":updatePendingTransactions:statusBorrow="+ statusBorrow);

    PendingTransactions.update({
      lenderUserId: lenderUserId,
      borrowerUserId: borrowerUserId,
      ilendbooksId: ilendbooksId
    }, { $set: { statusLend: statusLend, statusBorrow:statusBorrow } });
  }

});
