// eslint-disable-next-line import/extensions
import Wave from './src/wave.js';

const waves = [];
const nWaves = 10;
const minWaveHeight = 100;
const maxWaveHeight = 300;
let nWavePts;

// [255, 179, 15], // honey yellow
const wavePalette = [
  [1, 41, 95], // royal blue
  [3, 64, 120], // indigo
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  nWavePts = Math.floor(windowWidth / 30);

  let waveHeight;
  let wave;
  let c;
  for (let i = 0; i < nWaves; i += 1) {
    waveHeight = map(i, 0, nWaves, minWaveHeight, maxWaveHeight);
    c = random(wavePalette);
    wave = new Wave({ waveHeight, fillColor: c, nWavePts });

    waves.push(wave);
  }
}

function draw() {
  background(200);
  waves.forEach((wave) => wave.draw());
}

window.setup = setup;
window.draw = draw;
