$(function () {

  // COLOR MODE
  $('.color-mode').click(function(){
    $('.color-mode-icon').toggleClass('active')
    $('body').toggleClass('dark-mode')
    if($('body').hasClass( "dark-mode" )){
      console.log("the black mode");
      $('.navbar').css("background-color", "black");
    }
    else{
      $('.navbar').css("background-color", "white");
    }
  })

  $(".formSubmit").click((e)=>{
    e.preventDefault();
    var data=$('form').serializeArray();
    var emailValid=false
    // console.log("the data",data);

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (data[1].value.match(validRegex)) {
    console.log("the email is valid");
    // alert("Valid email address!");

    $(".emailInput").focus();

    emailValid=true;

  } else {

    // alert("Invalid email address!");

    // $(".emailInput").focus();

    emailValid=false

  }
if(emailValid){
  $.ajax({
    url: '/submitDetails',
    type:'POST',
    data:
    {
      name:data[0].value,
      email:data[1].value,
      phone:data[2].value,
      message:data[3].value,
    },
    success: function(msg)
    {
        alert('Your request has been received!');
        $('.theForm')[0].reset();
    }               
});
}
    
  })
  
  $(document).scroll(function () {
      var $nav = $(".navbar");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });

  
  var update = function() {
    console.log("data:",JSON.stringify($('form').serializeArray()),JSON.stringify($('form').serialize()),$('form'));
  };
  update();
  $('form').change(update);
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

// function ValidateEmail(input) {

//   var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//   if (input.value.match(validRegex)) {

//     alert("Valid email address!");

//     document.form1.text1.focus();

//     return true;

//   } else {

//     alert("Invalid email address!");

//     document.form1.text1.focus();

//     return false;

//   }

// }

function syncScroll(el1, el2) {
	el1.scrollLeft = el2.scrollLeft;
}

var scrollStickyTable = document.querySelector('.table-sticky'),
	scrollStickyTableHeader = document.querySelector(".table-sticky-header");

scrollStickyTable.addEventListener('scroll', function(e) {
	syncScroll(scrollStickyTableHeader, scrollStickyTable);
});

scrollStickyTableHeader.addEventListener('scroll', function(e) {
	syncScroll(scrollStickyTable, scrollStickyTableHeader);
});