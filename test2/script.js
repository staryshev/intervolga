let form = document.getElementById("form");
let formInputs = document.querySelectorAll(".js-input");

document.querySelector("#show-form").addEventListener("click", function () {
  document.querySelector(".popup").classList.add("active");
});

document
  .querySelector(".popup .close-btn")
  .addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
  });

document.querySelector(".button-cancel").addEventListener("click", function () {
  document.querySelector(".popup").classList.remove("active");
});

function setInputs() {
  formInputs.forEach((el) => {
    if (localStorage.getItem(el.id)) el.value = localStorage.getItem(el.id);
  });
}

setInputs();

function changeValue(element) {
  localStorage.setItem(element.id, element.value);
}

function checkValidation(element) {
  element.classList.remove("error");
  if (element.value === "") {
    element.classList.add("error");
    return false;
  }
  if (element.id === "state number") {
    let re = /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/;
    if (!re.test(element.value.toUpperCase())) {
      element.classList.add("error");
      return false;
    }
  }
  if (element.id === "passport-series") {
    if (element.value.length != 4) {
      element.classList.add("error");
      return false;
    }
  }
  if (element.id === "passport-number") {
    if (element.value.length != 6) {
      element.classList.add("error");
      return false;
    }
  }
  return true;
}

function checkValidationAll() {
  let returnValue = true;
  formInputs.forEach((el) => {
    if (!checkValidation(el)) returnValue = false;
  });
  return returnValue;
}

form.onsubmit = function () {
  return checkValidationAll();
};
