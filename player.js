import button from "./action/button.js";
import goto from "./action/goto.js";
import message from "./action/message.js";

const ACTIONS = {
  "button": button,
  "goto": goto,
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
    if (current !== frame) {
      console.log("Skipped scene", scene.summary);
      return;
    } else if (ACTIONS[action.type]) {
      await ACTIONS[action.type](action, start);
    } else {
      console.log("Skipping action of type", action.type);
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
