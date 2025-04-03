const smallest = 7;
const largest = 13;
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
  return `${Math.floor(Math.random() * largest) + smallest}vmin`;
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
  heading.style.opacity = progress / 1000;
  if (progress <= 1000) {
    window.requestAnimationFrame(fade);
  }
}

function draw() {
  progress = 0;
  heading.style.opacity = progress;
  for (let l = 0; l < letters.length; l += 1) {
    const letter = letters.item(l);
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
  heading = document.querySelector('h1');
  letters = document.getElementsByTagName('b');
  draw();
  setInterval(() => draw(), 3500);
})();
