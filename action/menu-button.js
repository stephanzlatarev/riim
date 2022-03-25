
const menu = $("#menu");

export function cancel() {
  menu.empty().hide();
}

export default function(action, start) {
  const button = $("<div>").addClass("menu-button").appendTo(menu.show());

  button.text(action.label);

  button.click(function() {
    start(action.action);
  });
}
