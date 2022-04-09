import { game } from "../game.js";

let projects;

async function load(project) {
  return await fetch("project/" + project + ".yaml")
    .then(response => response.blob())
    .then(blob => blob.text())
    .then(text => jsyaml.load(text));
}

function isProjectActive(code) {
  for (const project of game.parts) {
    if (project.code === code) {
      return true;
    }
  }

  return false;
}

export default async function(_, start, perform) {
  perform({ type: "menu-title", label: "Select project:" });

  if (!projects) {
    projects = await load("index");
  }

  for (const name of projects) {
    const project = await load(name);

    perform({
      type: "menu-button",
      label: project.name,
      out: isProjectActive(name),
      action: function() {
        project.type = "project";
        project.code = name;
        game.parts.push(project);

        start("plan-budget")
      }
    });
  }
}
