
$(document).ready(function() {
  $("#background").css("position", "absolute").css("z-index", "1")
    .css("width", "100%").css("height", "100%");

  $("#stats").css("position", "absolute").css("z-index", "2")
    .css("width", "100%").css("height", "3rem");
  
  $("#buttons").css("position", "absolute").css("z-index", "3")
    .css("top", "3rem").css("left", "90%").css("width", "10%").css("height", "3rem");
  
  $("#chat").css("position", "absolute").css("z-index", "4")
    .css("width", "50%").css("height", "100%");
});
