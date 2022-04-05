
const VIEWS = [
  { icon: "icon-earth.png", scene: "world-earth" },
  { icon: "favicon.ico", scene: "world-mars" },
];

const views = $("#views");

export function cancel() {
  views.empty();
}

export default function(_, start) {
  for (const view of VIEWS) {
    const button = $("<img>").addClass("view").appendTo(views);

    button.attr("src", "./image/" + view.icon);

    button.click(function() {
      start(view.scene);
    });
  }
}
