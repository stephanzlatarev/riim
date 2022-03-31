import { get } from "../game.js";

const stats = $("#stats");

export function cancel() {
  stats.empty();
}

export default function(stat) {
  const display = $("<div>").addClass("stat").appendTo(stats);

  const label = stat.label ? stat.label + ": " : "";
  let value = get(stat.variable);

  if (stat.variable === "Year") {
    value += new Date().getFullYear();
  }

  display.text(label + value);
}
