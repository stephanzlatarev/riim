import menu from "./action/menu.js";
import speech from "./action/speech.js";

const ACTIONS = {
  "menu": menu,
  "speech": speech,
};

async function load(scene) {
  console.log("Loading:", scene);

  const response = await fetch("scene/" + scene + "/scene.json");
  return await response.json();
}

async function play(scene) {
  console.log("Scene", scene.summary);

  for (const action of scene.sequence) {
    if (ACTIONS[action.type]) {
      await ACTIONS[action.type](action, start);
    } else {
      console.log("Skipping action of type:", action.type);
    }
  }
}

async function start(scene) {
  // Remove the previous scene
  $("body").empty();

  // Start playing the given scene
  await play(await load(scene));
}

$(document).ready(function() {
  start("home");
});
