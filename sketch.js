/* eslint-disable linebreak-style */
// eslint-disable-next-line import/extensions
import Sun from './src/sun.js';
// eslint-disable-next-line import/extensions
import Wave from './src/wave.js';

let minDim;
const waves = [];
let sun;
const nWaves = 10;
const minWaveHeight = 200;
const maxWaveHeight = 350;
let nWavePts;

const wavePalette = [
  [1, 41, 95], // royal blue
  [3, 64, 120], // indigo
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  nWavePts = Math.floor(windowWidth / 30);

  minDim = min([windowWidth, windowHeight]);
  let waveHeight;
  let wave;
  let c;
  for (let i = 0; i < nWaves; i += 1) {
    waveHeight = map(i, 0, nWaves, maxWaveHeight, minWaveHeight);
    c = random(wavePalette);
    wave = new Wave({ waveHeight: height - waveHeight, fillColor: c, nWavePts });

    waves.push(wave);
  }
  sun = new Sun({ minDim });
}

function draw() {
  stroke(255);
  background(200);
  sun.draw();
  waves.forEach((wave) => wave.draw());
}

window.setup = setup;
window.draw = draw;
