
// Game speed is the number of years per game turn
const SPEED = 5;

export let game = {

  // The current scene
  scene: "home",

  // The parts of the system
  parts: [],

};

export function autosave() {
  window.localStorage.game = JSON.stringify(game);
}

export function reset() {
  game = {
    scene: "home",
    parts: [
      { name: "Year", value: 0, max: { threshold: 100, scene: "game-over-collision" } },
      { name: "Money", value: 1 * 1000 * 1000 * 1000 },
      { name: "Population Earth", value: 7.5 * 1000 * 1000 * 1000 },
      { name: "Population Mars", value: 0 },
      {
        name: "Rating", value: 100, min: { threshold: 0, scene: "game-over-fired" }, max: { threshold: 100 },
        interactions: [
          { source: "Year", impact: -2 },
        ]
      }
    ]
  };
}

function getSystemPart(name) {
  for (const part of game.parts) {
    if (part.name === name) {
      return part;
    }
  }

  return { name: name, value: 0 };
}

export function get(name) {
  return getSystemPart(name).value;
}

function cycle() {
  // Move one year ahead
  getSystemPart("Year").value++;

  // Run the interactions
  const delta = {};
  for (const part of game.parts) {
    if (part.interactions) {
      for (const interaction of part.interactions) {
        const source = interaction.source ? getSystemPart(interaction.source) : part;
        const target = interaction.target ? getSystemPart(interaction.target) : part;

        if (!delta[target.name]) {
          delta[target.name] = 0;
        }

        delta[target.name] += source.value * interaction.impact;
      }
    }
  }
  for (const part of game.parts) {
    if (delta[part.name]) {
      part.value += delta[part.name];
    }
  }

  // Check the boundary conditions
  let canChangeSceneAgain = true;
  for (const part of game.parts) {
    if (part.min && (part.value < part.min.threshold)) {
      part.value = part.min.threshold;

      if (canChangeSceneAgain && part.min.scene) {
        game.scene = part.min.scene;
        canChangeSceneAgain = false;
      }
    }
    if (part.max && (part.value > part.max.threshold)) {
      part.value = part.max.threshold;

      if (canChangeSceneAgain && part.max.scene) {
        game.scene = part.max.scene;
        canChangeSceneAgain = false;
      }
    }
  }
}

export function turn() {
  for (let i = 0; i < SPEED; i++) {
    cycle();
  }
}

// Initialize game: Resume old game if one is stored, otherwise reset to new game.
if (window.localStorage.game) {
  game = JSON.parse(window.localStorage.game);
} else {
  reset();
}
