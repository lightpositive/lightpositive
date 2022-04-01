const languagePicker = document.querySelector(".aboutus__language-picker");
const huSw = document.querySelector(".hu-sw");
const enSw = document.querySelector(".en-sw");
const hu = document.querySelectorAll(".hu");
const en = document.querySelectorAll(".en");
languagePicker.addEventListener("click", () => {
  hu.forEach((element) => {element.classList.toggle("hideHu")});
  en.forEach((element) => {element.classList.toggle("showEn")});
  huSw.classList.contains("orangeGrey") ? huSw.classList.remove("orangeGrey") : huSw.classList.add("orangeGrey");
  enSw.classList.contains("orangeGrey") ? enSw.classList.remove("orangeGrey") : enSw.classList.add("orangeGrey");
})
