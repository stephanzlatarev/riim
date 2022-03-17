
const buttons = $("#buttons");

export function cancel() {
  buttons.empty();
}

export default function(action, start) {
  const button = $("<div>").addClass("button").appendTo(buttons);

  button.text(action.label);

  button.click(function() {
    start(action.action);
  });
}
