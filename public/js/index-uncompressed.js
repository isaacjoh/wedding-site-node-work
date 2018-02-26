$(document).ready(function () {
  $(document).on("click", 'a[href^="#"]', function (e) {
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

  $("a.proposal-imgs").fancybox({
    'hideOnContentClick': true,
    'transitionIn': 'elastic',
    'transitionOut': 'elastic',
    'speedIn': 600,
    'speedOut': 200,
    'overlayShow': false
  });

  $(".submit-btn").on("click", function (e) {
    // prevent redirect
  });

  // Remove loading class from body
  $("body").removeClass("loading");

  setTimeout(function () {
    $(".splash-img").addClass("fadeIn");
  }, 1500);

  setTimeout(function () {
    $(".rsvp-btn").addClass("cool-color-effect");
  }, 2500);
});
