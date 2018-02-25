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
  var waypointWeddingDetails = new Waypoint({
    element: document.getElementById("wedding-details"),
    handler: function(direction) {
      $(".map-btn").addClass("cool-color-effect");
    },
    offset: 100
  });

  var isMobile;
  checkMobile();

  function checkMobile() {
    if ($(window).width() < 841) {
      isMobile = true;
    } else {
      isMobile = false;
    }

    if (isMobile) {
      $(".fs-continue").html("");
    } else {
      $(".fs-continue").html("Continue");
    }
  }

  $(window).resize(function() {
    checkMobile();
  });
};
