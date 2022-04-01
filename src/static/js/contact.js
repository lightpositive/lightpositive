const submitButton = document.getElementById("form__submit--input");

submitButton.addEventListener("mouseover", (event) => {
    if (!grecaptcha.getResponse().length > 0) {
      submitButton.title = "Jelölje be az alábbi jelölömezőt is!";
    } else {
      submitButton.title = "";
    }
    });

submitButton.addEventListener("click", (event) => {
  if (typeof grecaptcha === "object") {
    if (!grecaptcha.getResponse().length > 0) {
      event.preventDefault()
  }
  } else {
    console.log("Works only when deployed.");
  }
});
