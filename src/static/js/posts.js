let lowRes = "w_400";
let allImage = document.querySelectorAll(".posts__image-cover");

let preUrl = "https://res.cloudinary.com/lightpositive/image/upload/";
let allImageSrc = [];
let allImageSrcMid = [];
let allImageSrcHi = [];
let currentIndex = { i: 0 };
allImage.forEach((element) => {
  let src = element.getAttribute("src");
  let matched = src.match(/upload\/(?:v\d+\/)([^]+)\.(?!.*\.)/);
  let srcNew = preUrl.concat(lowRes, "/", matched[1]);
  allImageSrc = [...allImageSrc, srcNew];
  element.setAttribute("src", srcNew);
});
