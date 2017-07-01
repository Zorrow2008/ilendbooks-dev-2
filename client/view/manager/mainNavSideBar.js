Template.mainNavSideBar.helpers({
	getNotificationCount: function() {
		var pendingTransactions = PendingTransactions.find({lenderUserId: Meteor.userId()
			, statusLend:ilendbooks.public.status.MATCHED_NOTIFIED, statusBorrow:ilendbooks.public.status.MATCHED_NOTIFIED});
		console.log("length: " + pendingTransactions.count())
		return pendingTransactions.count();
	},

  getBookCoin: function() {
    var user = UserProfile.findOne({userId: Meteor.userId()});
    if(user == null) {
       return 0;   
    }else{
      return user.bookcoin;
    }

  }
})

Template.mainNavSideBar.events({


  'click .feedback': function() {
    Modal.show('feedback');
  },
      'submit form' ( event, template ) {
        event.preventDefault();
        var keywords = event.target.keyword.value;
        var appUUID = Session.get('appUUID');
        Session.setAuth('keywords', keywords);
       var searchParameters = {
          keywords : keywords,
       }
       console.log("keywords: " + keywords)
       Meteor.call( 'itemSearch', appUUID, searchParameters);
       Router.go('searchResults');
  }

});
