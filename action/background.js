import { game } from "../game.js";

export default function(background) {
  const image = background.image ? background.image : game.nation.office;

  $("#background").css("background-image", "url('./background/" + image + "')");
}
