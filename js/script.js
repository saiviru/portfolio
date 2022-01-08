$(function () {

  // COLOR MODE
  $('.color-mode').click(function(){
    $('.color-mode-icon').toggleClass('active')
    $('body').toggleClass('dark-mode')
  })
  
  $(document).scroll(function () {
      var $nav = $(".navbar");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
  });
  
  // PROJECT CAROUSEL
  $('.owl-carousel').owlCarousel({
    items: 1,
    loop:true,
    margin:10,
    nav:true
});
if(document.body.className.match('dark-mode')){
  console,log("the color");
  $("p").css("color", "red");
}