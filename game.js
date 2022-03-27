
export const TURN_LIMIT = 3;

export let game = {

  // The current turn of the game:
  //  0 - the game has not started yet
  //  1 - the first turn of the game
  //  100 - the last turn of the game
  turn: 0,

  // The current year in the game
  year: 0,

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
}
