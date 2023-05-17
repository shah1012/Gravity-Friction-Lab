import { Entity } from "../classes/FrictionEntity.js";

const canvas = document.querySelector("canvas");
const PlayPause = document.querySelector(".plypsImg");
const resetBtn = document.querySelector(".resetImg");
const fricRange = document.querySelector(".frictRange");
let ctx = canvas.getContext("2d");

let fricInt = 0.05;
let obj1 = new Entity(0, canvas.height - 60, 30, ctx, canvas, 50, fricInt);
let paused = false;

const drawFloor = (x, y, w, h, clr) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.rect(x, y, w, h);
  ctx.fillStyle = clr;
  ctx.fill();
  ctx.closePath();
};

const redraw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFloor(0, canvas.height - 30, 150, canvas.height - 30, "blue");
  drawFloor(
    150,
    canvas.height - 30,
    canvas.width - 150,
    canvas.height - 30,
    "green"
  );
  obj1.draw();
  requestAnimationFrame(redraw);
};

redraw();

setInterval(() => {
  obj1.move();
}, 100);

PlayPause.addEventListener("click", (e) => {
  paused = !paused;
  obj1.toggle = paused;

  if (paused) {
    PlayPause.src = "../assets/play.png";
  } else {
    PlayPause.src = "../assets/pause.png";
  }
});

resetBtn.addEventListener("click", () => {
  paused = false;
  PlayPause.src = "../assets/pause.png";
  obj1.reset(0, canvas.height - 60);
});

fricRange.addEventListener("input", (e) => {
  fricInt = fricRange.value;
});

fricRange.addEventListener("mouseup", (e) => {
  obj1 = new Entity(0, canvas.height - 60, 30, ctx, canvas, 75, fricInt);
  obj1.reset(0, canvas.height - 60);
  paused = true;
  obj1.toggle = paused;
  PlayPause.src = "../assets/play.png";
});
