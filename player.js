let scene = 0;

const SCENES = [
  "main-menu",
  "intro-a",
];
const MENU = {
  "start-new-game": 1, // intro-a
};

const ACTIONS = {
  "menu": function(action) {
    const button = $("<div>")
    .css("position", "absolute").css("top", "50%").css("left", "30%").css("width", "40%")
    .css("color", "white").css("font-size", "300%")
    .css("cursor", "pointer")
    .appendTo($("body"));
    button.text(action.items[0].label);
    return new Promise(function(resolve) {
      button.click(function() {
        console.log("Process action", action.items[0].action);
        scene = MENU[action.items[0].action];
        button.remove();
        resolve();
      });
    });
  },

  "speech": async function(action) {
    const bubble = $("<div>")
      .css("position", "absolute").css("top", "50%").css("left", "30%").css("width", "60%")
      .css("color", "white").css("font-size", "150%")
      .appendTo($("body"));

    for (const line of action.text) {
      console.log(action.actor, ":", line);

      const utterance = new SpeechSynthesisUtterance(line);
      speechSynthesis.speak(utterance);

      await wait(1000);
      bubble.append($("<p>").text(line));

      await new Promise(function(resolve) {
        utterance.addEventListener("end", resolve);
      });
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

async function loop() {
  while (scene < SCENES.length) {
    await play(await load(SCENES[scene++]));
  }
}

$(document).ready(loop);
