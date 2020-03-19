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

// CONTROLING THE MENUE STYLE
let formContainer = document.querySelector(".formContainer");
let mainNav = document.querySelector(".mainNav");
let phoneMenuBar = document.querySelector(".phoneMenuBar");
let pageIsTop = true;
window.addEventListener("scroll", () => {
  if (formContainer.getBoundingClientRect().top < -30 && pageIsTop) {
    pageIsTop = false;
    if (window.matchMedia("(min-width: 750px)").matches) {
      gsap.to(".navContainer__logo", 0.5, { opacity: 1 });
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
    } else {
      gsap.fromTo(".navContainer__logo", 0.5, { opacity: 1 }, { opacity: 0 });
    }
  } else if (formContainer.getBoundingClientRect().top > -30 && !pageIsTop) {
    pageIsTop = true;
    if (window.matchMedia("(min-width: 750px)").matches) {
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
    } else {
      gsap.fromTo(".navContainer__logo", 0.5, { opacity: 0 }, { opacity: 1 });
    }
  }
});
// CHANGE THE PAGE AND SEND THE PROPER SECTION FOR SCROLLING
goToPageSection = section => {
  window.document.location = "../index.html" + "?inputLocation=" + section;
};

// CUSTOM MOUSE CURSOR
let mouseCursor = document.querySelector(".cursor");
navLinks = document.querySelectorAll(".mainNav__links");
window.addEventListener("mousemove", cursor);
function cursor(e) {
  mouseCursor.style.top = e.pageY + "px";
  mouseCursor.style.left = e.pageX + "px";
}
navLinks.forEach(link => {
  link.addEventListener("mouseleave", () => {
    mouseCursor.classList.remove("linkGrow");
  });
  link.addEventListener("mouseover", () => {
    mouseCursor.classList.add("linkGrow");
  });
});

// Form Validation
let formElement = document.querySelectorAll(".contactForm__element");
let submitBut = document.querySelector(".contactForm__submitBut");
formValidation = () => {
  let formValidationFlag = true;
  formElement.forEach(formEl => {
    if (formEl.name === "input") {
      if (formEl.value) {
        formEl.style.backgroundColor = null;
        formValidationFlag = formValidationFlag && true;
      } else {
        formValidationFlag = false;
      }
    } else if (
      formEl.name == "email" &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formEl.value)
    ) {
      formValidationFlag = formValidationFlag && true;
    } else {
      formValidationFlag = false;
    }
  });
  if (formValidationFlag) {
    submitBut.disabled = false;
    submitBut.disabled = false;
    submitBut.style.cursor = "pointer";
  } else {
    submitBut.disabled = true;
    submitBut.style.cursor = "not-allowed";
  }
};

let sendEmailConfirmBox = document.querySelector(".emailFeedbackMessage");
formSubmit = () => {
  formElement.forEach(formEl => {
    formEl.value = "";
  });
  sendEmailConfirmBox.style.display = "block";
  setTimeout(() => {
    sendEmailConfirmBox.style.display = "none";
  }, 5000);
};
