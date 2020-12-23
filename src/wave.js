export default class Wave {
  constructor({
    waveHeight, waveWidth, fillColor, isSunWave = false, zIndex = 0,
  }) {
    this.waveHeight = waveHeight;
    this.waveWidth = waveWidth;
    this.fillColor = fillColor;
    this.isSunWave = isSunWave;
    this.zIndex = zIndex;

    const x1 = width / 2 - waveWidth / 2;
    const x2 = width / 2 + waveWidth / 2;
    const y1 = height;
    const y2 = height - waveHeight;

    this.p1 = createVector(0, y1);
    this.p2 = createVector(x1, y2);
    this.p3 = createVector(x2, y2);
    this.p4 = createVector(width, y1);

    this.nWallPts = 20;
  }

  drawWall(ptA, ptB, noiseMin, noiseMax) {
    let x;
    let y;
    let yNoise;

    // Non sunwaves shouldnt taper
    if (!this.isSunWave) curveVertex(ptA.x, ptA.y);

    for (let i = 1; i < this.nWallPts; i += 1) {
      x = map(i, 0, this.nWallPts, ptA.x, ptB.x);
      y = map(i, 0, this.nWallPts, ptA.y, ptB.y);

      if (noiseMin || noiseMax) {
        yNoise = noise(x * 0.01, y, frameCount * 0.005);
        yNoise = map(yNoise, 0, 1, noiseMin, noiseMax);
        y += yNoise;
      }

      // adjust down the outer points of sunwaves to hide corners
      // further away from middle -> further down adjustment
      if (this.isSunWave) {
        const midDist = abs(x - width / 2);
        const adjustY = map(midDist, 0, this.waveWidth / 2, 0, 35);
        y += adjustY;
      }

      curveVertex(x, y);
      // ellipse(x, y, 5);
    }

    // Non sunwaves shouldnt taper
    if (!this.isSunWave) curveVertex(ptB.x, ptB.y);
  }

  draw() {
    push();
    fill(this.fillColor);

    beginShape();
    curveVertex(this.p1.x, this.p1.y);
    curveVertex(this.p1.x, this.p1.y);

    this.drawWall(this.p1, this.p2, 0, 0); // left wall

    // top wall
    if (this.isSunWave) {
      // bias upwards to ensure more visibility over waves
      this.drawWall(this.p2, this.p3, -50, 0);
    } else {
      this.drawWall(this.p2, this.p3, -20, 20);
    }

    this.drawWall(this.p3, this.p4, 0, 0); // right wall
    this.drawWall(this.p4, this.p1, 0, 0); // bottom wall

    curveVertex(this.p1.x, this.p1.y);
    curveVertex(this.p1.x, this.p1.y);

    endShape(CLOSE);
    pop();
  }
}
