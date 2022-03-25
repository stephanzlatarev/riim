
const menu = $("#menu");

export function cancel() {
  menu.empty().hide();
}

export default function(action, start, perform) {
  const button = $("<div>").addClass("menu-button").appendTo(menu.show());

  if (action.icon) {
    $("<img>").attr("src", "./image/" + action.icon)
      .css("width", "4vh").css("margin", "-1vh 0.3em -1vh -0.1em")
      .appendTo(button);
  }

  $("<span>").text(action.label).appendTo(button);

  button.click(function() {
    if (action.scene) {
      start(action.scene);
    } else if (action.action) {
      perform(action.action);
    }
  });
}
