
export function cancel() {
  $("#foreground").hide();
}

export default function(background) {
  if (background.front) {
    const image = $("<img>").attr("src", "./background/" + background.image).css("width", "100%").css("height", "100%");

    $("#foreground").css("background", "black").empty().append(image).show();
  } else {
    $("#background").css("background-image", "url('./background/" + background.image + "')");
  }
}
