
export default function(action, start) {
  const button = $("<div>")
    .css("position", "absolute").css("top", "50%").css("left", "30%").css("width", "40%")
    .css("color", "white").css("font-size", "300%")
    .css("cursor", "pointer")
    .appendTo($("body"));

  button.text(action.items[0].label);

  button.click(function() {
    console.log("Process action", action.items[0].action);
    start(action.items[0].action);
  });
}
