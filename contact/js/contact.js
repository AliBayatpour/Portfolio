let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// RECTANGLE
// c.fillStyle = "rgba(255,0,0,0.5)";
// c.fillRect(100, 50, 50, 50);
// c.fillStyle = "rgba(0,255,0,0.5)";
// c.fillRect(200, 50, 50, 50);
// c.fillStyle = "rgba(0,0,255,0.5)";
// c.fillRect(300, 200, 50, 50);

// // LINE
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

// ARC
// for (let i = 0; i < 100; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y =  Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = "blue";
//   c.stroke();
// }
// let x = Math.random() * innerWidth;
// let y = Math.random() * innerHeight;
// let dy = (Math.random() - 0.5) * 8;
// let dx = (Math.random() - 0.5) * 8;
// let radius = 30;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.strokeStyle = color;
    c.fillStyle = `rgba(227, 234, 239, 1)`;
    c.stroke();
    c.fill();
  };
  this.update = () => {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}
// COMMET
function Commet(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.ttl = 200;
  this.opacity = 1;
  this.draw = () => {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = `rgba(227, 234, 239, ${this.opacity})`;
    c.shadowColor = "#E3EAEF";
    c.shadowBlur = "20";
    c.fill();
    c.closePath();
    c.restore();
  };
  this.update = () => {
    this.x += this.dx;
    this.y += this.dy;
    this.ttl -= 1;
    this.opacity -= 1 / this.ttl;
    this.draw();
  };
}

// Implementation
const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
backgroundGradient.addColorStop(0, "#000000");
backgroundGradient.addColorStop(1, "#434343");

// SOME VARIABLES
let circleArray;
let ticker = 0;
let randomSpawnRate = 75;
let commet;
init = () => {
  circleArray = [];
  commet = [];
  for (let i = 0; i < 1000; i++) {
    let radius = (Math.random() * 1);
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dy = (Math.random() - 0.5) * 0.1;
    let dx = (Math.random() - 0.5) * 0.1;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
};
animate = () => {
  requestAnimationFrame(animate);
  c.fillStyle = backgroundGradient;
  c.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  ticker++;
  if (ticker % randomSpawnRate == 0) {
    const radius = Math.floor((Math.random() * 4) + 1);
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dy = (Math.random() * 1) + 2;
    let dx =( Math.random() * 1) + 10;
    commet.push(new Commet(x, y, dx, dy, radius));
    randomSpawnRate = Math.floor(Math.random() * 50) + 40;
  }
  commet.forEach((thisCommet, index) => {
    thisCommet.update();
    if (thisCommet.ttl == 0) {
      commet.splice(index, 1);
    }
  });
};
init();
animate();
