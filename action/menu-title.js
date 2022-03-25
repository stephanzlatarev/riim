
const menu = $("#menu");

export function cancel() {
  menu.empty().hide();
}

export default function(action) {
  const button = $("<div>").addClass("menu-title").appendTo(menu.show());

  button.text(action.label);
}
