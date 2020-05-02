// INITIALIZING GSAP SCROLL TO
gsap.registerPlugin(ScrollToPlugin);

//INITIALIZING PAGE TRANSITION SWUP
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
randomIntFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

distance = (x1, y1, x2, y2) => {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
};

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

function Star(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = {
    x: (Math.random() - 0.5) * 8,
    y: 3,
  };
  this.friction = 0.8;
  this.gravity = 1;
}
Star.prototype.draw = function () {
  c.save();
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = this.color;
  c.shadowColor = "#E3EAEF";
  c.shadowBlur = "20";
  c.fill();
  c.closePath();
  c.restore();
};

Star.prototype.update = function () {
  this.draw();
  // WHEN BALL HITS BOTTOM OF SCREEN
  if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
    this.velocity.y = -this.velocity.y * this.friction;
    this.shatter();
  } else {
    this.velocity.y += this.gravity;
  }
  // HITS SIDE OF SCREEN
  if (
    this.x + this.radius + this.velocity.x > canvas.width ||
    this.x - this.radius <= 0
  ) {
    this.velocity.x = -this.velocity.x * this.friction;
    this.shatter();
  }
  this.x += this.velocity.x;
  this.y += this.velocity.y;
};
Star.prototype.shatter = function () {
  this.radius -= 3;
  for (let i = 0; i < 8; i++) {
    miniStars.push(new MiniStar(this.x, this.y, 2));
  }
};
function MiniStar(x, y, radius, color) {
  Star.call(this, x, y, radius, color);
  this.velocity = {
    x: randomIntFromRange(-5, 5),
    y: randomIntFromRange(-15, 15),
  };
  this.friction = 0.8;
  this.gravity = 0.1;
  this.ttl = 200;
  this.opacity = 1;
}
MiniStar.prototype.draw = function () {
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

MiniStar.prototype.update = function () {
  this.draw();
  // WHEN BALL HITS BOTTOM OF SCREEN
  if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
    this.velocity.y = -this.velocity.y * this.friction;
  } else {
    this.velocity.y += this.gravity;
  }
  this.x += this.velocity.x;
  this.y += this.velocity.y;
  this.ttl -= 1;
  this.opacity -= 1 / this.ttl;
};

function createMountainRange(mountainAmount, height, color) {
  for (let i = 0; i < mountainAmount; i++) {
    const mountainWidth = canvas.width / mountainAmount;
    c.beginPath();
    c.moveTo(i * mountainWidth, canvas.height);
    c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);
    c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
    c.lineTo(i * mountainWidth - 325, canvas.height);
    c.fillStyle = color;
    c.fill();
    c.closePath();
  }
}

// Implementation
const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
backgroundGradient.addColorStop(0, "#0D0D0D");
backgroundGradient.addColorStop(1, "#595959");

/* Color Theme Swatches in Hex */
let stars;
let miniStars;
let backgroundStars = [];
let ticker = 0;
let randomSpawnRate = 75;
let groundHeight = 50;
function init() {
  stars = [];
  miniStars = [];
  backgroundStars = [];

  // SMALL STARS IN THE SKY
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 2;
    backgroundStars.push(new Star(x, y, radius, "white"));
  }
}

// ANIMATION LOOP
animate = () => {
  requestAnimationFrame(animate);
  c.fillStyle = backgroundGradient;
  c.fillRect(0, 0, canvas.width, canvas.height);
  backgroundStars.forEach((backgroundStar) => {
    backgroundStar.draw();
  });

  // CREATE MOUNTAINS
  createMountainRange(3, canvas.height - 300, "#262626");
  c.fillStyle = "#000000";
  c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
  stars.forEach((star, index) => {
    star.update();
    if (star.radius == 0) {
      stars.splice(index, 1);
    }
  });
  miniStars.forEach((miniStar, index) => {
    miniStar.update();
    if (miniStar.ttl == 0) {
      miniStars.splice(index, 1);
    }
  });
  ticker++;
  if (ticker % randomSpawnRate == 0) {
    const radius = 12;
    const x = Math.max(radius, Math.random() * canvas.width - radius);
    stars.push(new Star(x, -100, radius, "white"));
    randomSpawnRate = randomIntFromRange(75, 400);
  }
};
init();
animate();

// DEFINING VARIABLES
let menuDropdown = document.querySelector(".munuDropdown");
let menuShows = false;
let hamburgerMenuBackground = "#f1260d";

menuClicked = () => {
  if (menuShows) {
    gsap.fromTo(
      ".phoneMenuBar__line--midLine",
      { opacity: 0, margin: "0px 0px" },
      { opacity: 1, margin: "5px 0px" }
    );
    gsap.fromTo(
      ".phoneMenuBar__line--topLine",
      { margin: "0 0", rotation: 45, y: 1 },
      { margin: "5px 0px", rotation: 0, y: 0 }
    );
    gsap.fromTo(
      ".phoneMenuBar__line--botLine",
      { margin: "0 0", rotation: -45 },
      { margin: "5px 0px", rotation: 0 }
    );
    gsap.fromTo(".munuDropdown__coverLayer", { x: "-100%" }, { x: "0%" });
    gsap.fromTo(".munuDropdown", { x: "-100%" }, { x: "0%", delay: 0.5 });
    gsap.fromTo(
      ".phoneMenuBar",
      { background: "white" },
      { background: hamburgerMenuBackground }
    );
    gsap.fromTo(
      ".phoneMenuBar__line",
      { background: hamburgerMenuBackground },
      { background: "white" }
    );
    document.body.style.overflowY = null;
    menuShows = false;
  } else {
    gsap.fromTo(
      ".phoneMenuBar__line--midLine",
      { opacity: 1, margin: "0px 5px" },
      { opacity: 0, margin: "0px 0px" }
    );
    gsap.fromTo(
      ".phoneMenuBar__line--topLine",
      { margin: "5px 0px", rotation: 0, y: 0 },
      { margin: "0 0", rotation: 45, y: 1 }
    );
    gsap.fromTo(
      ".phoneMenuBar__line--botLine",
      { margin: "5px 0px", rotation: 0 },
      { margin: "0 0", rotation: -45 }
    );
    gsap.fromTo(".munuDropdown", { x: "0" }, { x: "-100%" });
    gsap.fromTo(
      ".munuDropdown__coverLayer",
      { x: "0%" },
      { x: "-100%", delay: 0.5 }
    );
    gsap.fromTo(
      ".phoneMenuBar",
      { background: hamburgerMenuBackground },
      { background: "white" }
    );
    gsap.fromTo(
      ".phoneMenuBar__line",
      { background: "white" },
      { background: hamburgerMenuBackground }
    );
    document.body.style.overflow = "hidden";
    menuShows = true;
  }
};

// MOVING ARROW
let movArrowTl = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
movArrowTl.fromTo(
  ".fa-arrow-right",
  0.5,
  { x: 0 },
  { x: 30, ease: "power2.in" }
);
movingArrow = () => {
  movArrowTl.resume();
};
stopArrow = () => {
  movArrowTl.pause();
};
// SHOWING AND HIDING THE MENUE BASED ON SCROLL PROSITION
let mainNav = document.querySelector(".mainNav");
let bookAppointment = document.querySelector(".navContainer__bookAppointment");
let introduction = document.querySelector(".introduction");
let phoneMenuBar = document.querySelector(".phoneMenuBar");
const options = {
  root: null,
  threshold: 0.95,
};
const observer = new IntersectionObserver((entries, observer) => {
  if (window.matchMedia("(min-width: 750px)").matches) {
    gsap.to(".navContainer__logo", 0.5, { opacity: 1 });

    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        gsap.fromTo(
          `.${mainNav.classList[0]}`,
          0.5,
          { opacity: 1 },
          { opacity: 0 }
        );
        gsap.fromTo(
          `.${phoneMenuBar.classList[0]}`,
          0.5,
          { width: "0px" },
          { width: "45px" }
        );
        gsap.fromTo(
          `.${bookAppointment.classList[0]}`,
          0.5,
          { opacity: 1 },
          { opacity: 0 }
        );
      } else {
        gsap.fromTo(
          `.${mainNav.classList[0]}`,
          0.5,
          { opacity: 0 },
          { opacity: 1 }
        );
        gsap.fromTo(
          `.${phoneMenuBar.classList[0]}`,
          0.5,
          { width: "45px" },
          { width: "0px" }
        );
        gsap.fromTo(
          `.${bookAppointment.classList[0]}`,
          0.5,
          { opacity: 0 },
          { opacity: 1 }
        );
      }
    });
  } else {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        gsap.fromTo(".navContainer__logo", 0.5, { opacity: 1 }, { opacity: 0 });
      } else {
        gsap.fromTo(".navContainer__logo", 0.5, { opacity: 0 }, { opacity: 1 });
      }
    });
  }
}, options);
observer.observe(introduction);

let oal = document.querySelectorAll(".navContainer__logo svg");
let hamburgerMenu = document.querySelector(".phoneMenuBar");
// CONTROL COLOR OF LOGO AND HAMBURGER MENU
let sections = document.querySelectorAll(".section");
// svg color flag
let loadingTime = true;
const sectionOptions = {
  root: null,
  threshold: 0,
  rootMargin: "0px 0px -100% 0px",
};
const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      switch (entry.target.classList[0]) {
        case "introduction":
          oal[0].style.stroke = "#ffffff";
          oal[1].style.fill = "#ffffff";
          break;
        case "praising":
          hamburgerMenu.style.background = "#000000";
          hamburgerMenuBackground = "#000000";
          break;
        case "portfolio":
          oal[0].style.stroke = "#000000";
          oal[1].style.fill = "#000000";
          hamburgerMenu.style.background = "#f1260d";
          hamburgerMenuBackground = "#f1260d";
          break;
        case "secAd":
          oal[0].style.stroke = "#000000";
          oal[1].style.fill = "#000000";
          hamburgerMenu.style.background = "#f1260d";
          hamburgerMenuBackground = "#f1260d";
          break;
        case "footer":
          oal[0].style.stroke = "#ffffff";
          oal[1].style.fill = "#ffffff";
          loadingTime = false;
          break;

        default:
          break;
      }
    } else if (entry.target.classList[0] == "footer" && !loadingTime) {
      oal[0].style.stroke = "#000000";
      oal[1].style.fill = "#000000";
    }
  });
}, sectionOptions);

sections.forEach((sec) => {
  sectionObserver.observe(sec);
});

// Intersection observer for animating skilled Icons
const skilledContainer = document.querySelector(".portfolio__ad");
const skillOptions = {
  root: null,
  threshold: 0.3,
  rootMargin: "0px",
};
const skilledObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      gsap.fromTo(
        ".portfolio__skillSvg",
        2,
        { y: "-100vh, opacity: 0" },
        { y: "0%", opacity: 1, ease: "bounce.out", stagger: 0.2 }
      );
      console.log("intersect");
      observer.unobserve(entry.target);
    } else {
      console.log("not intersect");
    }
  });
}, skillOptions);
skilledObserver.observe(skilledContainer);
// GO TO ABOUT ME
goToSection = (elem) => {
  if (menuShows) {
    menuClicked();
  }
  gsap.to(window, { duration: 1, scrollTo: elem, offsetY: 100 });
};

// CUSTOM MOUSE CURSOR
let mouseCursor = document.querySelector(".cursor");
navLinks = document.querySelectorAll(".mainNav__links");
window.addEventListener("mousemove", cursor);
function cursor(e) {
  mouseCursor.style.top = e.pageY + "px";
  mouseCursor.style.left = e.pageX + "px";
}
navLinks.forEach((link) => {
  link.addEventListener("mouseleave", () => {
    mouseCursor.classList.remove("linkGrow");
  });
  link.addEventListener("mouseover", () => {
    mouseCursor.classList.add("linkGrow");
  });
});

showButs = (but) => {
  gsap.fromTo(but, 0.5, { opacity: 0 }, { opacity: 1, ease: "expo.out" });
};
hideButs = (but) => {
  gsap.fromTo(
    but,
    0.5,
    { opacity: 1 },
    {
      opacity: 0,
      ease: "expo.out",
    }
  );
};
let undecoded = document.location.search.replace(/^.*?\=/, "");
document.body.onload = function () {
  if (undecoded) {
    goToSection(`.${undecoded}`);
  }
};
