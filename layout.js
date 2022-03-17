
$(document).ready(function() {
  $("#background").css("position", "absolute").css("z-index", "1")
    .css("width", "100%").css("height", "100%");

  $("#stats").css("position", "absolute").css("z-index", "2")
    .css("width", "100%").css("height", "3rem");

  $("#buttons").css("position", "absolute").css("z-index", "3")
    .css("top", "3rem").css("left", "90%").css("width", "10%").css("height", "3rem");

  $("<style type='text/css'>.message { margin: 0.5rem; padding: 0.5rem; background: rgba(0, 0, 0, 0.5); border-radius: 0.5rem; }</style>").appendTo("head");
  $("#chat").css("position", "absolute").css("z-index", "4")
    .css("top", "3rem").css("left", "30%").css("width", "50%").css("height", "80%")
    .css("display", "flex").css("flex-direction", "column").css("justify-content", "flex-end")
    .css("color", "white").css("font-size", "150%");
});
