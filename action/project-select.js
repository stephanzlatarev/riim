import { game } from "../game.js";

const PROJECT_LIST = [
  "improve-your-image",
  "manned-mission-to-mars",
];

async function load(project) {
  console.log("Loading:", project);

  return await fetch("project/" + project + ".yaml")
    .then(response => response.blob())
    .then(blob => blob.text())
    .then(text => jsyaml.load(text));
}

export default async function(_, start, perform) {
  perform({ type: "menu-title", label: "Select project:" });

  for (const name of PROJECT_LIST) {
    const project = await load(name);

    perform({
      type: "menu-button", label: project.name, action: function() {
        game.parts.push(project);
        start("turn")
      }
    });
  }
}
