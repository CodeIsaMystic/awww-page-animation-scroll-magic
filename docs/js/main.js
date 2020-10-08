$(document).ready(function(){

	/**
	 *  Variables
	 * 
  **/ 
	const $navItem = $('.nav-items li').not('.active'),
			  $$navTrigger = $('.nav-trigger');


	/**
	 * Init ScrollMagic Controller
	 *  
  **/ 
	const controller = new ScrollMagic.Controller();

	/**
	 * Scene 1 - pin our main section
	 *  
  **/ 
	const pinScene01 = new ScrollMagic.Scene({
		triggerElement: '#main',
		triggerHook: 0,
		duration: '900%'
	})
	.setPin("#main .pin-wrapper", {pushFollowers: false})
	.addTo(controller);

	/**
	 *  Navigation Timeline
	 *  
	 **/
	const navTl = new TimelineMax();

	/**
	 * Move Navigation Right by 26px for each item
	 * 
	 **/ 
	$navItem.each(function() {

		let slideHREF = $(this).find('a').attr('href'),
			  slideID = slideHREF.substr(slideHREF.length -7),
				moveNav = TweenMax.to($('.nav-active'), 1, {x: '+=26', ease: Linear.easeNone});

		//console.log(slideID);
		//console.log(moveNav);
				
		/**
		 *  Add Individual Tweens to the Timeline
		 *  
		 **/ 
		navTl.add(moveNav, slideID);

	});

	/**
	 * Scene 2 - move navigation 
	 *  
	 **/ 
	const navScene = new ScrollMagic.Scene({
		triggerElement: $$navTrigger,
		duration: '800%'
	})
  .setTween(navTl)
	.addTo(controller);

});
