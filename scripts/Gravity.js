import { Entity } from "../classes/Entity.js";

let canvas = document.querySelector("canvas");
const gravBtn = document.querySelector(".gravBtn");
const resetBtn = document.querySelector(".resetImg");
const velxLabel = document.querySelector(".velX");
const velyLabel = document.querySelector(".velY");
const accxLabel = document.querySelector(".accX");
const accyLabel = document.querySelector(".accY");
const gravRange = document.querySelector(".gravRange");

let gravInt = 0.05;
//constants
let ctx = canvas.getContext("2d");
let obj1 = new Entity(50, 50, 30, ctx, canvas, gravInt);
let toggle = true;

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
  drawFloor(0, canvas.height - 30, canvas.width, canvas.height - 30, "green");

  obj1.draw();
  requestAnimationFrame(redraw);
};

redraw();

const getValues = (obj) => {
  const { x: vx, y: vy } = obj.velocity;
  const { x: ax, y: ay } = obj.accelaration;
  velxLabel.textContent = "X Velocity:" + vx.toFixed(2);
  velyLabel.textContent = "Y Velocity:" + vy.toFixed(2);

  accxLabel.textContent = "X Accelration:" + ax.toFixed(2);
  accyLabel.textContent = "Y Accelration:" + ay.toFixed(2);
};

setInterval(() => {
  obj1.move();
  getValues(obj1);
}, 75);

// --------------------------------------------------

gravBtn.addEventListener("click", () => {
  toggle = !toggle;
  obj1.toggleGrav = toggle;

  if (toggle) {
    gravBtn.textContent = "Gravity: On";
  } else {
    gravBtn.textContent = "Gravity: Off";
  }
});

resetBtn.addEventListener("click", () => {
  obj1.reset(50, 50);
  toggle = false;
  gravBtn.textContent = "Gravity: Off";
});

gravRange.addEventListener("input", (e) => {
  gravInt = gravRange.value;
});

gravRange.addEventListener("mouseup", (e) => {
  obj1 = new Entity(50, 50, 30, ctx, canvas, 75, gravInt);
  obj1.reset(50, 50);
  // obj1.reset(0, canvas.height - 60);
  toggle = false;
  obj1.toggleGrav = toggle;
  gravBtn.textContent = "Gravity: Off";
});
