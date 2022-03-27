
export const rules = {
  TURN_LIMIT: 20,
  YEARS_PER_TURN: 5,

  BOSS_MAX_CONFIDENCE: 1.0,
  BOSS_CONFIDENCE_YEARLY_DROP: 0.02,
  BOSS_MIN_CONFIDENCE: 0.0,
};

export let game = {

  // The current turn of the game:
  //  0 - the game has not started yet
  //  1 - the first turn of the game
  //  100 - the last turn of the game
  turn: 0,

  // The current year in the game
  year: 0,

  // The current scene
  scene: "home",

  // The confidence of your boss in you:
  //  0.0 - no confidence. You are fired!
  //  1.0 - full confidence
  bossConfidence: 0.0,

};

export function autosave() {
  if (!window.localStorage.game || game.turn) {
    window.localStorage.game = JSON.stringify(game);
  } else {
    game = JSON.parse(window.localStorage.game);
  }
}

export function reset() {
  game.turn = 1;
  game.year = new Date().getFullYear();
  game.scene = "home";
  game.bossConfidence = rules.BOSS_MAX_CONFIDENCE;
}
