
export function money(value) {
  const abs = Math.abs(value);

  let n;
  let u;

  if (abs < 1000) {
    n = abs;
    u = "";
  } else if (abs < 1000 * 1000) {
    n = abs / 1000;
    u = "K";
  } else if (abs < 1000 * 1000 * 1000) {
    n = abs / 1000 / 1000;
    u = "M";
  } else if (abs < 1000 * 1000 * 1000 * 1000) {
    n = abs / 1000 / 1000 / 1000;
    u = "B";
  } else {
    n = abs / 1000 / 1000 / 1000 / 1000;
    u = "T";
  }

  return n.toFixed(2) + u;
}
