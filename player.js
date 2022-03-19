
let frame = 0;
let cleaners = [];
let screenOrientation = "landscape";

async function load(scene) {
  console.log("Loading:", scene);

  return await fetch("scene/" + scene + ".yaml")
    .then(response => response.blob())
    .then(blob => blob.text())
    .then(text => jsyaml.load(text));
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

    if (module.cancel && (cleaners.indexOf(module.cancel) < 0)) {
      cleaners.push(module.cancel);
    }

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
  while (cleaners.length) {
    const clean = cleaners.shift();
    await clean();
  }

  // Start the new scene
  await play(code);
}

function resumeGame() {
  start("home");
}

function checkOrientation() {
  if ($(window).height() > $(window).width()) {
    if (screenOrientation !== "portrait") {
      start("rotate-screen");
    }

    screenOrientation = "portrait";
    return false;
  } else {
    if (screenOrientation !== "landscape") {
      resumeGame();
    }

    screenOrientation = "landscape";
    return true;
  }  
}

$(window).resize(checkOrientation);

$(document).ready(function() {
  if (checkOrientation()) {
    start("home");
  }
});
