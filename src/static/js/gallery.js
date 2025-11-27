window.scrollTo(0, window.innerHeight);

//check dvice type for content match
let hasTouchScreen = false;
if ("maxTouchPoints" in navigator) {
  hasTouchScreen = navigator.maxTouchPoints > 0;
} else if ("msMaxTouchPoints" in navigator) {
  hasTouchScreen = navigator.msMaxTouchPoints > 0;
} else {
  const mQ = matchMedia?.("(pointer:coarse)");
  if (mQ?.media === "(pointer:coarse)") {
    hasTouchScreen = !!mQ.matches;
  } else if ("orientation" in window) {
    hasTouchScreen = true; // deprecated, but good fallback
  } else {
    // Only as a last resort, fall back to user agent sniffing
    const UA = navigator.userAgent;
    hasTouchScreen =
      /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
      /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
  }
}



// let currentIndex = { i: 0 };
let currentIndex = 0;


const postContent = document
  .getElementsByClassName("post__image-extra-mobile")
  .item(0);

const scrollMobile = document
  .getElementsByClassName("post__image-selected-mobile")
  .item(0);

// let previousIndex = Math.round(scrollMobile.clientWidth/scrollMobile.clientHeight);

function getScrollIndex (e) {
  currentIndex = Math.round(e.target.scrollLeft / scrollMobile.clientWidth);
  // console.log(`scroll ${Math.ceil{e.target.scrollLeft}}, ${scrollMobile.clientWidth}, ${scrollMobile.clientHeight}, ${currentIndex}`)
  // alert(`scroll ${Math.ceil(e.target.scrollLeft)}, ${scrollMobile.clientWidth}, ${scrollMobile.clientHeight}, ${currentIndex}`)
}

scrollMobile.addEventListener("scroll", getScrollIndex );


// let previousOrientation = window.orientation;
// window.addEventListener(
//   "orientationchange",
//   () => {
//     // previousIndex = currentIndex
//     if(window.orientation !== previousOrientation) {
//       previousOrientation = window.orientation;

      
//       // alert(`orientation ${scrollMobile.clientWidth}, ${currentIndex.i}`)

// if (window.orientation == 0 || window.orientation == 180) {

//       // alert(`scroll ${scrollMobile.clientWidth}, ${currentIndexWidth}, ${currentIndexHeight}`)
//       // alert(`zero, ${window.innerWidth}, ${currentIndex.i}, ${window.innerWidth * currentIndex.i}`)
//       setTimeout(() => {
//         scrollMobile.scrollTo(scrollMobile.clientWidth * Math.round(currentIndex*0.7) ,0);
//         alert(`scroll to ${scrollMobile.clientWidth}, ${scrollMobile.clientHeight}, ${currentIndex}, ${Math.round(currentIndex*0.7)}`)
//       }, 1000);
//     } else {
//       scrollMobile.scrollTo(scrollMobile.clientWidth * currentIndex,0);
//   // scrollMobile.scrollTo(scrollMobile.clientHeight * previousIndex,0);
//   // alert(`scroll ${scrollMobile.clientHeight}, ${currentIndexHeight}, ${currentIndexWidth}`)
//   // alert(`non zero, ${window.innerHeight}, ${currentIndex.i}, ${window.innerHeight * currentIndex.i}`)
// }
// }
// // scrollMobile.addEventListener("scroll", getScrollIndex );
// // scrollMobile.removeEventListener("scroll", getScrollIndex);
//   },
//   false
// );

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
let currentUrl = "/references/festivals"
if (window.location.href.includes("corporate")) currentUrl = "/references/corporate/"

let BackLink = document.createElement("a");
let buttonMid = document.createElement("button");
BackLink.setAttribute("href", currentUrl);
BackLink.textContent = "X";
buttonMid.className = "post__button-mid";
buttonMid.appendChild(BackLink);
postContent.appendChild(buttonMid);


if (!hasTouchScreen) {
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

// key navigation
document.addEventListener('keydown', (e) => {
  if (e.key === "ArrowRight") {
    e.preventDefault();
    scrollMobile.scrollBy({
      top: 0,
      left: window.innerWidth,
      behavior: "smooth",
    });
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    scrollMobile.scrollBy({
      top: 0,
      left: -window.innerWidth,
      behavior: "smooth",
    });
  } else if (e.key === "Escape") {
    // Don't prevent default on Escape - allow fullscreen exit
    window.location = '../';
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    window.location = '../';
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    window.location = '../';
  }
});


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
