import { game } from "../player.js";

const TURN_LIMIT = 5;

export default function(_, start) {
  if (game.turn < TURN_LIMIT) {
    game.turn++;
    start("turn");
  } else {
    start("game-over");
  }
}
