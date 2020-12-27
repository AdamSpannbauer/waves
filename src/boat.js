export default class Boat {
  constructor({
    x, y, img = null, zIndex = 0,
  }) {
    this.x = x;
    this.y = y;
    this.img = img;

    this.zIndex = zIndex;
  }

  draw() {
    push();
    fill(255, 0, 0);
    stroke(0, 255, 0);
    strokeWeight(10);

    const yAdj = 5 * sin(frameCount * 0.03);
    ellipse(this.x, this.y + yAdj, 50);
    pop();
  }
}
