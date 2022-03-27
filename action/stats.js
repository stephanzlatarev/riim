import { game } from "../game.js";

const stats = $("#stats");

export function cancel() {
  stats.empty();
}

export default function(stat) {
  const display = $("<div>").addClass("stat").appendTo(stats);

  display.text(stat.label + ": " + game[stat.variable]);
}
