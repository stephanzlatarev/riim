
export function money(value) {
  const abs = Math.abs(value);
  let text = "";

  if (abs < 1000) {
    text += abs;
  } else if (abs < 1000 * 1000) {
    text += abs / 1000;
    text += "K";
  } else if (abs < 1000 * 1000 * 1000) {
    text += abs / 1000 / 1000;
    text += "M";
  } else if (abs < 1000 * 1000 * 1000 * 1000) {
    text += abs / 1000 / 1000 / 1000;
    text += "B";
  } else {
    text += abs / 1000 / 1000 / 1000 / 1000;
    text += "T";
  }

  return text;
}
