import { game } from "../player.js";

const TURN_LIMIT = 5;

function calculateProgress() {
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
