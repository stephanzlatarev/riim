
export default function(action, start) {
  const button = $("<div>")
    .css("position", "absolute").css("top", "30%").css("left", "30%").css("width", "40%")
    .css("color", "white").css("font-size", "300%")
    .css("cursor", "pointer")
    .appendTo($("body"));

  button.text(action.label);

  button.click(function() {
    start(action.action);
  });
}
