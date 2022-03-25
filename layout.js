
$(document).ready(function() {
  $("#background").css("position", "absolute").css("z-index", "1")
    .css("width", "100%").css("height", "100%");

  $("#foreground").css("position", "absolute").css("z-index", "2")
    .css("width", "100%").css("height", "100%");

  $("#stats").css("position", "absolute").css("z-index", "3")
    .css("width", "100%").css("height", "3rem");

  $("<style type='text/css'>.button { margin: 0.5rem; padding: 0.5rem; background: rgba(0, 0, 0, 0.75); border: white 3px solid; border-radius: 1rem; cursor: pointer; text-align: center; }</style>").appendTo("head");
  $("#buttons").css("position", "absolute").css("z-index", "4")
    .css("top", "3rem").css("left", "90%").css("width", "10%").css("height", "90%")
    .css("display", "flex").css("flex-direction", "column").css("justify-content", "flex-end")
    .css("color", "white").css("font-size", "200%").css("user-select", "none");

  $("<style type='text/css'>.menu-title { margin: 0.5rem; padding: 0.5rem; font-family: Papyrus; font-size: 120%; font-weight: bold; }</style>").appendTo("head");
  $("<style type='text/css'>.menu-button { margin: 0.5rem; padding: 0.5rem; background-image: linear-gradient(173deg, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5)); cursor: pointer; }</style>").appendTo("head");
  $("#menu").css("position", "absolute").css("z-index", "5")
    .css("top", "20%").css("left", "30%").css("width", "30%").css("height", "60%")
    .css("display", "flex").css("flex-direction", "column")
    .css("color", "white").css("font-size", "150%").css("user-select", "none")
    .hide();

  $("<style type='text/css'>.message { margin: 0.5rem; padding: 0.5rem; background: rgba(0, 0, 0, 0.5); border-radius: 0.5rem; }</style>").appendTo("head");
  $("#chat").css("position", "absolute").css("z-index", "5")
    .css("top", "3rem").css("left", "30%").css("width", "50%").css("height", "80%")
    .css("display", "flex").css("flex-direction", "column").css("justify-content", "flex-end")
    .css("color", "white").css("font-size", "150%")
    .hide();
});
