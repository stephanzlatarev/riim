
const foreground = $("#foreground");

export function cancel() {
  foreground.empty();
}

export default function(warning) {
  foreground.empty();

  const width = $(document).width();
  const height = $(document).height();
  const display = $("<div>")
    .css("width", width).css("height", height).css("background", "rgba(255, 255, 255, 0.75)")
    .appendTo(foreground);

  $("<img>").attr("src", warning.image)
    .css("width", width / 2).css("height", height / 2)
    .css("margin-top", height / 4).css("margin-left", width / 4)
    .appendTo(display);
  $("<div>").css("text-align", "center").css("font-size", "300%").appendTo(display).text(warning.text);
}
