import { game, rules } from "../game.js";

function calculateProgress() {
  if (game.turn > rules.TURN_LIMIT) {
    return;
  }

  for (let i = 0; i < rules.YEARS_PER_TURN; i++) {
    game.year++;

    game.bossConfidence -= rules.BOSS_CONFIDENCE_YEARLY_DROP;
  }

  game.turn++;
}

function determineState() {
  // Game over cases
  if (game.turn > rules.TURN_LIMIT) {
    return "game-over-collision";
  }
  if (game.bossConfidence <= rules.BOSS_MIN_CONFIDENCE) {
    return "game-over-fired";
  }

  // No special state. Continue with the usual turn
  return "turn";
}

export default function(_, start) {
  calculateProgress();

  start(determineState());
}
