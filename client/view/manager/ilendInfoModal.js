Template.ilendInfoModal.helpers({
   	getModalTitle: function() {
      return Session.get(ilendbooks.public.modal.TITLE);
   	},

   	getModalBodyArray: function() {
      return Session.get(ilendbooks.public.modal.BODY_ARRAY);
   	},

})