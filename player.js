
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

function isConditionSatisfied(condition) {
  return eval("const settings = JSON.parse(window.localStorage.settings); " + condition);
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

    if (!action.condition || isConditionSatisfied(action.condition)) {
      await perform(action);
    }
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

  // Apply game settings if at the start of the game
  if (frame == 1) {
    if (!window.localStorage.settings) {
      window.localStorage.settings = JSON.stringify({});
    }
    perform({ type: "settings-screen" });
    perform({ type: "settings-voice" });
  }

  // Stop the previous scene
  frame++;
  await clear();

  // Auto-save the game variables
  if (!window.localStorage.game || game.turn) {
    window.localStorage.game = JSON.stringify(game);
  } else {
    game = JSON.parse(window.localStorage.game);
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
    if ($("#foreground").height() > $("#background").height()) {
      perform("settings-screen", { full: true });
    }

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
