Template.findCourses.helpers({
	isLender: function() {
		var userDoc = QuarterTracker.findOne({userId: Meteor.userId()});
		if(userDoc == null) {
			console.log("true")
			return true;
		}else if(userDoc.quarterInfo[0].hasBorrowed == false && userDoc.quarterInfo[0].hasLent == false ) {
			return true;
		}else{
			console.log("false")
			return false;
		}
	},

	isBorrower: function() {
		Session.set('userType', ilendbooks.public.userType.BORROWER);
		console.log("isBorrower" + Session.get('userType'));
	},

	isNotFirstTime: function() {
		var userDoc = UserProfile.findOne({userId: Meteor.userId()});
		if(userDoc.isFirstLend ) {
			return ! userDoc.isFirstLend;
		} else {
			return false;
		}
	},

	getUserName: function() {
		return UserProfile.findOne({userId: Meteor.userId()}).fName;
	},

	isFirstTime: function() {
		var user = UserProfile.findOne({userId: Meteor.userId()});
		Session.set('userType', ilendbooks.public.userType.LENDER);
		console.log("isFirstTime" + Session.get('userType'));
		return user.isFirstLend;
	},

	getDepartments: function() {
		console.log("getDepartments called")
		var deps = Departments.find();
		return Departments.find();
	},

	getCourses: function(departmentId) {
		console.log("getCourses:departmentId=" +departmentId);
		return  Courses.find({departmentId: departmentId});
	},

})

Template.findCourses.events({
	'click .findCourses': function() {
		Modal.show('selectCoursesModal');
	},

    'submit form': function() {
	    event.preventDefault();
	    $("#findCoursesGreetings").addClass("display-none");
	    var classes = $('select.selectpicker').val()
	    console.log("did i get here");
	    // for(var key in classes) {
	    //   console.log("key " + key + "value: " + classes[key]);
	    // }
	    Session.set('classes', classes);
	    var quarterInfo = {
	    	userId: Meteor.userId(),
	    	year: ilendbooks.public.quarters.YEAR,
	    	currentQuarter: ilendbooks.public.quarters.SUMMER,
	    	hasBorrowed: false,
	    	hasLent: false,
	    	lendUnavailable: false,
	    	previousQuarterClasses: classes,
	    	currentQuarterClasses: null
	    }
	    var userQTDoc = QuarterTracker.findOne({userId: Meteor.userId()});
	    if(Session.get('userType') == ilendbooks.public.userType.LENDER) {
	    	Meteor.call('insertQuarterInfo', quarterInfo);
	    }else{
	    	Meteor.call('insertCurrentClasses', Session.get('classes'));
	    }

  }
})