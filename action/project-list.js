import { money } from "../convert.js";
import { game } from "../game.js";

const COLORS = {
  "Research & Development": "240",
  "Population": "120",
};

export function cancel() {
  $("#scene").empty().hide();
}

export default async function(_, start, perform) {
  const projects = [];
  for (const part of game.parts) {
    if (part.type === "project") {
      projects.push(part);
      perform({ type: "menu-button", label: part.name + " (" + money(budget(part)) + ")" });
    }
  }

  if (projects.length) {
    drawBoard(projects);
    perform({ type: "menu-button", label: "Add project", scene: "select-project" });
  } else {
    start("select-project");
  }
}

function drawBoard(projects) {
  $("#scene").css("display", "grid").css("justify-content", "center").css("grid-template-columns", "30vw 30vw");

  const table = $("<div>").appendTo($("#scene"));
  table.append($("<div>"));

  const chart = $("<div>").appendTo($("#scene"));
  const canvas = $("<canvas>").appendTo(chart);

  drawChart(canvas[0], projects);
}

function drawChart(canvas, projects) {
  const data = [];

  let freeBudget = 10000000000;
  for (const project of projects) {
    const projectBudget = budget(project);
    freeBudget -= projectBudget;

    data.push({
      topic: "Research & Development",
      project: project.name,
      budget: projectBudget,
    });
  }
  data.push({
    topic: "Free budget",
    budget: freeBudget,
  });

  new Chart(canvas.getContext("2d"), {
    type: "treemap",
    data: {
      datasets : [ {
        tree: data,
        key: "budget",
        groups: [ 'topic', 'project' ],
        captions: {
          display: true,
          align: "center",
          color: "white",
          font: {
            family: "Black Ops One",
            size: "20vh"
          }
        },
        labels: {
          display: true,
          color: "white",
          font: {
            size: "10vh"
          },
          formatter: function(data) {
            const label = [];
            if (data.raw.g) {
              label.push(data.raw.g);
            }
            label.push("\u20AC" + money(data.raw.v));
            return label;
          }
        },
        borderColor: "lightGray",
        borderWidth: 0.5,
        backgroundColor: function(data) {
          const cell = data.raw;
          if (cell) {
            const color = COLORS[cell._data.topic];
            if (color) {
              const depth = 80 - (cell.gs ? (cell.gs - cell.s) * 60 / cell.gs : 0);
              return "hsl(" + color + ", " + depth + "%, 50%)";
            } else {
              return "lightGray";
            }
          }
        }
      } ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 300
      },
      plugins: {
        title: {
          display: false
        },
        legend: {
          display: false
        }
      }
    }
  });
}

function budget(project) {
  for (const flow of project.interactions) {
    if ((flow.target === "Cash") && (flow.impact < 0)) {
      return -project.value * flow.impact;
    }
  }

  return 0;
}
