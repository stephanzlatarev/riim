
const ROW_SIZE = "7vh";
const LABEL_FONT_SIZE = "3vh";
const TEXT_FONT_SIZE = "2.75vh";
const BLOCK_STYLE = "margin: 1vh 2vh 0 0; padding: 0.25em 0px; background: rgba(0, 0, 0, 0.75); text-align: center;";

$(document).ready(function() {
  $("#background").css("position", "absolute").css("z-index", "1")
    .css("width", "100%").css("height", "100%");

  $("#foreground").css("position", "fixed").css("z-index", "2")
    .css("width", "100vw").css("height", "100vh");

  $("<style type='text/css'>.stat { " + BLOCK_STYLE + " width: 8em; border: white 0.25vh dotted; border-radius: 0.2em; display: flex; justify-content: space-around; }</style>").appendTo("head");
  $("#stats").css("position", "fixed").css("z-index", "3")
    .css("width", "100%").css("height", ROW_SIZE)
    .css("display", "flex").css("flex-direction", "row").css("justify-content", "flex-end")
    .css("color", "white").css("font-family", "Tahoma").css("font-size", LABEL_FONT_SIZE).css("user-select", "none");

  $("<style type='text/css'>.menu-title { margin: 2vh 0px; padding: 0px 1em; font-size: 120%; font-weight: bold; }</style>").appendTo("head");
  $("<style type='text/css'>.menu-button { margin: 2vh 0px 0px 0px; padding: 1vh 0.5em; background-image: linear-gradient(173deg, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5)); cursor: pointer; }</style>").appendTo("head");
  $("#menu").css("position", "fixed").css("z-index", "5")
    .css("top", "20vh").css("left", "30vw").css("width", "20em").css("height", "60vh")
    .css("display", "flex").css("flex-direction", "column")
    .css("color", "white").css("font-family", "Black Ops One").css("font-size", LABEL_FONT_SIZE).css("user-select", "none")
    .hide();

  $("<style type='text/css'>.message { margin: 0.5em 0.5em 0 0; padding: 0.5em; background: rgba(0, 0, 0, 0.5); border-radius: 0.5em; }</style>").appendTo("head");
  $("#chat").css("position", "fixed").css("z-index", "5")
    .css("top", ROW_SIZE).css("left", "30%").css("width", "50%").css("height", "80%")
    .css("display", "flex").css("flex-direction", "column").css("justify-content", "flex-end")
    .css("color", "white").css("font-size", TEXT_FONT_SIZE)
    .hide();

  $("<style type='text/css'>.button { " + BLOCK_STYLE + " width: 10em; border: white 0.25vh solid; border-radius: 1em; cursor: pointer; }</style>").appendTo("head");
  $("#buttons").css("position", "fixed").css("z-index", "10")
    .css("top", ROW_SIZE).css("left", "calc(98vw - 10em)").css("width", "10em").css("height", "calc(100vh - " + ROW_SIZE + " - " + ROW_SIZE + ")")
    .css("display", "flex").css("flex-direction", "column").css("justify-content", "flex-end")
    .css("color", "white").css("font-family", "Tahoma").css("font-size", LABEL_FONT_SIZE).css("user-select", "none");

  $("<style type='text/css'>.view { " + BLOCK_STYLE + " width: 5vh; padding: 0.5vh; border: white 0.25vh solid; border-radius: 0.5em; cursor: pointer; }</style>").appendTo("head");
  $("#views").css("position", "fixed").css("z-index", "10")
    .css("top", ROW_SIZE).css("left", "2vw").css("width", "10em").css("height", "calc(100vh - " + ROW_SIZE + " - " + ROW_SIZE + ")")
    .css("display", "flex").css("flex-direction", "column").css("justify-content", "flex-end")
    .css("user-select", "none");
});
