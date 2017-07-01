Meteor.methods({
   setMatch: function(currentBook, borrowerInfo) {
      //loop through lend and find first available lender.
      for(var currentBookKey in currentBook) {
         console.log("currentBookKey: " + currentBookKey + ";value: " + currentBook[currentBookKey]);
      }
      var lendDoc = ToLend.findOne({title: currentBook.title});
      if(lendDoc != null){
         for(var lendDocKey in lendDoc) {
            console.log("lendDocKey: " + lendDocKey + ";value: " + lendDoc[lendDocKey]);
         }
         var hasLender = false;
         var firstAvailableLender;
         for(lenderKey in lendDoc.lender) {
            if(lendDoc.lender[lenderKey].hasMatched == false && !hasLender) {
               firstAvailableLender = lendDoc.lender[lenderKey].userId;
               hasLender = true;
            }
         }
         console.log("firstAvailableLender = " + firstAvailableLender);
         // match firstavailablelender to the borrower
         if(hasLender) {
            var borrowDoc = ToBorrow.findOne({title: currentBook.title});
            var rightKey;
            for(var borrowerKey in borrowDoc.borrower) {
               if(borrowDoc.borrower[borrowerKey].userId == currentBook.currentBorrowerId) {
                  rightKey = borrowerKey;
               }
            }
            //borrowDoc.borrower.rightKey.potentialLender
            borrowerInfo.potentialLender = firstAvailableLender;
            for(var borrowerInfoKey in borrowerInfo) {
               console.log("borrowerInfoKey: " + borrowerInfoKey + ";borrowerInfoValue: " + borrowerInfo[borrowerInfoKey]);
            }
            ToBorrow.upsert({
               title: currentBook.title,
               ilendbooksId: currentBook.ilendbooksId
            }, {
               $set: {
                  borrower: borrowerInfo
               }
            })
         }else{
            console.log("There are no lenders for this book 2");
         }
      }else{
         console.log("There are no lenders for the book: " + currentBook.title);
         console.log("userID looking for this: " + currentBook.currentBorrowerId);
      }
   }
})

//put lender's id into borrower array --> first