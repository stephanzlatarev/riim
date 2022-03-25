import settings from "../settings.js";

export default function(voice) {
  settings("speakMessagesInVoice", "boolean", voice.speak, true);
}
