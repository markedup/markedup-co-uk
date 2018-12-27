import "./minimal-analytics-snippet";

const smallest = 350;
const largest = 800;
const transition = (1 / 60) * (1000 / 350) * 100;

let progress = 0;
let heading = null;
let letters = null;

function r(n) {
  return Math.floor(Math.random() * n);
}

function w() {
  switch (r(2)) {
    case 1:
      return 'bold';
    default:
      return 'normal';
  }
}

function s() {
  return `${Math.floor(Math.random() * largest) + smallest}%`;
}

function f() {
  switch (r(3)) {
    case 2:
      return 'monospace';
    case 1:
      return 'sans-serif';
    default:
      return 'serif';
  }
}

function t() {
  switch (r(2)) {
    case 1:
      return 'uppercase';
    default:
      return 'lowercase';
  }
}

function fade() {
  progress += transition;
  heading.style.opacity = progress / 100;
  if (progress <= 100) {
    window.requestAnimationFrame(fade);
  }
}

function draw() {
  progress = 0;
  heading.style.opacity = progress;
  for (let i = 0; i < letters.length; i += 1) {
    const letter = letters.item(i);
    const weight = w();
    const size = s();
    const family = f();
    const transform = t();
    letter.style = `
      font-weight: ${weight};
      font-size: ${size};
      font-family: ${family};
      text-transform: ${transform};
    `;
  }
  window.requestAnimationFrame(fade);
}

(() => {
  heading = document.querySelector('article h1');
  letters = document.getElementsByTagName('b');
  draw();
  setInterval(() => draw(), 3500);
})();
