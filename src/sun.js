export default class Sun {
  constructor({ minDim }) {
    this.sunColor = color([255, 179, 15]); // honey yellow
    this.minDim = minDim;
    this.nHaloCount = 40;
    this.minRadius = minDim * 0.8;
    this.maxRadius = minDim * 5;
  }

  draw() {
    fill(this.sunColor);
    ellipse(width / 2, height / 2, this.minDim * 0.8);
    noFill();

    let haloRadius;
    let haloColor;

    for (let i = 0; i <= this.nHaloCount; i += 1) {
      haloRadius = map(i, 0, this.nHaloCount, this.minRadius, this.maxRadius);
      haloColor = lerpColor(this.sunColor, color(255), i / this.nHaloCount + 0.1);
      stroke(haloColor);
      ellipse(width / 2, height / 2, haloRadius);
    }
  }
}
