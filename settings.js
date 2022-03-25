
export default function(key, type, newValue, defaultValue) {
  const settings = JSON.parse(window.localStorage.settings);

  if (typeof(newValue) === type) {
    settings[key] = newValue;
    window.localStorage.settings = JSON.stringify(settings);
  } else if (typeof(settings[key]) !== type) {
    settings[key] = defaultValue;
    window.localStorage.settings = JSON.stringify(settings);
  }

  return settings[key];
}
