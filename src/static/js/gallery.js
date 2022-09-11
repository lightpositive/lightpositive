window.scrollTo(0, window.innerHeight);

//check dvice type for content match
let isDesktop = true;
if (
  "ontouchstart" in document.documentElement &&
  /mobi/i.test(navigator.userAgent)
) {
  isDesktop = false;
}

let currentIndex = { i: 0 };

const postContent = document
  .getElementsByClassName("post__image-extra-mobile")
  .item(0);

const scrollMobile = document
  .getElementsByClassName("post__image-selected-mobile")
  .item(0);

function getScrollIndex (e) {
  currentIndex.i = Math.round(e.target.scrollLeft / scrollMobile.clientWidth);
  alert(`scroll ${scrollMobile.clientWidth}, ${currentIndex.i}`)
}

scrollMobile.addEventListener("scroll", getScrollIndex );


let previousOrientation = window.orientation;
window.addEventListener(
  "orientationchange",
  () => {
    if(window.orientation !== previousOrientation) {
      previousOrientation = window.orientation;
      scrollMobile.removeEventListener("scroll", getScrollIndex);
      alert(`orientation ${scrollMobile.clientWidth}, ${currentIndex.i}`)


// if (window.orientation == 0 || window.orientation == 180){
//       scrollMobile.scrollTo(window.innerWidth * currentIndex.i,0);
//       alert(`zero, ${window.innerWidth}, ${currentIndex.i}, ${window.innerWidth * currentIndex.i}`)
//     } else {
//   scrollMobile.scrollTo(window.innerHeight * currentIndex.i,0);
//   alert(`non zero, ${window.innerHeight}, ${currentIndex.i}, ${window.innerHeight * currentIndex.i}`)
// }
// scrollMobile.addEventListener("scroll", getScrollIndex );

  }
  },
  false
);

// let previousSize = window.innerHeight*window.innerWidth;
// window.addEventListener(
//   "resize",
//   () => {
//     alert("resize")
//     if(window.innerHeight*window.innerWidth !== previousSize) {
//       previousSize = window.innerHeight*window.innerWidth;
//     window.scrollTo(0, window.innerHeight);
//     scrollMobile.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }
//   },
//   false
// );

let BackLink = document.createElement("a");
let buttonMid = document.createElement("button");
BackLink.setAttribute("href", "/references/festivals");
BackLink.textContent = "X";
buttonMid.className = "post__button-mid";
buttonMid.appendChild(BackLink);
postContent.appendChild(buttonMid);

if (isDesktop) {
  // scrollMobile.addEventListener("scroll", (e) => {
  //   currentIndex.i = Math.round(e.target.scrollLeft / window.innerWidth);
  // });
  // add navigation buttons
  let div1 = document.createElement("div");
  let div2 = document.createElement("div");

  let buttonLeft = document.createElement("button");
  buttonLeft.className = "post__button-left";
  buttonLeft.appendChild(div1);
  div1.textContent = "<";
  postContent.appendChild(buttonLeft);

  let buttonRight = document.createElement("button");
  buttonRight.className = "post__button-right";
  buttonRight.appendChild(div2);
  div2.textContent = ">";
  postContent.appendChild(buttonRight);

  // button navigation
  buttonRight.addEventListener("click", (e) => {
    scrollMobile.scrollBy({
      top: 0,
      left: window.innerWidth,
      behavior: "smooth",
    });
  });
  buttonLeft.addEventListener("click", (e) => {
    scrollMobile.scrollBy({
      top: 0,
      left: -window.innerWidth,
      behavior: "smooth",
    });
  });
  // hide navigation buttons
  let timer;
  let isMooseOver = false;
  timer = setTimeout(() => {
    buttonLeft.classList.add("fade");
    buttonMid.classList.add("fade");
    buttonRight.classList.add("fade");
  }, 2000);
  buttonLeft.addEventListener("mouseover", (e) => {
    isMooseOver = true;
  });
  buttonLeft.addEventListener("mouseout", (e) => {
    isMooseOver = false;
  });
  buttonRight.addEventListener("mouseover", (e) => {
    isMooseOver = true;
  });
  buttonRight.addEventListener("mouseout", (e) => {
    isMooseOver = false;
  });
  buttonMid.addEventListener("mouseover", (e) => {
    isMooseOver = true;
  });
  buttonMid.addEventListener("mouseout", (e) => {
    isMooseOver = false;
  });
  scrollMobile.addEventListener("click", (e) => {
    buttonLeft.classList.remove("fade");
    buttonMid.classList.remove("fade");
    buttonRight.classList.remove("fade");
    clearTimeout(timer);
    timer = setTimeout(() => {
      buttonLeft.classList.add("fade");
      buttonMid.classList.add("fade");
      buttonRight.classList.add("fade");
    }, 2000);
  });
  const mouse = window.addEventListener("mousemove", (e) => {
    buttonLeft.classList.remove("fade");
    buttonMid.classList.remove("fade");
    buttonRight.classList.remove("fade");
    if (isMooseOver) {
      clearTimeout(timer);
      buttonLeft.classList.remove("fade");
      buttonMid.classList.remove("fade");
      buttonRight.classList.remove("fade");
    }
    if (!isMooseOver) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        buttonLeft.classList.add("fade");
        buttonMid.classList.add("fade");
        buttonRight.classList.add("fade");
      }, 2000);
    }
  });
}
