import { Vector } from "./Vector.js";

class Entity {
  constructor(x, y, radius, ctx, canvas, gravInt) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
    this.canvas = canvas;
    this.velocity = new Vector(0, 0, ctx);
    this.accelaration = new Vector(0, 0, ctx);
    this.gravInt = gravInt;
    this.toggleGrav = true;
  }

  move() {
    if (this.toggleGrav) {
      this.accelaration.y += this.gravInt;
      this.velocity.y += this.accelaration.y;
      this.y += this.velocity.y;
      this.checkBounds();
    }
  }

  reset(x, y) {
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.accelaration.y = 0;
    this.toggleGrav = false;
    this.x = x;
    this.y = y;
  }

  checkBounds() {
    if (this.x >= this.canvas.width || this.x < 0) {
      this.x = 0;
    } else if (this.y >= this.canvas.height - this.radius * 2 || this.y < 0) {
      //change if you want to start at 0
      this.toggleGrav = false;
      this.y = this.canvas.height - this.radius * 2;
    }
  }

  shape(type) {
    if (type === "circle") {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = "blue";
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = "black";
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    } else if (type === "square") {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.rect(this.x, this.y, this.radius, this.radius);
      this.ctx.fillStyle = "black";
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = "black";
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
  draw() {
    this.shape("square");
    this.velocity.draw(
      this.x + this.radius / 2,
      this.y + this.radius / 2,
      "red",
      3,
      5
    );
    this.accelaration.draw(
      this.x + this.radius / 2,
      this.y + this.radius / 2,
      "blue",
      10,
      25
    );
  }
}

export { Entity };
