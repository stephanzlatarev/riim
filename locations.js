
const locations = {};
let isInitialized = false;

export function add(name, location) {
  locations[name] = location;
}

export async function get(name) {
  await init();
  return locations[name];
}

export async function list() {
  await init();
  return locations;
}

async function load(nation) {
  return await fetch("nation/" + nation + ".yaml")
    .then(response => response.blob())
    .then(blob => blob.text())
    .then(text => jsyaml.load(text));
}

async function init() {
  if (!isInitialized) {
    const nations = await load("index");
    for (const name of nations) {
      const nation = await load(name)
      add(name, nation.location);
    }
    isInitialized = true;
  }
}
