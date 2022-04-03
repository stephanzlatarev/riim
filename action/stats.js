import { money } from "../convert.js";
import { get } from "../game.js";

const stats = $("#stats");

export function cancel() {
  stats.empty();
}

export default function(stat) {
  const display = $("<div>").addClass("stat").appendTo(stats);
  const variable = get(stat.variable);

  // Display the icon
  let icon = stat.icon;

  if (stat.variable === "Cash") {
    icon = "currency-" + variable.unit + ".svg";
  }

  if (icon) {
    display.append($("<img>").attr("src", "./image/" + icon).width("1.5em").height("1.5em"));
  }

  // Display the value
  let value = variable.value;

  if (stat.variable === "Year") {
    value += new Date().getFullYear();
  } else if (stat.variable === "Cash") {
    value = money(value);
  }

  display.append($("<span>").text(value));
}
