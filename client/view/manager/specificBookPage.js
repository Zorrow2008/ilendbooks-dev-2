Template.specificBookPage.helpers({
   getTitle: function() {
      var title = Session.get('specificBook-title');
     // console.log("this was called" + title);
      return title;
   },

   // isNotSameLender: function(userId) {
   //    return Meteor.userId() != userId;
   // },

   // isAvailable: function(userId) {
   //    var ilendbooksId = Session.get('specificBook-ilendbooksId');
   //    var lender = UserLendShelf.findOne({userId: userId});
   //    var realKey;
   //    for(var lenderKey in lender.bookInfo) {
   //        if(lender.bookInfo[lenderKey].ilendbooksId == ilendbooksId) {
   //          realKey = lenderKey;
   //        }
   //    }
   //    console.log("lender.bookInfo[realKey].status == ilendbooks.public.status.AVAILABLE")
   //    return lender.bookInfo[realKey].status == ilendbooks.public.status.AVAILABLE;
   // },

   getAuthor: function() {
     var doc = Books.findOne({_id: Session.get('specificBook-ilendbooksId')})
     return doc.ItemAttributes[0].Author[0];
   },

   getPublisher: function() {
      var doc = Books.findOne({_id: Session.get('specificBook-ilendbooksId')})
     return doc.ItemAttributes[0].Publisher[0];
   },

   getEdition: function() {
      var doc = Books.findOne({_id: Session.get('specificBook-ilendbooksId')})
     return doc.ItemAttributes[0].Edition[0];
   },

   getISBN: function() {
     var doc = Books.findOne({_id: Session.get('specificBook-ilendbooksId')})
     return doc.ItemAttributes[0].ISBN[0];
   },

   getPublicationDate: function() {
      var doc = Books.findOne({_id: Session.get('specificBook-ilendbooksId')})
     return doc.ItemAttributes[0].PublicationDate[0];
   },

   getNumberOfPages: function() {
      var doc = Books.findOne({_id: Session.get('specificBook-ilendbooksId')})
     return doc.ItemAttributes[0].NumberOfPages[0];
   },

   getImage: function() {
    // console.log("i reached getImage");
     var ilendbooksId = Session.get('specificBook-ilendbooksId').valueOf();
    // console.log("ilendbooksId: " + ilendbooksId);
     var currentBook = Books.findOne({"_id": ilendbooksId});
    // console.log("currentbook:"+currentBook);
   //  var currentbook = Books.findOne({Session.get('ilendbooksId')});
     return currentBook.LargeImage[0].URL[0];

     // return Session.get('specificBookImage');
   },

   hasLenders: function() {
    var currentBook = ToLend.findOne({
      ilendbooksId: Session.get('specificBook-ilendbooksId'), 
      lender: {$elemMatch:{userId:{$ne: Meteor.userId() }, status:ilendbooks.public.status.AVAILABLE}}
    });
    return currentBook != null;
    },

   getLenders: function() {
     // console.log("getLenders called");
     // console.log("ilendbooksid: " + Session.get('ilendbooksId'));
    var currentBook = ToLend.findOne({
      ilendbooksId: Session.get('specificBook-ilendbooksId'), 
      lender: {$elemMatch:{userId:{$ne: Meteor.userId() }, status:ilendbooks.public.status.AVAILABLE}}
    });
    // var currentBook = ToLend.findOne({ilendbooksId: Session.get('specificBook-ilendbooksId')});
      for(key in currentBook) {
         console.log("key: " + key + ";value: " + currentBook[key]);
      }
    //  console.log(currentBook.lender);
      return currentBook.lender;
   },

   getLenderFirstName: function(userId) {
      //console.log("getLenderName called");
      return UserProfile.findOne({userId: userId}).fName;
   },

   // isEmail: function(userId) {
   //    var currentPendingTransaction = PendingTransactions.findOne({lenderUserId: userId});
   //    for(key in currentPendingTransaction) {
   //      console.log(key + "; " + currentPendingTransaction[key]);
   //    }
   //    var contactMethod = currentPendingTransaction && currentPendingTransaction.contactParameters && currentPendingTransaction.contactParameters.contactMethod;
   //    console.log("email: " + contactMethod );
   //    console.log("ilendbooks.public.contactPreference.EMAIL:" + ilendbooks.public.contactPreference.EMAIL);
   //    console.log("is email: "+ (contactMethod  == ilendbooks.public.contactPreference.EMAIL)); 
   //    return contactMethod  == ilendbooks.public.contactPreference.EMAIL;
   // },

   // hasClickedBorrow: function() {
   //    var title = Session.get('specificBook-title');
   //    var ilendbooksId = Session.get('specificBook-ilendbooksId')
   //    console.log("title" + title);
   //    var currentBook = ToBorrow.findOne({title: title, ilendbooksId:ilendbooksId});
   //    for(key in currentBook.borrower) {
   //       if(currentBook.borrower[key].userId == Meteor.userId()) {
   //          console.log("true");
   //          return true;
   //       }
   //    }
   //    console.log("false");
   //    return false;
   // },

    hasClickedBorrowAndNotPastBorrow: function() {
      var title = Session.get('specificBook-title');
      var ilendbooksId = Session.get('specificBook-ilendbooksId')
      console.log("title" + title);
      var currentBook = ToBorrow.findOne({title: title, ilendbooksId:ilendbooksId});
      var result = false;
      for(var key in currentBook.borrower) {
         if(currentBook.borrower[key].userId === Meteor.userId()) {
            if(currentbook.borrower[key].status != ilendbooks.public.status.PAST_BORROW) {
                result = true;
            }
         }
      }
     return result;
   },

   getLenderAverageRating: function(userId) {
      // var currentLender = Reviews.findOne({userId: userId});
      // console.log("getLenderAverageRating called");
      // console.log("currentLender.averageLenderRating: " + currentLender.averageLenderRating);
      // return currentLender.averageLenderRating;
      return Reviews.findOne({userId: this.userId }).averageLenderRating;
   },

   hasBookCondition: function(bookCondition){
      if(bookCondition) {
        return true;
      } else {
        return false;
      }

   },

   hasBookDescription: function (bookDescription) {
      if(bookDescription) {
        return true;
      } else {
        return false;
      }

   },

   isMatchedDeclined: function(userId) {
    console.log("isMatchedDeclined called");
    console.log("userId: " + userId);
    //console.log("ilendbooksId: " + ilendbooksId);
      var PendingTransactionsDoc = PendingTransactions.findOne({
          lenderUserId: userId,
          borrowerUserId: Meteor.userId(),
          ilendbooksId: Session.get('specificBook-ilendbooksId')
      })
      for(var key in PendingTransactionsDoc) {
        console.log("PendingTransactionsDocKey: " + key + "; PendingTransactionsDocValue: " + PendingTransactionsDoc[key]);
      }
      if(PendingTransactionsDoc != null) {
        if(PendingTransactionsDoc.statusLend == ilendbooks.public.status.MATCHED_DECLINED
          && PendingTransactionsDoc.statusBorrow == ilendbooks.public.status.MATCHED_DECLINED) {
            console.log("true");
            return true;
        }
      }
      console.log("false")
      return false;
   }

})

Template.specificBookPage.events({
   'click .borrow': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      var bookTitle = Session.get('specificBook-title');
      var borrowerInfo = {
        title : bookTitle,
        borrowerUserId: Meteor.userId(),
        ilendbooksId :Session.get('specificBook-ilendbooksId'),
        lenderUserId:this.userId,
      };

      for(borrowerKey in borrowerInfo) {
        console.log(borrowerKey + "; " + borrowerInfo[borrowerKey]);
      }
      Meteor.call('updateToBorrowAndContactLender', appUUID, borrowerInfo);
      var modalTitle = "Thank you!";
      var modalBody = ["It is great that you are lending/borrowing text books... SAVE THE EARTH!"];
      var userProfile = UserProfile.findOne({userId: this.userId})
      if (userProfile.contactPreference === ilendbooks.public.contactPreference.EMAIL) {
          modalBody =  ["An email has been sent to the lender. Thank you!"];
      } else if (userProfile.contactPreference === ilendbooks.public.contactPreference.PHONE) {
          modalBody =  ["An SMS has been sent to the lender. Thank you!"];
      } 

      Session.set(ilendbooks.public.modal.TITLE, modalTitle);
      Session.set(ilendbooks.public.modal.BODY_ARRAY, modalBody);

      Modal.show('ilendInfoModal');
      console.log("updateToBorrowAndContactLender finished");
      Router.go("myBorrows");

   },
   'click .borrow-request-in-process': function(event) {
      event.preventDefault();
      var modalTitle = "In Process";
      var modalBody =  ["Your earlier request for this book is in process. Thank you!"];
      

      Session.set(ilendbooks.public.modal.TITLE, modalTitle);
      Session.set(ilendbooks.public.modal.BODY_ARRAY, modalBody);

      Modal.show('ilendInfoModal');
   }

})
