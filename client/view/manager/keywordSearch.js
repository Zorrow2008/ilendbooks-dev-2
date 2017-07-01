Template.keywordSearch.events({
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
	},	

// 'click .add': function(event, template) {
//       event.preventDefault();
//         var keywords = event.target.keyword.value;
//         console.log("keywords: " + keywords);
//         var appUUID = Session.get('appUUID');
//         Session.setAuth('keywords', keywords);
//        var searchParameters = {
//           keywords : keywords,
//        }
//        console.log("keywords: " + keywords)
//        Meteor.call( 'itemSearch', appUUID, searchParameters);
//         Session.setAuth('clickedAdd', true);
//       console.log("clicked add");
//        Router.go('searchResults');
  
// }

//   event.preventDefault();
//   var btn = $(event.target).find("input[type=submit]:focus");
//   if (btn) {
//     if (btn[0].className === 'add') {
//        Session.setAuth('clickedAdd', true);
//        console.log("clicked add");
//     } else if (btn[0].className === 'borrow') {
//        Session.setAuth('clickedBorrow', true);
//       console.log("clicked borrow");
//     }
//   } else {
//     console.log('default action');
//   }
// }



      // if (btn) {
      //   if (btn[0].className === 'add') {
      //      Session.setAuth('clickedAdd', true);
      //      console.log("clicked add");
      //   } else if (btn[0].className === 'borrow') {
      //      Session.setAuth('clickedBorrow', true);
      //     console.log("clicked borrow");
      //   }
      // } else {
      //   console.log('default action');
      // }
    })