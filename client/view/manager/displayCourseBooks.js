Template.displayCourseBooks.helpers({
  	getCourses: function() {
  		return Session.get('classes');
  	},
    
  	getTextbooks: function(course) {
	    // var textbookDoc = Textbooks.findOne({course: course});
	    // return textbookDoc.textbooks;
	    console.log("course:" + course)
	    //var books = db.bookRef.distinct("course"); //BookRef.find({course: course});
      //BookRef.collection.distinct('course');
	    // for(var key in books ) {
	    // 	console.log("key: " + key + ", value: " + books[key]);
	    // }

     // var books = BookRef.find(course: course).fetch();
      // var booksArray = _.uniq(books, false, function(d) {return d.course});
      // var disctinctValues = _.pluck(distinctArray, 'foo');

      var books = _.uniq(BookRef.find({course: course}, {
          sort: {course: 1}, fields: {course: true, ilendbooksId: true}
      }).fetch().map(function(x) {
          return x;
      }), true);


     // var books = BookRef.rawCollection().distinct();

    // var books = BookRef.find(course: course).fetch();

    //var books = BookRef.find({course: course});

      for(var key in books ) {
       console.log("key: " + key + ", value: " + books[key]);
      }
    // return _.uniq(books);
	    return books;
  	},

  	isLendTurn: function() {
  		return Session.get('userType') == ilendbooks.public.userType.LENDER
  	},

    isRealBook: function(ilendbooksId) {
      var currentLentBook = Books.findOne({_id: ilendbooksId});
      return currentLentBook != null;
    },

  	getTitle: function(ilendbooksId) {
  		var currentLentBook = Books.findOne({_id: ilendbooksId});
  		console.log("title: " + currentLentBook.ItemAttributes[0].Title[0])
  		return currentLentBook.ItemAttributes[0].Title[0];
  	},

    getImage: function(ilendbooksId) {
    //var currentLentBook = Session.get('currentLentBook');
    var currentLentBook = Books.findOne({_id: ilendbooksId});
   // console.log("getImage called");
    return currentLentBook.LargeImage[0].URL[0];
   },

   getNumberToLend: function(ilendbooksId) {
    var lendDoc = ToLend.findOne({ilendbooksId: ilendbooksId});
    //console.log("lender array size: " + lendDoc.lender.length);
    if(lendDoc == null) {
      return 0;
    }
    return lendDoc.lender.length;
   },

   getNumberToBorrow: function(ilendbooksId) {
    var borrowDoc = ToBorrow.findOne({ilendbooksId: ilendbooksId});
   // console.log("borrower array size: " + borrowDoc.borrower.length);
    if(borrowDoc == null) {
      return 0;
    }
    return borrowDoc.borrower.length;

   }
})

Template.displayCourseBooks.events({
	// 'click .finished': function() {
	// 	console.log("displayCourseBooks: " + Session.get('userType'))
	// 	Meteor.call('updateQuarterTrackerStatus',Session.get('userType'));
	// },

   'click .lend' : function(event) {
      event.preventDefault();
      var bookDoc = Books.findOne({_id: this.ilendbooksId});
      var title = bookDoc.ItemAttributes[0].Title[0];
      console.log("book title: " + title);
      var ilendbooksId = this.ilendbooksId;
      console.log("searchResult:lend:ilendbooksId=" + ilendbooksId);
      Session.set('condition-lendBook-title', title);
      Session.set('condition-lendBook-ilendbooksId', ilendbooksId);
      Modal.show('clickedLendModal');
   },

  'click .borrow': function(event) {
   	  var bookDoc = Books.findOne({_id: this.ilendbooksId});
      var title = bookDoc.ItemAttributes[0].Title[0];
      console.log("book title: " + title);
      console.log("title" + title);
      var element = {};
      element.title = title;
      element.users = [];
      element.currentBorrowerId = Meteor.userId();
      element.ilendbooksId = this.ilendbooksId
      console.log("element" + element);
      Session.setAuth('specificBook-title', element.title);
      Session.setAuth('specificBook-ilendbooksId' , element.ilendbooksId);
      Router.go("specificBookPage");
      
   },

   'click .finished': function(event) {
      var modalTitle = "Finished lending?";
      var modalBodyArray = ["Have you offered any available books for lending?"];

      if(Session.get('userType') == ilendbooks.public.userType.BORROWER) {
        modalTitle = "Finished borrowing?";
        modalBodyArray =  ["Have you found your books for your upcoming classes?"];
      }
      Session.set(ilendbooks.public.modal.TITLE, modalTitle);
      Session.set(ilendbooks.public.modal.BODY_ARRAY, modalBodyArray);
      Modal.show('confirmActionModal');
   }
})