const SCENES = [
  "intro-a",
];

const ACTIONS = {
  "speech": async function(action) {
    const bubble = $("<div>")
      .css("position", "absolute").css("top", "50%").css("left", "30%").css("width", "60%")
      .css("color", "white").css("font-size", "150%")
      .appendTo($("body"));

    for (const line of action.text) {
      console.log(action.actor, ":", line);
      bubble.append($("<p>").text(line));
      await wait(1000);
    }
  }
};

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function load(scene) {
  console.log("Loading", scene);
  const response = await fetch("scene/" + scene + "/scene.json");
  return await response.json();
}

async function play(scene) {
  if (!scene || !scene.sequence) return;
  for (const action of scene.sequence) {
    if (ACTIONS[action.type]) {
      console.log("Playing", action.summary);
      await ACTIONS[action.type](action);
    } else {
      console.log("Skipping", action.summary);
    }
  }
}

async function go() {
  for (const scene of SCENES) {
    await play(await load(scene));
  }
}

$(document).ready(go);
