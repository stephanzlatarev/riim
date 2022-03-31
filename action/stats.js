import { get } from "../game.js";

const stats = $("#stats");

export function cancel() {
  stats.empty();
}

export default function(stat) {
  const display = $("<div>").addClass("stat").appendTo(stats);

  if (stat.icon) {
    display.append($("<img>").attr("src", "./image/" + stat.icon).width("1.5em").height("1.5em"));
  }

  const label = stat.label ? stat.label + ": " : "";
  let value = get(stat.variable);

  if (stat.variable === "Year") {
    value += new Date().getFullYear();
  }

  display.append($("<span>").text(label + value));
}
