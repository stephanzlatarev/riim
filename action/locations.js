
import { list } from "../locations.js";

const foreground = $("#foreground");

export function cancel() {
  foreground.empty();
}

export default async function() {
  const locations = await list();

  for (const key in locations) {
    const location = locations[key];
    const x = 50 * (1 + location.longitude / 180);
    const y = 50 * (1 - location.latitude / 90);
    const button = $("<div>")
      .css("position", "absolute").css("top", (y - 0.75) + "vh").css("left", (x - 0.75) + "vw")
      .css("width", "3vh").css("height", "3vh")
      .css("border", "white 0.5vh solid").css("border-radius", "3vh")
      .css("cursor", "pointer")
      .appendTo(foreground);

    button.click(function() {
    });
  }
}
