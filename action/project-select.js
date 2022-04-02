import { game } from "../game.js";

let projects;

async function load(project) {
  return await fetch("project/" + project + ".yaml")
    .then(response => response.blob())
    .then(blob => blob.text())
    .then(text => jsyaml.load(text));
}

export default async function(_, start, perform) {
  perform({ type: "menu-title", label: "Select project:" });

  if (!projects) {
    projects = await load("index");
  }

  for (const name of projects) {
    const project = await load(name);

    perform({
      type: "menu-button", label: project.name, action: function() {
        game.parts.push(project);
        start("turn")
      }
    });
  }
}
