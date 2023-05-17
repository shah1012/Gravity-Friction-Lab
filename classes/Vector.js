class Vector {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
  }

  add(v, ctx) {
    return new Vector(this.x + v.x, this.y + v.y, ctx);
  }
  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  draw(sx, sy, clr, n1, n2) {
    this.ctx.beginPath();
    this.ctx.moveTo(sx, sy);
    this.ctx.lineTo(sx + this.x * n1, sy + this.y * n2);
    this.ctx.strokeStyle = clr;
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

export { Vector };
