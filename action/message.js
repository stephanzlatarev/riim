
const chat = $("#chat");

function shouldSpeak() {
  return JSON.parse(window.localStorage.settings).speakMessagesInVoice;
}

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export function cancel() {
  chat.empty().hide();
  speechSynthesis.cancel();
}

export default async function(message) {
  console.log(message.actor, ":", message.text);

  const utterance = shouldSpeak() ? new SpeechSynthesisUtterance(message.text) : null;

  if (utterance) {
    speechSynthesis.speak(utterance);
    await wait(1000);
  }

  $("<div>").addClass("message").appendTo(chat.show()).text(message.text);

  if (utterance) {
    await new Promise(function(resolve) {
      utterance.addEventListener("end", resolve);
    });
  }
}
