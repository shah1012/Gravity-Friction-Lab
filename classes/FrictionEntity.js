import { Vector } from "./Vector.js";

class Entity {
  constructor(x, y, radius, ctx, canvas, startV, fricInt) {
    this.x = x;
    this.y = y;
    this.startV = startV;
    this.radius = radius;
    this.ctx = ctx;
    this.canvas = canvas;
    this.velocity = new Vector(this.startV, 0, ctx);
    this.fricInt = fricInt;
    this.toggle = false;
  }

  move() {
    if (this.toggle === false) {
      if (this.velocity.x >= 0) {
        // this.accelaration.x += this.fricInt;
        // this.velocity.x -= this.accelaration.x;
        // this.velocity.x = this.velocity.x - this.fricInt;
        // this.velocity.x *= this.fricInt;

        this.velocity.x = this.velocity.x - this.velocity.x * this.fricInt;
        this.x += this.velocity.x;
        this.checkBounds();
      }
    }
  }

  checkBounds() {
    if (this.x >= this.canvas.width || this.x < 0) {
      this.x = 0;
    } else if (this.y >= this.canvas.height - this.radius * 2 || this.y < 0) {
      //change if you want to start at 0
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

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = new Vector(this.startV, 0, this.ctx);
    this.toggle = false;
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
    // this.accelaration.draw(
    //   this.x + this.radius / 2,
    //   this.y + this.radius / 2,
    //   "blue",
    //   5,
    //   12
    // );
  }
}

export { Entity };
