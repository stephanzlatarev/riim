
export function cancel() {
  $("#foreground").hide();
}

export default function(foreground) {
  const image = $("<img>").attr("src", "./background/" + foreground.image).css("width", "100%").css("height", "100%");

  $("#foreground").css("background", "#666666").empty().append(image).show();
}
