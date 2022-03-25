
const menu = $("#menu");

export function cancel() {
  menu.empty().hide();
}

export default function(action, start, perform) {
  const button = $("<div>").addClass("menu-button").appendTo(menu.show());

  button.text(action.label);

  button.click(function() {
    if (action.scene) {
      start(action.scene);
    } else if (action.action) {
      perform(action.action);
    }
  });
}
