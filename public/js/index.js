$(document).ready(function() {
  $(document).on("click", 'a[href^="#"]', function(e) {
    // target element id
    var id = $(this).attr("href");

    // target element
    var $id = $(id);
    if ($id.length === 0) {
      return;
    }

    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();

    // top position relative to the document
    var pos = $id.offset().top;

    // animated top scrolling
    $("body, html").animate({ scrollTop: pos });
  });

  $(".submit-btn").on("click", function(e) {
    // prevent redirect
  });
});

window.onload = function() {
  $(".splash-img").addClass("fadeIn");
  setTimeout(function() {
    $(".rsvp-btn").addClass("cool-color-effect");
  }, 1000);
};
