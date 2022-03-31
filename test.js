import { game, get, turn, reset } from "./game.js";

let isSuccessful = true;

function showTestStart(name) {
  console.log();
  console.log("===", name.toUpperCase(), "===");
}

function assert(property, expected, actual) {
  if (expected !== actual) {
    isSuccessful = false;
    console.log("FAILURE:", property, expected, "is not", actual);
  }
}

function showGameState(row) {
  console.log(row, "\t",
    "Year:", get("Year"),
    "Money:", get("Money"),
    "Population:", get("Population Earth"), "->" + get("Population Mars"),
    "Rating:", get("Rating"),
    "\t=>", game.scene
  );
}

console.log(JSON.stringify(game, null, 2));

const tests = {

  "Inactive player": function() {
    for (let i = 0; i < 3; i++) {
      showGameState(i + 1);
      turn();
    }
    assert("Scene", game.scene, "game-over-fired");
  },

  "Start new game": function() {
    reset();
    assert("Scene", game.scene, "home");
    assert("Year", get("Year"), 0);
  },

  "Only build image": function() {
    game.parts.push({
      name: "Build image", value: 10000000.0,
      interactions: [
        { target: "Money", impact: -1 },
        { target: "Rating", impact: 0.0001 },
      ]
    });
    while (game.scene === "home") {
      turn();
    }
    assert("Scene", game.scene, "game-over-collision");
  },

  "Manned mission": function() {
    game.parts.push({
      name: "Manned mission", value: 10,
      interactions: [
        { target: "Population Earth", impact: -1 },
        { target: "Population Mars", impact: 1 },
      ]
    });
    turn();
    assert("Population on Mars", get("Population Mars"), 50);
  }
};

for (const name in tests) {
  showTestStart(name);
  tests[name]();
  showGameState("End");
  reset();
}

console.log();
console.log(isSuccessful ? "SUCCESS" : "FAILURE");
