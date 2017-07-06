Template.findCourses.helpers({
	isLender: function() {
		var userDoc = QuarterTracker.findOne({userId: Meteor.userId()});
		if(userDoc == null) {
			return true;
		}else if(userDoc.quarterInfo.hasBorrowed == false && userDoc.quarterInfo.hasLent == false) {
			return true;
		}else{
			return false;
		}
	},

	isBorrower: function() {
		Session.set('userType', ilendbooks.public.userType.BORROWER);
	},

	getUserName: function() {
		return UserProfile.findOne({userId: Meteor.userId()}).fName;
	},

	isFirstTime: function() {
		var user = UserProfile.findOne({userId: Meteor.userId()});
		Session.set('userType', ilendbooks.public.userType.LENDER);
		return user.isFirstLend;
	},

	getDepartments: function() {
		console.log("getDepartments called")
		var deps = (Departments.findOne().departments);
		return Departments.findOne().departments;
	},

	getCourses: function() {
		var courseDoc = Courses.findOne({department: "AA"});
		console.log("getCourses called");
		return courseDoc.courses;
	},

})

Template.findCourses.events({
	'click .findCourses': function() {
		Modal.show('selectCoursesModal');
	},

    'submit form': function() {
	    event.preventDefault();
	    var classes = $('select.selectpicker').val()
	    console.log("did i get here");
	    for(var key in classes) {
	      console.log("key " + key + "value: " + classes[key]);
	    }
	    Session.set('classes', classes);
	    var quarterInfo = {
	    	year: ilendbooks.public.quarters.YEAR,
	    	currentQuarter: ilendbooks.public.quarters.SUMMER,
	    	hasBorrowed: false,
	    	hasLent: false,
	    	lendUnavailable: false,
	    	previousQuarterClasses: classes,
	    	currentQuarterClasses: null
	    }
	    Meteor.call('updateQuarterTrackerStatus', quarterInfo);

  }
})