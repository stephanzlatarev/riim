
const chat = $("#chat");

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export function cancel() {
  chat.empty().hide();
  speechSynthesis.cancel();
}

export default async function(message) {
  console.log(message.actor, ":", message.text);

  const utterance = new SpeechSynthesisUtterance(message.text);
  speechSynthesis.speak(utterance);

  await wait(1000);
  $("<div>").addClass("message").appendTo(chat.show()).text(message.text);

  await new Promise(function(resolve) {
    utterance.addEventListener("end", resolve);
  });
}
