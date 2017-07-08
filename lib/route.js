Router.configure({
   layoutTemplate: 'layoutSideBar',
   waitOn: function() {return [
      Meteor.subscribe('pendingTransactions'),
      Meteor.subscribe('userProfile'),
      ]}
});
/**************************/
/* no login verification */
/**************************/

Router.route('/signup',{
   name:'signup',
   template: 'signup',
   layoutTemplate: 'layout',
   waitOn: function() {return [
      Meteor.subscribe('allowedAccounts')
      ]}
});

Router.route('/login',{
   name:"login",
   template:'login',
   layoutTemplate: 'layout'
});

Router.route('/verificationEmailSent', {
   name:'verificationEmailSent',
   template: 'verificationEmailSent',
   layoutTemplate: 'layout'
});

Router.route('/verificationEmailFailed', {
   name:'verificationEmailFailed',
   template: 'verificationEmailFailed',
   layoutTemplate: 'layout'
});

Router.route('/forgotPassword',{
   name: "forgotPassword",
   template: 'forgotPassword',
   layoutTemplate: 'layout'
});

Router.route('/accountNotVerified',{
   name: 'accountNotVerified',
   template: 'accountNotVerified'
});

Router.route('/notLoggedIn',{
   name: 'notLoggedIn',
   template: 'notLoggedIn'
});

Router.route('/aboutUs',{
   name: 'aboutUs',
   template: 'aboutUs',
   layoutTemplate: 'layout'
});


Router.route('/logout',{
   name:"logout",
   template:'logout',
   action: function () {
      console.log("logout clicked...")
      Meteor.logout(function(error){
         Router.go("home")
         // if(error) {
         //    console("error logging out...")
         // }else{
           
         // }
      });
      
   }
});

Router.route('/',{
   name: 'home',
   template: 'home',
   layoutTemplate: 'layoutHome',
   action(){

   if (Meteor.userId() ) {
      Router.go("userHome")
   } else { 
      //user is not logged in
      this.render('home');
   }

   }
});

/*************************************************/
/* need login verifciation call onBeforeAction() */
/*************************************************/

Router.route('/userSearch',{
   name: "userSearch",
   template: 'userSearch'
});

Router.route('/myShelf',{
   name: "myShelf",
   template: 'myShelf',
   waitOn: function() {return [
      Meteor.subscribe('myShelf', Meteor.userId()),
      Meteor.subscribe('books'),
      Meteor.subscribe('iLendMetaData'),
      Meteor.subscribe('pendingTransactions'),
      Meteor.subscribe('userProfile'),
   ]}
});

Router.route('/myBorrows', {
   name: "myBorrows",
   template: 'myBorrows',
   waitOn: function() {return [
      Meteor.subscribe('myBorrows', Meteor.userId()),
      Meteor.subscribe('books'),
      Meteor.subscribe('iLendMetaData'),
      Meteor.subscribe('pendingTransactions'),
      Meteor.subscribe('userProfile'),
   ]}
});

Router.route('/myNotifications', {
   name: "myNotifications",
   template: 'myNotifications',
   waitOn: function() {return [
      Meteor.subscribe('pendingTransactions'),
      Meteor.subscribe('userProfile'),
      Meteor.subscribe('books')]}
});

Router.route('/books',{
   name:'books',
   template: 'books'
});

Router.route('/userHome', {
   name:'userHome',
   template: 'userHome',
    waitOn: function() {return [
      Meteor.subscribe('departments'),
      Meteor.subscribe('courses'),
      Meteor.subscribe('textbooks'),
      Meteor.subscribe('quarterTracker')]
   }
});
//changed login.js to go to userHome instead of /

Router.route('/specificBookPage',{
   name:"specificBookPage",
   template:'specificBookPage',
   waitOn: function() {return [
      Meteor.subscribe('books'),
      Meteor.subscribe('toLend'),
      Meteor.subscribe('userProfile'),
      Meteor.subscribe('toBorrow'),
      Meteor.subscribe('reviews', Meteor.userId()),
      Meteor.subscribe('pendingTransactions')]
     
   }
});

Router.route('/user',{
   name: 'user',
   template: 'user',
   layoutTemplate: 'layout'
});


Router.route('/bookSearch',{
   name: 'bookSearch',
   template: 'bookSearch'
});

Router.route('/searchResults',{
   name: 'searchResults',
   template: 'searchResults',
   waitOn: function() {
      return [Meteor.subscribe('searchResults', Session.get('appUUID'), Session.get('keywords')),
              Meteor.subscribe('myBorrows', Meteor.userId()),
              Meteor.subscribe('userProfile'),
              Meteor.subscribe('toLend'),
              Meteor.subscribe('toBorrow')];
   }
});


Router.route('/verify-email/:token', {
   name: 'verify-email',
   action(){
      console.log('this.params.token=' + this.params.token);
      Accounts.verifyEmail(this.params.token, (error) => {
         if(error) {
            //Bert.alert (error.reason, 'danger');
            Router.go('/verificationEmailFailed')
         }
         else {
            Router.go('/user')
            //Bert.alert( 'Email verified! Thanks!', 'success' );
         }
         
      });
   }
});


Router.onBeforeAction(verifiedAndLoggedInUser, {
  //only: ['admin']
  except: ['signup'
   , 'verify-email'
   , 'login'
   , 'verificationEmailSent'
   , 'verificationEmailFailed'
   , 'forgotPassword'
   , 'accountNotVerified'
   , 'notLoggedIn'
   , 'logout'
   , 'home'
   , 'aboutUs'
   , 'userHome'
   , 'searchResults'
   , 'user']
});

function verifiedAndLoggedInUser(){
   console.log('Meteor.userId()=' + Meteor.userId());
   console.log('Meteor.user().emails[ 0 ].verified='+ Meteor.user().emails[ 0 ].verified);
   var userProfile = UserProfile.findOne({userId: Meteor.userId()});
   for(var key in userProfile) {
      console.log("userProfilekey=" + key + "value=" + userProfile[key])
   }
   if (Meteor.userId() && Meteor.user().emails[ 0 ].verified && userProfile) {
      // user email is verified and logged in
      this.next();
   } else if (Meteor.userId() && ! Meteor.user().emails[ 0 ].verified) {
      // user email is *not* verified and logged in
      Router.go('accountNotVerified');
   } else if(userProfile == null && Meteor.user().emails[ 0 ].verified) {
      Router.go('user');
   } else{
      //user is not logged in
      Router.go('login');
   }
}

