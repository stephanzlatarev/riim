import settings from "../settings.js";

export default function(screen) {
  const requestFullScreen = settings("playInFullScreen", "boolean", screen.full, true);

  if (requestFullScreen) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }
}
