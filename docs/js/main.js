$(document).ready(function(){

	/**
	 *  VARIABLES
	 * 
  **/ 
	const $navItem = $('.nav-items li').not('.active'),
				$$navTrigger = $('.nav-trigger'),
				getTriggersDown = $('.slide-pos'),
				triggersDown = [],
				getTriggersUp = $('.slide-pos'),
				triggersUp = [],
				$slideIn = $('.slide.active'),
				$logo = $('.logo'),
				$main = $('#main'),
				$body = $('body'),
				$slide = $('.slide'),
				$nav = $('nav');
	
	/**
	 *  TRIGGERS on WAY DOWN
	 */
	$.each(getTriggersDown, function(key, value) {
		let id = '#'+value.id;
		triggersDown.push(id);
		//console.log(triggersDown[key]);
	});


	/**To Have an idea 
	* 
	const triggersDown = 
		[
			"#slide02-pos",
			"#slide03-pos",
			"#slide04-pos",
			"#slide05-pos",
			"#slide06-pos",
			"#slide07-pos",
			"#slide08-pos",
			"#slide09-pos"
		] 	 
  **/

   /**
	 *  TRIGGERS on WAY UP	 */
	$.each(getTriggersUp, function(key, value) {
		let id = '#'+value.id;
		triggersUp.push(id);
		//console.log(triggersUp[key]);
	});




	/**  INIT SCROLL MAGIC CONTROLLER   **/
   
	const controller = new ScrollMagic.Controller();



	/**
	 * SCENE 1 - PI?N OUR MAIN SECTION 
  **/ 
	const pinScene01 = new ScrollMagic.Scene({
		triggerElement: '#main',
		triggerHook: 0,
		duration: '900%'
	})
	.setPin("#main .pin-wrapper", {pushFollowers: false})
	.addTo(controller);



	/**
	 *  NAVIGATION TIMELINE 
	 **/
	const navTl = new TimelineMax();

	/**  Move Navigation Right by 26px for each item  **/
	$navItem.each(function() {

		let slideHREF = $(this).find('a').attr('href'),
			  slideID = slideHREF.substr(slideHREF.length -7),
				moveNav = TweenMax.to($('.nav-active'), 1, {x: '+=26', ease:Linear.easeNone});

		//console.log(slideID);
		//console.log(moveNav);
				
		/**  Add Individual Tweens to the Timeline  **/
		navTl.add(moveNav, slideID);
	});







	/**
	 * SCENE 2 - MOVE NAVIGATION 
	 **/ 
	const navScene = new ScrollMagic.Scene({
		triggerElement: $$navTrigger,
		duration: '800%'
	})
  .setTween(navTl)
	.addTo(controller);




	/**
	 *  SCENE 3 - TRIGGER THE RIGHT ANIMATION ON THE WAY DOWN
	 */
	triggersDown.forEach(function(triggerDown, index) {

		const triggerTransitionToNext = new ScrollMagic.Scene({
			triggerElement: triggerDown,
			triggerHook: 0.6
		})
		.on('enter', function(e) {

		//	console.log('crossfade to next '+triggerDown);
			const $slideOut = $('.slide.active'),
			slideIndex = triggerDown.substring(6,8),
			$slideIn = $('#slide'+slideIndex),
			direction = e.scrollDirection;

			//console.log(e.scrollDirection);
			crossFade($slideOut, $slideIn, direction);
		})
		/*  helper, building the code 
		.addIndicators({
			name: 'triggerDown',
			indent: 520,
			colorStart: 'black',
			colorTrigger: 'black'
		}) */
		.addTo(controller);

	});



	/**
	 *  SCENE 4 - TRIGGER THE RIGHT ANIMATION ON THE WAY UP
	 * 
	 */
	triggersUp.forEach(function(triggerUp, index) {

		const triggerTransitionToPrev = new ScrollMagic.Scene({
			triggerElement: triggerUp,
			triggerHook: 0.49
		})
		.on('leave', function(e) {

			//console.log('crossfade to prev '+triggerUp);
		})
		/*  helper, building the code   
		.addIndicators({
			name: 'triggerUp',
			indent: 110,
			colorStart: 'red',
			colorTrigger: 'red'
		})  */
		.addTo(controller);

	});

	/**  INIT FUNCTION
	 */
	function init() {
		setTimeout(function() {

			/*  prevents body from flickering  */
			TweenMax.set($body, {autoAlpha: 1});

			/*  animate first slide in  */
			animationIn($slideIn);
		}, 500);
	}

	init();

	/**  CROSS FADE FUNCTION   
	 **/
	 
	function crossFade($slideOut, $slideIn, direction) {



	}

	/**
	 *  ANIMATE SLIDE IN 
	 */
	function animationIn($slideIn) {

		const $slideInNumber = $slideIn.find('.number'),
					$slideInTitle = $slideIn.find('.fade-txt'),
					$primaryBcg = $slideIn.find('.primary .bcg'),
					$whiteBcg = $slideIn.find('.bcg-white'),
					transitionInTl = new TimelineMax();

		transitionInTl
			.set([$slide, $slideInNumber, $nav, $logo], {autoAlpha: 0})
			.set($slideIn, {autoAlpha: 1})
			.set($whiteBcg, {scaleX: 1})
			.set($primaryBcg, {scaleX: 0})
			.to($whiteBcg, 0.4, {scaleX: 0.63, ease:Power2.easeIn})
			.to($primaryBcg, 0.4, {scaleX: 1, ease:Power2.easeOut, clearProps: 'all'})
			.add('fadeInLogo')
			.to($whiteBcg, 0.6, {scaleX: 0, ease:Power4.easeIn}, 'fadeInLogo+=0.3')
			.to([$logo, $slideInNumber], 0.2, {autoAlpha: 1, ease:Linear.easeNone}, 'fadeInLogo+=0.9')
			.staggerFrom($slideInTitle, 0.3, {autoAlpha: 0, x: '-=60', ease:Power1.easeOut}, 0.1, 'fadeInLogo+=0.9')
			.fromTo($nav, 0.3, {y: -15, autoAlpha: 0},
												 {autoAlpha: 1, y: 0, ease:Power1.easeOut}, 'fadeInLogo+=1.5');
	}

});
