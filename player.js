import button from "./action/button.js";
import message from "./action/message.js";

const ACTIONS = {
  "button": button,
  "message": message,
};

let frame = 0;

async function load(scene) {
  console.log("Loading:", scene);

  const response = await fetch("scene/" + scene + "/scene.json");
  return await response.json();
}

async function play(scene) {
  console.log("Scene", scene.summary);

  const current = frame;
  for (const action of scene.sequence) {
    if (ACTIONS[action.type] && (current === frame)) {
      await ACTIONS[action.type](action, start);
    } else {
      console.log("Skipping action of type", action.type, "in scene", scene.summary);
    }
  }
}

async function start(scene) {
  const code = await load(scene);

  // Stop the previous scene
  frame++;
  $("body").empty();
  speechSynthesis.cancel();

  // Start the new scene
  await play(code);
}

$(document).ready(function() {
  start("home");
});
