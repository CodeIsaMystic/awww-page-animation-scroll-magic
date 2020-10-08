$(document).ready(function(){


	// Init ScrollMagic Controller
	const controller = new ScrollMagic.Controller();

	// Scene 1 - pin our main section
	const pinScene01 = new ScrollMagic.Scene({
		triggerElement: '#main',
		triggerHook: 0,
		duration: '900%'
	})
	.setPin("#main .pin-wrapper", {pushFollowers: true})
	.addTo(controller);

});
