
const buttons = $("#buttons");

export function cancel() {
  buttons.empty();
}

export default function(action, start) {
  const button = $("<div>")
    .css("color", "white").css("font-size", "200%")
    .css("cursor", "pointer")
    .appendTo(buttons);

  button.text(action.label);

  button.click(function() {
    start(action.action);
  });
}
