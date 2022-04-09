import { game, turn } from "../game.js";

export default function(_, start) {
  turn();

  start("meet-boss");
}
