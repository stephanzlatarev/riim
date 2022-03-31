
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

  button.click(async function() {
    if (action.scene) {
      start(action.scene);
    } else if (typeof(action.action) === "function") {
      await action.action();
    } else if (Array.isArray(action.action)) {
      for (const one of action.action) {
        await perform(one);
      }
    } else if (action.action) {
      perform(action.action);
    }
  });
}
