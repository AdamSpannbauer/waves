export default class Boat {
  constructor({
    x, y, w = 100, h = 100, img = null, zIndex = 0,
  }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;

    this.zIndex = zIndex;
  }

  draw() {
    push();
    const yAdj = 3 * sin(frameCount * 0.03);

    const angle = cos(frameCount * 0.03) * 0.15;

    if (this.img) {
      imageMode(CENTER);
      translate(this.x, this.y);
      rotate(angle);
      image(this.img, 0, 0 + yAdj - this.h * 0.3, this.w, this.h);
    } else {
      ellipse(this.x, this.y + yAdj, 50);
    }
    pop();
  }
}
