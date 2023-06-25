export class Rect {
  constructor(parent, x, y, width, height, ppi) {
    this.parent = parent;
    this.children = [];
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.ppi = ppi;
    this.lineWidth = 0;
    this.lineColor = "#000";
    this.lineDash = [0, 0];
  }

  setPpi(ppi) {
    this.ppi = ppi;
  }
  getPpi() {
    return this.ppi;
  }

  getSize() {
    return { x: this.x, y: this.y, width: this.width, height: this.height };
  }

  getParent() {
    return this.parent;
  }

  addChild(child) {
    this.children.push(child);
  }

  setBorderStyle(lineWidth, lineColor, lineDash) {
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
    this.lineDash = lineDash;
  }

  drawLine(ctx, x, y, up, left, width, dash, color) {
    ctx.strokeStyle = color;
    ctx.setLineDash([dash[0] * this.ppi, dash[1] * this.ppi]);
    ctx.lineWidth = width * this.ppi;
    ctx.moveTo(x * this.ppi, y * this.ppi);
    ctx.lineTo((x - left) * this.ppi, (y - up) * this.ppi);
    ctx.stroke();
  }

  draw(ctx, recursive = false) {
    if (this.lineWidth > 0) {
      // ref: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect
      ctx.lineWidth = this.lineWidth * this.ppi;
      ctx.strokeStyle = this.lineColor;
      ctx.setLineDash([
        this.lineDash[0] * this.ppi,
        this.lineDash[1] * this.ppi,
      ]);
      ctx.strokeRect(
        this.x * this.ppi,
        this.y * this.ppi,
        this.width * this.ppi,
        this.height * this.ppi
      );
    }
    if (recursive) {
      this.children.forEach((child) => {
        child.draw(ctx, true);
      });
    }
  }
}
