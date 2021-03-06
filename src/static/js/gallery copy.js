window.scrollTo(0, window.innerHeight);

//check dvice type for content match
let isDesktop = true;
if (
  "ontouchstart" in document.documentElement &&
  /mobi/i.test(navigator.userAgent)
) {
  isDesktop = false;
}
//definie image resolutions for srcset
let lowRes = "w_256";
let midRes = "w_512";
let hiRes = "w_1024";

let allImage = document.querySelectorAll(".post__image-mobile");

const postContent = document
  .getElementsByClassName("post__image-extra-mobile")
  .item(0);

// create
let preUrl = "https://res.cloudinary.com/lightpositive/image/upload/";
let allImageSrc = [];
let allImageSrcMid = [];
let allImageSrcHi = [];
let currentIndex = { i: 0 };
// let img = document.createElement("img");
allImage.forEach((element) => {
  let src = element.getAttribute("src");
  // let matched = src.match(/upload\/(?:v\d+\/)?([^\.]+)/);
  let matched = src.match(/upload\/(?:v\d+\/)([^]+)\.(?!.*\.)/);
  let srcNew = preUrl.concat(lowRes, "/", matched[1]);
  allImageSrc = [...allImageSrc, srcNew];
  let srcNewMid = preUrl.concat(midRes, "/", matched[1]);
  allImageSrcMid = [...allImageSrcMid, srcNewMid];
  let srcNewHi = preUrl.concat(hiRes, "/", matched[1]);
  allImageSrcHi = [...allImageSrcHi, srcNewHi];
  let srcNewFull = preUrl.concat(matched[1]);
  allImageSrcFull = [...allImageSrcFull, srcNewFull];
  element.setAttribute("src", srcNew);
  element.setAttribute(
    "srcset",
    `${srcNew} 256w, ${srcNewMid} 512w, ${srcNewHi} 1024w, ${srcNewFull} 1280w,`
  );
});

const scrollMobile = document
  .getElementsByClassName("post__image-selected-mobile")
  .item(0);

window.addEventListener(
  "resize orientationchange",
  () => {
    // newWidth = window.innerWidth
    window.scrollTo(0, window.innerHeight);
    scrollMobile.scrollTo({
      top: 0,
      left: window.innerWidth * currentIndex.i,
      behavior: "smooth",
    });
  },
  false
);

let BackLink = document.createElement("a");
let buttonMid = document.createElement("button");
BackLink.setAttribute("href", "/references/festivals");
BackLink.textContent = "X";
buttonMid.className = "post__button-mid";
buttonMid.appendChild(BackLink);
postContent.appendChild(buttonMid);

if (isDesktop) {
  scrollMobile.addEventListener("scroll", (e) => {
    currentIndex.i = Math.round(e.target.scrollLeft / window.innerWidth);
  });
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
