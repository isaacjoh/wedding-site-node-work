$(document).ready(function () {
  $(document).on("click", "a[href^='#']", function (e) {
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
    $("body, html").animate({
      scrollTop: pos
    });
  });

  // Remove loading class from body
  $("body").removeClass("loading");

  setTimeout(function () {
    $(".splash-img").addClass("fadeIn");
  }, 1500);

  setTimeout(function () {
    $(".rsvp-btn").addClass("cool-color-effect");
  }, 2500);

  $(".korean").click(function () {
    $(".korean-text").removeClass("hide-me");
    $(".english-text").addClass("hide-me");
  });

  $(".english").click(function () {
    $(".english-text").removeClass("hide-me");
    $(".korean-text").addClass("hide-me");
  });
});