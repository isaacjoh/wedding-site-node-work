$(document).ready(function() {
  var weddingCountdown = countdown( new Date(2018, 5, 30) );
  $("#countdown-months span").text(weddingCountdown.months.toString());
  $("#countdown-days span").text(weddingCountdown.days.toString());
});

window.onload = function() {
  var input = $(".password").focus();
};
