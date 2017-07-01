Template.layoutSideBar.events({
	'click .overlay' : function(event) {

		console.log("hamburger - clicked");
		var trigger = $('.hamburger');
        var overlay = $('.overlay');
        //var isClosed = false;
        console.log(trigger.hasClass('hamburger'));
        console.log(trigger.hasClass('is-closed'));

        if (trigger.hasClass('is-closed')) {          

          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          // isClosed = false;
        } else {   
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          // isClosed = true;
        }
        $('#wrapper').toggleClass('toggled');

	}

});