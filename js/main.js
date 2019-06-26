// import people from './people.js';

$(document).ready(function() {
  $("#mobile-nav-button").click(function(e){
    $("#nav, .hamburger, .logo").toggleClass("active")
  })

  sliderIndex = 0
  sliderInterval = null
  $(".slider-nav-button.left").click(()=>{
    MoveSliderLeft()
  })
  $(".slider-nav-button.right").click(()=>{
    MoveSliderRight()
  })

  InitAutoSlider()

  let mobileBreakpoint
  mobileBreakpoint = ResizeAbout()
  $(window).resize(()=>{mobileBreakpoint = ResizeAbout()})
  $(".executive").click(function(){SwapExecutiveIn($(this), mobileBreakpoint)})

  $(window).scroll(()=>HideFindButtonOnPageBottom())

  $("#find-agent-button").click(()=>OpenFindAgentModule())
  $("#find-agent-close-button").click(()=>CloseFindAgentModule())

  $("#find-agent-container").click((e)=>e.stopPropagation())

  ApplySearchString('')
  $("#find-agent-searchbar-container .searchbar-input").on('input',(e)=>ApplySearchString(e.target.value))

  let date = new Date
  $("#footer-year").html(date.getFullYear())

  'use strict';
  // Page is loaded
  const objects = document.getElementsByClassName('async-image');
  Array.from(objects).map((item) => {
    // Start loading image
    const img = new Image();
    img.src = item.dataset.src;
    // Once image is loaded replace the src of the HTML element
    img.onload = () => {
      item.classList.remove('async-image');
      return item.nodeName === 'IMG' ?
        item.src = item.dataset.src :
        item.style.backgroundImage = `url(${item.dataset.src})`;
    };
  });
})
