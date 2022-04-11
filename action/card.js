
const cards = $("#cards");

export function cancel() {
  cards.empty().hide();
}

export default function(data, start) {
  const card = $("<div>").addClass("card").appendTo(cards.show());

  if (data.image) {
    card
      .css("background-image", "url('./image/" + data.image + "')")
      .css("background-position", "center")
      .css("background-repeat", "no-repeat")
      .css("background-size", "cover");
  }

  $("<div>").text(data.title).appendTo(card);

  if (data.tag) {
    $("<div>").text(data.tag.toUpperCase()).css("font-size", "150%").appendTo(card);
  }

  if (data.out) {
    $("<div>").text("LOCKED")
      .css("margin-top", "3em").css("text-align", "center").css("font-size", "200%")
      .appendTo(card);

    card.css("filter", "grayscale(100%)").css("cursor", "not-allowed");
  } else if (data.scene) {
    card.css("cursor", "pointer").click(function() {
      start(data.scene);
    });
  }
}
