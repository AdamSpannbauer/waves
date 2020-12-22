export default class Wave {
  constructor({
    waveHeight, fillColor, nWavePts = 20, waveWidth, zIndex = 0, isSunWave = false,
  }) {
    this.nWavePts = nWavePts;
    this.waveHeight = waveHeight;
    this.fillColor = fillColor;
    this.x1 = width / 2 - waveWidth / 2;
    this.x2 = width / 2 + waveWidth / 2;
    this.waveWidth = waveWidth;
    this.zIndex = zIndex;
    this.isSunWave = isSunWave;
  }

  draw() {
    fill(this.fillColor);
    stroke(255);

    if (this.isSunWave) {
      noStroke();
    }

    beginShape();
    vertex(this.x2, height); // Bottom right
    vertex(this.x1, height); // Bottom left
    vertex(this.x1, this.waveHeight); // Top left
    curveVertex(this.x1, this.waveHeight);
    curveVertex(this.x1, this.waveHeight);
    // Wavy vertices
    let x;
    let offset;

    for (let i = 1; i < this.nWavePts; i += 1) {
      x = map(i, 0, this.nWavePts, this.x1, this.x2);

      offset = noise(x * 0.01, this.waveHeight, frameCount * 0.005);
      if (this.isSunWave) {
        offset = map(offset, 0, 1, -20, 0);
      } else {
        offset = map(offset, 0, 1, -20, 20);
      }
      curveVertex(x, this.waveHeight + offset);
    }

    curveVertex(this.x2, this.waveHeight);
    curveVertex(this.x2, this.waveHeight);
    vertex(this.x2, this.waveHeight); // Top right
    curveVertex(this.x2, height); // Bottom right
    endShape(CLOSE);
  }
}
