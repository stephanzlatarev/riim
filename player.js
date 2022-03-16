
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
    }

    const module = await import(`./action/${action.type}.js`);

    if (action.delay > 0) {
      setTimeout(function() {
        module.default(action, start);
      }, action.delay);
    } else {
      await module.default(action, start);
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
