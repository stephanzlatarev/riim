
export let game = {
  turn: 0,
};

let frame = 0;
let cleaners = [];
let timeouts = [];
let screenOrientation = "landscape";

async function load(scene) {
  console.log("Loading:", scene);

  return await fetch("scene/" + scene + ".yaml")
    .then(response => response.blob())
    .then(blob => blob.text())
    .then(text => jsyaml.load(text));
}

async function perform(action) {
  const module = await import(`./action/${action.type}.js`);

  if (module.cancel && (cleaners.indexOf(module.cancel) < 0)) {
    cleaners.push(module.cancel);
  }

  if (action.delay > 0) {
    const timeout = setTimeout(function() {
      module.default(action, start, perform);
    }, action.delay);

    timeouts.push(timeout);
  } else {
    await module.default(action, start, perform);
  }
}

async function play(scene) {
  console.log("Scene", scene.summary);

  const current = frame;
  for (const action of scene.sequence) {
    if (current !== frame) {
      console.log("Skipped scene", scene.summary);
      return;
    }

    await perform(action);
  }
}

async function clear() {
  while (cleaners.length) {
    const clean = cleaners.shift();
    await clean();
  }

  while (timeouts.length) {
    const timeout = timeouts.shift();
    clearTimeout(timeout);
  }
}

async function start(scene) {
  const code = await load(scene);

  // Stop the previous scene
  frame++;
  await clear();

  // Auto-save the game variables
  if (game.turn) {
    window.localStorage.game = JSON.stringify(game);
  } else {
    game = (window.localStorage && window.localStorage.game) ? JSON.parse(window.localStorage.game) : { turn: 1 };
  }

  // Start the new scene
  await play(code);
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
      start("turn");
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
