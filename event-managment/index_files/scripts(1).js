var easing = 'cubic-bezier(0.7,0,0.3,1)';

/**
 * Function to prevent scrolling
 */
function noscroll(e){
  window.scrollTo(0,0);
}

// Prevent Scrolling on page initialization
jQuery(window).on('scroll', noscroll);

jQuery.Velocity.RegisterEffect('stroke-subtext',{
  defaultDuration: 1000,
  calls: [
    [{'stroke-dashoffset':'176px'}, 1]
  ]
});

// if the browser does not support transitions we use veloity to animate
if(!Modernizr.csstransitions){
  // loader spinner
  jQuery('.ion-spin').velocity({rotateZ:'360deg'},{duration: 500, loop:true, easing: 'linear'});

  // opening menu effects
  jQuery('#open-menu').on('change',function(){
    if(this.checked){
      jQuery('.primary-nav').css({'visibility':'visible'}).velocity({opacity:1},{duration:500});
      jQuery('header svg .trail').velocity({'stroke-dashoffset':'-300','stroke-dasharray':300,stroke:'#fff'},{duration:1000,easing: easing});
      jQuery('#TopLine, #BottomLine').velocity({'stroke-opacity':0},{duration:1000,easing: easing});
    } else {
      jQuery('.primary-nav').velocity('reverse',{duration:500},function(){
        jQuery(this).css({'visibility':'hidden'});
      });
      jQuery('header svg .trail').velocity('reverse',{duration:1000,easing:'linear'});
      jQuery('#TopLine, #BottomLine').velocity('reverse',{duration:1000,easing:'linear'});
    }
  });
}

// hide the menu on navigation
jQuery('.primary-nav a').on('click',function(){
  // change the state of the checkbox to false to hide the menu

  var t = jQuery(this).attr('href');

  jQuery(t).velocity('scroll',{duration: 400,easing:easing});

  jQuery('#open-menu').prop('checked',false);
});


// When all elements are loaded fire all the animations
jQuery(window).on('load',function(){

  var duration = 1000;

  var seq = [
    {e:jQuery('#wrapper'), p: {'top':'0'}, o: {duration: 1000, easing: easing}},
    //{e:jQuery('#loader'), p: {'opacity': 0}, o: {duration: 1000, easing: easing, sequenceQueue: false}},
    {e:jQuery('header'), p: {'top':'0'}, o: {duration: 1000, easing: easing, complete: function(){
      // once complete remove the loader to improve performance
      jQuery('#loader').remove();
    }}},
    {e:jQuery('#border'), p: {'stroke-dashoffset':'-1100px','stroke-opacity':1}, o: {duration: 1000, easing: easing}},
    {e:jQuery('#maintext path'), p: {'stroke-dasharray':'40px','stroke-opacity':1}, o: {duration: 1000, easing: easing, sequenceQueue: false}},
    {e:jQuery('#maintext path'), p: {'fill-opacity':1,'stroke-opacity':0}, o: {duration: 1000, easing: easing}},
    {e:jQuery('.SVG-subtitle path'), p: 'stroke-subtext', o: {duration: 1000, easing: easing, stagger: 100}}
  ];

  jQuery.Velocity.RunSequence(seq);

  // Allow scrolling
  jQuery(window).off('scroll', noscroll);

});

// Load remaining scripts
jQuery(document).ready(function($) {

  // Scroll magic Controller
  var controller = new ScrollMagic.Controller({globalSceneOptions:{triggerHook:.7}});

  new ScrollMagic.Scene({
    triggerElement: '#projects'
  }).on('enter',function(){
    jQuery('#projects').addClass('show');
  })
//  .addIndicators()
  .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '#about'
  })
  .on('enter', function(){
    jQuery('#about').addClass('show');
  })
//  .addIndicators()
  .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '#contact'
  })
  .on('enter', function(){
    jQuery('#contact').addClass('show');
  })
//  .addIndicators()
  .addTo(controller);


//  $(document).on('cfSubmit',function(){
//    jQuery('.contact-form').addClass('submitting');
//  });
//
//  $(document).on('cfOK', function(){
//    jQuery('.contact-form').addClass('submitting');
//    setTimeout(function(){
//      jQuery('.contact-form').addClass('OK');
//    },1000);
//  });

}); /* end of as page load scripts */
