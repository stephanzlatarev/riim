import { game } from "../game.js";

export default function(project) {
  game.projects.push({ project: project.name });
}
