Template.user.events({

    'keyup #phoneNumber': function (event, template) {
        event.currentTarget.value= Phoneformat.formatLocal("US", event.currentTarget.value);
    },


   'submit form': function(event) {
      event.preventDefault();
      // console.log("Form submitted");
      var appUUID = Session.get('appUUID');
      // console.log(event.type);
      // var firstName = event.target.firstName.value;
      // var lastName = event.target.lastName.value;
      // var studentID = event.target.studentID.value;
      //var grade = event.target.grade.value;
      var newPhoneNumber = "";
      var phoneNumber = event.target.phoneNumber.value;
      for(var i = 0;  i < phoneNumber.length; i++) {
         if(!isNaN(parseFloat(phoneNumber.charAt(i))) && isFinite(phoneNumber.charAt(i))){
            newPhoneNumber += phoneNumber.charAt(i);
         }
      }
      // var degreeElement = document.getElementById("degrees");
      // var degree = degreeElement.options[degreeElement.selectedIndex].value;


      // var contactElement = document.getElementById('contacts');
      // var contactPreference = contactElement.options[contactElement.selectedIndex].value;

      
      var userProfile ={
         firstName: event.target.firstName.value,
         lastName: event.target.lastName.value,
         studentID: event.target.studentID.value,
         phoneNumber : newPhoneNumber,
         contactPreference: document.getElementById('contacts').options[document.getElementById('contacts').selectedIndex].value,
         degree: document.getElementById('degrees').options[document.getElementById('degrees').selectedIndex].value,
         bookcoin: ilendbooks.private.bitCoin.ACCOUT_CREATION,
         isFirstLend: true
      };
      Meteor.call("createUserProfile",appUUID, userProfile );
      //Session.set('isFirstTime', "isFirstTime");
      Router.go('home');
   }
})




