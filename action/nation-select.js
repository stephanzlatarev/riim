import { game } from "../game.js";

let nations;

async function load(nation) {
  return await fetch("nation/" + nation + ".yaml")
    .then(response => response.blob())
    .then(blob => blob.text())
    .then(text => jsyaml.load(text));
}

export default async function(_, start, perform) {
  perform({ type: "menu-title", label: "Select your nation:" });

  if (!nations) {
    nations = await load("index");
  }

  for (const name of nations) {
    const nation = await load(name);

    perform({
      type: "menu-button",
      icon: "flag-" + name + ".svg",
      label: nation.name,
      lock: nation.lock,
      action: function() {
        game.nation = nation;

        for (const asset of nation.assets) {
          game.parts.push(asset);
        }

        start("meet-boss")
      }
    });
  }
}
