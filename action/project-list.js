import { money } from "../convert.js";
import { game } from "../game.js";

function budget(project) {
  for (const flow of project.interactions) {
    if ((flow.target === "Cash") && (flow.impact < 0)) {
      return money(-project.value * flow.impact);
    }
  }

  return 0;
}

export default async function(_, start, perform) {
  perform({ type: "menu-title", label: "Active projects:" });

  let hasProjects = false;
  for (const part of game.parts) {
    if (part.type === "project") {
      hasProjects = true;
      perform({ type: "menu-button", label: part.name + " (" + budget(part) + ")" });
    }
  }

  if (hasProjects) {
    perform({ type: "menu-button", label: "Add project", scene: "select-project" });
  } else {
    start("select-project");
  }
}
