import { game, TURN_LIMIT } from "../game.js";

function calculateProgress() {
  if (game.turn >= TURN_LIMIT) {
    return;
  }

  game.turn++;  
}

function determineState() {
  // Game over cases
  if (game.turn > TURN_LIMIT) {
    return "game-over";
  }

  // No special state. Continue with the usual turn
  return "turn";
}

export default function(_, start) {
  calculateProgress();

  start(determineState());
}
