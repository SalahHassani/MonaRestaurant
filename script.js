"using strict";

/**********************************************************/
/**********************************************************/
/**********************************************************/

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
// const btnOpenModal = document.querySelectorAll(".show-modal");
const btnOpenModal = document.querySelector(".show-modal");

// Functions

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const closeModalOnEsc = function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
};

const MyEvents = function (onWhat, element, method) {
  element.addEventListener(onWhat, method);
};

///////////////////////////////////////////////

// for (var i = 0; i < btnOpenModal.length; i++) {
//   //   btnOpenModal[i].addEventListener("click", openModal);
//   console.log("Hi");
//   const element = btnOpenModal[i];
//   MyEvents("click", element, openModal);
// }

MyEvents("click", btnOpenModal, openModal);

// btnCloseModal.addEventListener("click", closeModal);
// overlay.addEventListener("click", closeModal);

MyEvents("click", btnCloseModal, closeModal);
MyEvents("click", overlay, closeModal);

// document.addEventListener("keydown", closeModalOnEsc);
MyEvents("keydown", document, closeModalOnEsc);

/**********************************************************/
/**********************************************************/
/**********************************************************/

const btnScrollTo3 = document.querySelector(".scrollBtn-reserve");
const section3 = document.querySelector(".section-3");
const btnScrollTo4 = document.querySelector(".scrollBtn-contactUs");
const section4 = document.querySelector(".section-4");
const btnScrollTo5 = document.querySelector(".scrollBtn-aboutUs");
const section5 = document.querySelector(".section-5");

// Functions

const scrollToSection = function (btn, section) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const s5coords = section.getBoundingClientRect();

    section.scrollIntoView({ behavior: "smooth" });
  });
};

// scrollToSection(btnScrollTo3, section3);

// btnScrollTo4.addEventListener("click", function (e) {
//   e.preventDefault();
//   const s4coords = section4.getBoundingClientRect();
//   // console.log(s4coords);
//   // console.log(e.target);

//   // // Scrolling

//   // window.scrollTo(
//   //   s4coords.left + window.pageXOffset,
//   //   s4coords.top + window.pageYOffset
//   // );

//   // window.scrollTo({
//   //   left: s4coords.left + window.pageXOffset,
//   //   top: s4coords.top + window.pageYOffset,
//   //   behavior: "smooth",
//   // });

//   section4.scrollIntoView({ behavior: "smooth" });
// });

// scrollToSection(btnScrollTo4, section4);

// btnScrollTo5.addEventListener("click", function (e) {
//   e.preventDefault();
//   const s5coords = section5.getBoundingClientRect();

//   section5.scrollIntoView({ behavior: "smooth" });
// });

// scrollToSection(btnScrollTo5, section5);

// document.querySelectorAll(".nav-link").forEach((el) => {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = "." + this.getAttribute("href").slice(1);
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

//.1)

document.querySelector(".topNav").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    const id = "." + e.target.getAttribute("href").slice(1);
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/**********************************************************/
/**********************************************************/
/**********************************************************/
// Tabs

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations-content");

tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();

  const clicked = e.target.closest(".operations__tab");

  console.log(clicked);
  //Guard clause
  if (!clicked) return;

  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  // console.log(clicked.getAttribute("data-tab"));
  // const data = clicked.getAttribute("data-tab")
  // document.querySelector(`.aboutUs-${clicked.getAttribute("data-tab")}`);

  tabsContent.forEach((c) => {
    c.classList.remove("operations__content--active");
  });

  document
    .querySelector(`.aboutUs-${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

/**********************************************************/
/**********************************************************/
/**********************************************************/
// Sticky navigation
const nav = document.querySelector(".nav");

const section1 = document.querySelector(".section-1");

const initialCoordsOfSec1 = section1.getBoundingClientRect();

// console.log(initialCoordsOfSec1);
window.addEventListener("scroll", function () {
  // console.log(this.window.scrollY);

  if (window.scrollY > initialCoordsOfSec1.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});

// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     // console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
//   // rootMargin: "-90px",
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// // const stickyNav = function (entries) {
//   const [entry] = entries;
//   console.log(entry);

//   if (!entry.isIntersecting) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// };

const navHeight = nav.getBoundingClientRect().height;
// const navObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// });

// navObserver.observe(section1);

// reveal sections

const allSections = document.querySelectorAll(".container");
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//////////////////////////////////////////////
/////////////////////////////////////////////

//SlideShow
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
let curSlide = 0;
const maxSlide = slides.length - 1;
// Funtions
const gotoSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
    // -100% 0%, 100%, 200%,
  });
};

const nextSlide = function () {
  curSlide === maxSlide ? (curSlide = 0) : curSlide++;

  gotoSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  curSlide === 0 ? (curSlide = maxSlide) : curSlide--;

  gotoSlide(curSlide);
  activateDot(curSlide);
};

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class='dots__dot' data-slide="${i}"></button>`
    );
  });
};
createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dots) => dots.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

gotoSlide(curSlide);
activateDot(curSlide);

btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide(curSlide);
  e.key === "ArrowRight" && nextSlide(curSlide);
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    // console.log("dot");
    // const slide = e.target.dataset.slide;
    const { slide } = e.target.dataset; // destructuring
    // console.log(Number(slide));
    gotoSlide(Number(slide));
    activateDot(slide);
  }
});
