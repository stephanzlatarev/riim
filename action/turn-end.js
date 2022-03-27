import { game, YEARS_PER_TURN, TURN_LIMIT } from "../game.js";

function calculateProgress() {
  if (game.turn > TURN_LIMIT) {
    return;
  }

  for (let i = 0; i < YEARS_PER_TURN; i++) {
    game.year++;
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
