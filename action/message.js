
function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export default async function(message) {
  const bubble = $("<div>")
    .css("position", "absolute").css("top", "50%").css("left", "30%").css("width", "60%")
    .css("color", "white").css("font-size", "150%")
    .appendTo($("body"));

  console.log(message.actor, ":", message.text);

  const utterance = new SpeechSynthesisUtterance(message.text);
  speechSynthesis.speak(utterance);

  await wait(1000);
  bubble.append($("<p>").text(message.text));

  await new Promise(function(resolve) {
    utterance.addEventListener("end", resolve);
  });
}
