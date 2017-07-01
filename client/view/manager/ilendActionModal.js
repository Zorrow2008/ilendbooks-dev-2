//Note: make sure you set the data as below in the Session before calling the Modal
//
//Note: add a new event handler with "'click .matched-declined'"  to handle your action in this file
// Session.set(ilendbooks.public.modal.action.TITLE,"Borrow request declined.");
// Session.set(ilendbooks.public.modal.action.BODY, "Are you sure you want to decline " + borrowerName + "'s borrow request?");
// Session.set(ilendbooks.public.modal.action.FEED_BACK_FLAG, true);
// Session.set(ilendbooks.public.modal.action.FEED_BACK_LABEL, "Would you like to give a reason?");
// Session.set(ilendbooks.public.modal.action.DISPLAY, "Yes, please");
// Session.set(ilendbooks.public.modal.action.CLASS, "matched-declined");



Template.ilendActionModal.helpers({
   getActionModalTitle: function() {
      	return Session.get(ilendbooks.public.modal.action.TITLE);
   },

   getActionModalBody: function() {
      	return Session.get(ilendbooks.public.modal.action.BODY);
   },
   isActionModalFeedBackFlag:function() {
	   	if(Session.get(ilendbooks.public.modal.action.FEED_BACK_FLAG)) {
	   		return true;
	   	} else {
			return false
	   	}
   },
   getActionModalFeedBackFlag: function(){
   	return Session.get(ilendbooks.public.modal.action.FEED_BACK_FLAG);
   },

   getActionModalClass: function() {
		return Session.get(ilendbooks.public.modal.action.CLASS);
   },

   getActionModalDisplay: function() {
   		return Session.get(ilendbooks.public.modal.action.DISPLAY);
   },

   getActionModalFeedBackLabel: function() {
   		return Session.get(ilendbooks.public.modal.action.FEED_BACK_LABEL);
   }


})


Template.ilendActionModal.events({
   'click .delete': function(event, target) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      console.log("appUUID=" + appUUID);
      var ilendbooksId = Session.get ("ilendbooksId");
      console.log("delete:ilendbookdsId=" + ilendbooksId );
      var userReason = $('textarea#ilendActionModalTextArea').val();
      console.log("delete:userReason=" + userReason );
      var contactParameters = {
         ilendbooksId: ilendbooksId,
         userReason: userReason
      };
      Meteor.call("updateUserBookDelete", appUUID, contactParameters );
      Modal.hide('ilendActionModal');
   },

   'click .removed': function(event, target) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      console.log("appUUID=" + appUUID);
      var ilendbooksId = Session.get ("ilendbooksId");
      console.log("removed:ilendbookdsId=" + ilendbooksId );
      var userReason = $('textarea#ilendActionModalTextArea').val();
      console.log("removed:userReason=" + userReason );

      var contactParameters={};
      contactParameters.ilendbooksId=ilendbooksId;
      contactParameters.userReason=userReason;

      Meteor.call("updateUserBookRemoved", appUUID, contactParameters );
      Modal.hide('ilendActionModal');
   },

	'click .matched-declined': function(event) {
	   //set status in userLendShelf and userBorrowShelf to matched-accepted
      event.preventDefault();
	   var appUUID = Session.get('appUUID');
      console.log("appUUID=" + appUUID);
      //var contactParameters = Session.get(ilendbooks.public.other.CONTACT_PARAMETERS);
      // var contactParameters = {
      //    ilendbooksId: Session.get('ilendbooksId'),
      //    lenderUserId: Meteor.userId(),
      //    borrowerUserId: PendingTransactions.find({lenderUserId: Meteor.userId()
      // }
      var contactParameters = PendingTransactions.findOne({
         lenderUserId: Meteor.userId(),  
         ilendbooksId: Session.get('ilendbooksId'),
         statusLend:ilendbooks.public.status.MATCHED_NOTIFIED,
         statusBorrow:ilendbooks.public.status.MATCHED_NOTIFIED
      }).contactParameters;

      console.log("contactParameters =" + contactParameters );  
      Meteor.call("updateMatchDeclined", appUUID, contactParameters );
	   Modal.hide('ilendActionModal');		
	},

   'click .lender-lent-declared': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      ilendbooksId = Session.get('ilendbooksId');
      var contactParameters = PendingTransactions.findOne({
         lenderUserId: Meteor.userId(), 
         ilendbooksId: ilendbooksId,
         statusBorrow: ilendbooks.public.status.MATCHED_ACCEPTED,
         statusLend: ilendbooks.public.status.MATCHED_ACCEPTED
      }).contactParameters;
      console.log("contactParameters =" + contactParameters );
      Meteor.call("updateLenderLentDeclared", appUUID, contactParameters);
      Modal.hide('ilendActionModal');
   },

   'click .borrower-lent-received': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      var ilendbooksId = Session.get('ilendbooksId');
      var contactParameters = PendingTransactions.findOne({
         borrowerUserId: Meteor.userId(), 
         ilendbooksId: ilendbooksId,
         statusBorrow: ilendbooks.public.status.MATCHED_ACCEPTED,
         statusLend: ilendbooks.public.status.MATCHED_ACCEPTED
      }).contactParameters;
      Meteor.call("updateBorrowerLentReceived", appUUID, contactParameters);
      Modal.hide('ilendActionModal');
   },

   'click .with-borrower': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      ilendbooksId = Session.get('ilendbooksId');
   //   borrowerUserId = PendingTransactions.findOne({lenderUserId: Meteor.userId(), ilendbooksId: ilendbooksId}).contactParameters.borrowerUserId;
      var contactParameters;
      var contactParameters1 = PendingTransactions.findOne({
         lenderUserId: Meteor.userId(), 
         ilendbooksId: ilendbooksId,
         statusBorrow: ilendbooks.public.status.LENDER_LENT_DECLARED,
         statusLend: ilendbooks.public.status.LENDER_LENT_DECLARED
      })

      var contactParameters2 = PendingTransactions.findOne({
         lenderUserId: Meteor.userId(), 
         ilendbooksId: ilendbooksId,
         statusBorrow: ilendbooks.public.status.BORROWER_LENT_RECEIVED,
         statusLend: ilendbooks.public.status.BORROWER_LENT_RECEIVED
      })

      if(contactParameters1 == null) {
          contactParameters = contactParameters2.contactParameters;
      }else {
         contactParameters = contactParameters1.contactParameters;
      }
      Meteor.call('updateWithBorrower', appUUID, contactParameters);
      Modal.hide('ilendActionModal');
   },

   'click .borrowed': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      var ilendbooksId = Session.get('ilendbooksId');
      var contactParameters;  

      var contactParameters1 = PendingTransactions.findOne({
         borrowerUserId: Meteor.userId(), 
         ilendbooksId: ilendbooksId,
         statusBorrow: ilendbooks.public.status.LENDER_LENT_DECLARED,
         statusLend: ilendbooks.public.status.LENDER_LENT_DECLARED
      })

      var contactParameters2 = PendingTransactions.findOne({
         borrowerUserId: Meteor.userId(), 
         ilendbooksId: ilendbooksId,
         statusBorrow: ilendbooks.public.status.BORROWER_LENT_RECEIVED,
         statusLend: ilendbooks.public.status.BORROWER_LENT_RECEIVED
      })

      if(contactParameters1 == null) {
          contactParameters = contactParameters2.contactParameters;
      }else {
         contactParameters = contactParameters1.contactParameters;
      }


      Meteor.call('updateBorrowed', appUUID, contactParameters);
      Modal.hide('ilendActionModal');
   },

   'click .lender-return-received': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      var ilendbooksId = Session.get('ilendbooksId');
    //  borrowerUserId = PendingTransactions.findOne({lenderUserId: Meteor.userId(), ilendbooksId: ilendbooksId}).contactParameters.borrowerUserId;

      var contactParameters = PendingTransactions.findOne({
         lenderUserId: Meteor.userId(), 
         ilendbooksId: ilendbooksId,
         statusBorrow: ilendbooks.public.status.BORROWED,
         statusLend: ilendbooks.public.status.WITH_BORROWER
      }).contactParameters;
      Meteor.call('updateLenderReturnReceived', appUUID, contactParameters);
      Modal.hide('ilendActionModal');
   },

   'click .borrower-return-declared': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      var ilendbooksId = Session.get('ilendbooksId');
      var contactParameters = PendingTransactions.findOne({
         borrowerUserId: Meteor.userId(), 
         ilendbooksId: ilendbooksId,
         statusBorrow: ilendbooks.public.status.BORROWED,
         statusLend: ilendbooks.public.status.WITH_BORROWER
      }).contactParameters;
      Meteor.call('updateBorrowerReturnDeclared', appUUID, contactParameters);  
      Modal.hide('ilendActionModal');    
   },

   'click .transaction-complete': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      var ilendbooksId = Session.get('ilendbooksId');
      var contactParameters = PendingTransactions.findOne({
         borrowerUserId: Meteor.userId(), 
         ilendbooksId: ilendbooksId,
         statusBorrow: ilendbooks.public.status.LENDER_RETURN_RECEIVED,
         statusLend: ilendbooks.public.status.LENDER_RETURN_RECEIVED
      }).contactParameters; 
      Meteor.call('updateTransactionComplete', appUUID, contactParameters);  
    //  Meteor.call('updateAvailable', appUUID, contactParameters);
      Modal.hide('ilendActionModal');
   },

   'click .transaction-complete-lender': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      var ilendbooksId = Session.get('ilendbooksId');
      var contactParameters = PendingTransactions.findOne({
         lenderUserId: Meteor.userId(), 
         ilendbooksId: ilendbooksId,
         statusBorrow: ilendbooks.public.status.BORROWER_RETURN_DECLARED,
         statusLend: ilendbooks.public.status.BORROWER_RETURN_DECLARED
      }).contactParameters;
     // Meteor.call('updateAvailable', appUUID, contactParameters);
      Meteor.call('updateTransactionCompleteLender', appUUID, contactParameters);
      Modal.hide('ilendActionModal');
   }
})
