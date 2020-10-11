$(document).ready(function () {
  /**
   *  VARIABLES
   *
   **/
  const $navItem = $('.nav-items li').not('.active'),
    $navTrigger = $('.nav-trigger'),
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
   * SCENE 1 - PIN OUR MAIN SECTION
   **/
  const pinScene01 = new ScrollMagic.Scene({
    triggerElement: '#main',
    triggerHook: 0,
    duration: '900%',
  })
    .setPin('#main .pin-wrapper', {pushFollowers: false})
    .addTo(controller);

  /** INIT NAVIGATION TIMELINE 	 **/
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
    triggerElement: $navTrigger,
    duration: '800%'
  })
    .setTween(navTl)
    .addTo(controller);

  /**
   *  SCENE 3 - TRIGGER THE RIGHT ANIMATION ON THE WAY DOWN
   */
  triggersDown.forEach(function (triggerDown, index) {
    const triggerTransitionToNext = new ScrollMagic.Scene({
      triggerElement: triggerDown,
      triggerHook: 0.6,
    })
      .on('enter', function(e) {
        //	console.log('crossfade to next '+triggerDown);
        const $slideOut = $('.slide.active'),
          slideIndex = triggerDown.substring(6,8),
          $slideIn = $('#slide'+slideIndex),
          direction = e.scrollDirection;

        //console.log(e.scrollDirection);
        crossFade($slideOut, $slideIn, direction, slideIndex);
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
      triggerHook: 0.49,
    })
      .on('leave', function (e) {
        //console.log('crossfade to prev '+triggerUp);
      const $slideOut = $('.slide.active'),
        slideIndex = triggerUp.substring(6,8),
        $slideIn = $('#slide'+slideIndex),
        direction = e.scrollDirection;

      //console.log(e.scrollDirection);
      crossFade($slideOut, $slideIn, direction, slideIndex);

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
    setTimeout(function () {
      /*  prevents body from flickering  */
      TweenMax.set($body, { autoAlpha: 1 });

      /*  animate first slide in  */
      animationIn($slideIn);
    }, 500);
  }

  init();

  /**  CROSS FADE FUNCTION
   **/

  function crossFade($slideOut, $slideIn, direction, slideIndex) {
    var slideOutID = $slideOut.attr('id').substring(5,7),
      slideInID = $slideIn.attr('id').substring(5,7),
      /*  SIDEOUT  */
      $slideOutBcg = $slideOut.find('.bcg-color'),
      $slideOutTitle = $slideOut.find('.title .fade-txt'),
      $slideOutNumber = $slideOut.find('.number'),
      /*  SLIDEIN  */
      $slideInBcg = $slideIn.find('.bcg-color'),
      $slideInTitle = $slideIn.find('.title .fade-txt'),
      $slideInNumber = $slideIn.find('.number'),
      $slideInBcgWhite = $slideIn.find('.primary .bcg'),
      slideInValue = $slideInNumber.attr('data-value');

    /*  UPDATE NAV   */
    updateNav(slideOutID, slideInID);

    /*  REMOVE CLASS ACTIVE FROM ALL SLIDES  */
    TweenMax.set($slide, { className: '-=active' });

    /*  ADD CLASS ACTIVE TO CURRENT SLIDE  */
    TweenMax.set($('#slide'+slideIndex), { className:'+=active' });

    /**
		 * 	FINALLY SET THE CROSS FADE TIMELINE !!
		 **/
		
		const crossFadeTl = new TimelineMax();

		crossFadeTl
			.set($slideIn, {autoAlpha: 1})
			.set([$slideInTitle, $slideInNumber, $slideInBcgWhite], {autoAlpha: 0})
			.to([$slideOutTitle, $slideOutNumber], 0.3, {autoAlpha:0, ease:Linear.easeNone})
			.set($main, {className: 'slide'+slideInID+'-active'})
			.set($slideInNumber, {text:'0'}) // this needs GSAP TextPlugin
      .add('countingUp')
      .to($slideInBcgWhite, 0.3, {autoAlpha: 1, ease:Linear.easeNone}, 'countingUp-=0.4')
      .staggerFromTo($slideInTitle, 0.3, 
          {autoAlpha: 0, x: '-=20'}, 
          {autoAlpha: 1, x: 0, ease:Power1.easeOut}, 0.1, 'countingUp+=1'
      );


    crossFadeTl.timeScale(0.5);

    /**  COUNT UP OR SCRAMBLE TEXT   **/
		if(slideInID == 09){

			/*  SCRAMBLE TEXT  TIMELINE  */
			var scrambleTextTl = new TimelineMax();
			scrambleTextTl.to($slideInNumber, {duration:1.4, scrambleText:{text: 'Share'}});

      crossFadeTl.add(scrambleTextTl, 'countingUp');
      
    } else {
      
      /**  COUNT UP   **/
      const countUpText = new TimelineMax({paused: true});
      
      /* FADE NUMBER IN */
      countUpText.to($slideInNumber, 1.7, {autoAlpha: 1, ease:Linear.easeNone, onUpdate: updateValue, onUpdateParams: ['{self}', slideInValue, $slideInNumber]});

      /**  COUNT UP TIMELINE  **/
      const countUpTl = new TimelineMax();

      countUpTl.to(countUpText, 1, {progress: 1, ease:Power3.easeOut});

      crossFadeTl.add(countUpTl, 'countingUp');
    }



    /**  COLORED BACKGROUND TWEEN UP/DOWN    */
    if(direction == 'FORWARD') {
      let tweenBcg = TweenMax
        .fromTo($slideInBcg, 0.7, 
          {autoAlpha: 0}, 
          {autoAlpha: 1, ease:Linear.easeNone, onComplete: hideOldSlide, onCompleteParams: [$slideOut]});

        crossFadeTl.add(tweenBcg, 'countingUp-=0.3');
    } else {
      let tweenBcg = TweenMax
        .to( $slideOutBcg, 0.7, { autoAlpha: 0, ease:Linear.easeNone, onComplete: hideOldSlide, onCompleteParams: [$slideOut]});

        crossFadeTl.add(tweenBcg, 'countingUp-=0.3');
    }
  }




  /**  HIDE OLD SLIDE FUNCTION
   * 
   */
  function hideOldSlide($slideOut) {
    TweenMax.set($slideOut, {autoAlpha: 0});
  }

  /** UPDATE VALUE FUNCTION
   *
  **/
 function updateValue(tl, slideInValue, $slideInNumber) {

  let newValue = parseInt(tl.progress() * slideInValue);

  /* DO NOT INCLUDE % FOR THE FIRST SLIDE  */
  if(slideInValue == 100) {
    $slideInNumber.text(newValue); 
  } else {
    $slideInNumber.text(newValue+'%'); // inadapted for the first and last slides
  }


 }

  /**  UPDATE NAV FUNCTION
   *
   **/
  function updateNav(slideOutID, slideInID) {
    /*  remove active class from all dots   */
    $('.nav-items li').removeClass('active');

    /*  add active class ti the new active slide   */
    TweenMax.set($('.nav-items li.nav-item'+slideInID), {className: '+=active'});
  }

  /**
   *  ANIMATE SLIDE IN
   */
  function animationIn($slideIn) {

    /** SVG LOGO ANIMATION  USING DRAWSVG PLUGIN  **/
    const introAnimationTl = new TimelineMax(),
          $layer = $('.layer'),
          $svgBase = $('#base'),
          $svgPath = $('#base path'),
          $awwwLogo = $('.awww-logo');

    introAnimationTl
      .from($svgPath, 1.2, {drawSVG: '0%', ease:Power2.easeInOut})
      .from($awwwLogo, 0.3, {autoAlpha: 0}, '-=0.3')
      .from([$svgBase, $awwwLogo], 1.2, {y: -115, ease:Power4.easeInOut}, "+=0.2")
      .add('fade')
      .staggerFrom($layer, 2, {autoAlpha: 0, y: -10, ease:Power4.easeInOut}, 0.2, 'fade-=1.5');

    const $slideInNumber = $slideIn.find('.number'),
      $slideInTitle = $slideIn.find('.fade-txt'),
      $primaryBcg = $slideIn.find('.primary .bcg'),
      $whiteBcg = $slideIn.find('.bcg-white'),
      transitionInTl = new TimelineMax();

		transitionInTl
			.set([$slide, $slideInNumber, $nav, $logo], {autoAlpha: 0})
			.set($slideIn, {autoAlpha: 1 })
			.set($whiteBcg, {scaleX: 1 })
			.set($primaryBcg, {scaleX: 0})
			.to($whiteBcg, 0.4, {scaleX: 0.63, ease:Power2.easeIn})
			.to($primaryBcg, 0.4, {scaleX: 1, ease:Power2.easeOut, clearProps:'all'})
      .add('fadeInLogo')
      .to($whiteBcg, 0.6, {scaleX: 0, ease:Power4.easeIn}, 'fadeInLogo+=0.3')
			.to([$logo, $slideInNumber], 0.2, {autoAlpha: 1, ease:Linear.easeNone}, 'fadeInLogo-=0.2')
			.staggerFrom($slideInTitle, 0.3, {autoAlpha: 0, x: '-=60', ease:Power1.easeOut }, 0.1, 'fadeInLogo+=0.9')
      .add(introAnimationTl, 'fadeInLogo+=1')
      .fromTo($nav, 0.3, {y: -15, autoAlpha: 0}, 
				                 { autoAlpha: 1, y: 0, ease:Power1.easeOut }, 'fadeInLogo+=3.5');

    //transitionInTl.timeScale(3);
  }
});
