
function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export default async function(action) {
  const bubble = $("<div>")
    .css("position", "absolute").css("top", "50%").css("left", "30%").css("width", "60%")
    .css("color", "white").css("font-size", "150%")
    .appendTo($("body"));

  for (const line of action.text) {
    console.log(action.actor, ":", line);

    const utterance = new SpeechSynthesisUtterance(line);
    speechSynthesis.speak(utterance);

    await wait(1000);
    bubble.append($("<p>").text(line));

    await new Promise(function(resolve) {
      utterance.addEventListener("end", resolve);
    });
  }
}
