import { game } from "../player.js";

export default function(_, start) {
  game.turn++;

  start("turn");
}
