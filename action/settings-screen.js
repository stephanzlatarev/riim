
function readSettings() {
  return (window.localStorage.settings) ? JSON.parse(window.localStorage.settings).playInFullScreen : "no";
}

function writeSettings(playInFullScreen) {
  let settings = window.localStorage.settings ? JSON.parse(window.localStorage.settings) : {};

  settings.playInFullScreen = playInFullScreen;

  window.localStorage.settings = JSON.stringify(settings);
}

export default function(screen) {
  const requestFullScreen = screen.full ? screen.full : readSettings();

  if (requestFullScreen === "yes") {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }

    writeSettings("yes");
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }

    writeSettings("no");
  }
}
