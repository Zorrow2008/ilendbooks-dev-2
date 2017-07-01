Template.clickedLendModal.events({
   'submit form': function(event) {
      event.preventDefault();
      var condition = event.target.bookCondition.value;
      var description = event.target.bookDescription.value;
      var ilendbooksId = Session.get('condition-lendBook-ilendbooksId');
      var title = Session.get('condition-lendBook-title');
      var currentlenderBookInfo = {
         title: title,
         ilendbooksId: ilendbooksId,
         condition: condition,
         description: description
      }
      var appUUID = Session.get('appUUID');
      Meteor.call('updateToLend', appUUID, currentlenderBookInfo);
      Modal.hide('clickedLendModal');
      Router.go("myShelf");
   }
})

Template.clickedLendModal.helpers({

  getTitle: function () {
    return Session.get('condition-lendBook-title');
  },

  getIlendbooksId: function (){
    return Session.get('condition-lendBook-ilendbooksId');
  },

  getBookConditionOptions(){
    return ilendbooks.public.bookCondition;

  }
})