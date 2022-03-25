
const buttons = $("#buttons");

export function cancel() {
  buttons.empty();
}

export default function(action, start, perform) {
  const button = $("<div>").addClass("button").appendTo(buttons);

  button.text(action.label);

  button.click(function() {
    if (action.scene) {
      start(action.scene);
    } else if (action.action) {
      perform(action.action);
    }
  });
}
