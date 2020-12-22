/* eslint-disable linebreak-style */
// eslint-disable-next-line import/extensions
import Sun from './src/sun.js';
// eslint-disable-next-line import/extensions
import Wave from './src/wave.js';

let minDim;
const waves = [];
let sun;
const nWaves = 10;
const nSunWaves = nWaves - 2;
const minWaveHeight = 150;
const maxWaveHeight = 350;
let minSunWaveWidth;
let maxSunWaveWidth;
let nWavePts;

const wavePalette = [
  [1, 41, 95], // royal blue
  [3, 64, 120], // indigo
];

const sunPalette = [
  [247, 232, 164], // champaign
  [255, 87, 10], // orange af
  [255, 179, 15], // honey yellow
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  minDim = min([windowWidth, windowHeight]);

  nWavePts = Math.floor(windowWidth / 30);
  maxSunWaveWidth = minDim * 0.8;
  minSunWaveWidth = minDim * 0.6;

  let waveHeight;
  let wave;
  let c;
  for (let i = 0; i < nWaves; i += 1) {
    waveHeight = map(i, 0, nWaves, maxWaveHeight, minWaveHeight);
    c = random(wavePalette);
    wave = new Wave({
      waveHeight: height - waveHeight, fillColor: c, nWavePts, waveWidth: width, zIndex: i,
    });
    waves.push(wave);
  }

  for (let i = 1; i <= nSunWaves; i += 1) {
    const zIndex = i + 0.5;
    const waveWidth = map(zIndex, 0, nSunWaves, maxSunWaveWidth, minSunWaveWidth, true);

    waveHeight = map(i, 0, nSunWaves, maxWaveHeight, minWaveHeight, true);
    c = sunPalette[i % sunPalette.length];

    wave = new Wave({
      waveHeight: height - waveHeight,
      fillColor: c,
      nWavePts,
      waveWidth,
      zIndex,
      isSunWave: true,
    });
    waves.push(wave);
  }

  waves.sort((a, b) => a.zIndex - b.zIndex);
  sun = new Sun({ minDim, strokeW: 0.2 });
}

function draw() {
  stroke(255);
  background(13, 6, 56);
  sun.draw();
  waves.forEach((wave) => wave.draw());

  // frame
  stroke(255);
  noFill();
  rect(0, 0, width, height);
}

window.setup = setup;
window.draw = draw;
