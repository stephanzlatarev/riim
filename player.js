
const ACTIONS = {
  "menu": function(action, start) {
    const button = $("<div>")
    .css("position", "absolute").css("top", "50%").css("left", "30%").css("width", "40%")
    .css("color", "white").css("font-size", "300%")
    .css("cursor", "pointer")
    .appendTo($("body"));
    button.text(action.items[0].label);
    button.click(function() {
      console.log("Process action", action.items[0].action);
      start(action.items[0].action);
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
