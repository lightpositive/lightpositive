const navList = document.querySelector(".nav__list");
const navListItem = document.querySelectorAll(".nav__list-item");
const navButton = document.querySelector(".nav__button");

navButton.addEventListener("click", () => {
  const index = { i: 0 };
  navListItem.forEach((element) => {
    index.i = index.i + 30;
    setTimeout(() => {
      element.classList.toggle("show");
    }, index.i);
  });
  navList.classList.toggle("show");
});

document.addEventListener("scroll", () => {
  navListItem.forEach((element) => {
    element.classList.remove("show");
  });
  navList.classList.remove("show");
});

window.addEventListener("resize", () => {
  navListItem.forEach((element) => {
    element.classList.remove("show");
  });
  navList.classList.remove("show");
});

const navBar = document.querySelector(".nav__container");

let prevOffset = window.pageYOffset;
document.addEventListener("scroll", () => {
  let currOffset = window.pageYOffset;
  if (prevOffset > currOffset) {
    navBar.style.top = "0px";
  } else {
    navBar.style.top = "-90px";
  }
  prevOffset = currOffset;
});
