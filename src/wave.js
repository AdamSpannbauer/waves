export default class Wave {
  constructor({ waveHeight, fillColor, nWavePts = 20 }) {
    this.nWavePts = nWavePts;
    this.waveHeight = waveHeight;
    this.fillColor = fillColor;
  }

  draw() {
    fill(this.fillColor);
    stroke(255);

    beginShape();
    vertex(width, height); // Bottom right
    vertex(0, height); // Bottom left
    vertex(0, this.waveHeight); // Top left
    // Wavy vertices
    let x;
    let offset;

    for (let i = 0; i < this.nWavePts; i += 1) {
      x = map(i, 0, this.nWavePts, 0, width);

      offset = noise(x * 0.01, this.waveHeight, frameCount * 0.005);
      offset = map(offset, 0, 1, -20, 20);

      curveVertex(x, this.waveHeight + offset);
    }

    curveVertex(width, this.waveHeight + offset);
    vertex(width, this.waveHeight + offset); // Top right
    endShape(CLOSE);
  }
}
