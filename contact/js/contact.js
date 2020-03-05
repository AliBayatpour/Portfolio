// DEFINING VARIABLES
let menuDropdown = document.querySelector(".munuDropdown");
let menuShows = false;
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
      { background: "red" }
    );
    gsap.fromTo(
      ".phoneMenuBar__line",
      { background: "red" },
      { background: "white" }
    );
    document.body.style.overflowY = "scroll";
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
      { background: "red" },
      { background: "white" }
    );
    gsap.fromTo(
      ".phoneMenuBar__line",
      { background: "white" },
      { background: "red" }
    );
    document.body.style.overflowY = "hidden";
    menuShows = true;
  }
};
