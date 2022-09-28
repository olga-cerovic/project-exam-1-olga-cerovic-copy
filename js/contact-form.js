const form = document.querySelector("#contactForm");
const fullName = document.querySelector("#fullName");
const fullNameError = document.querySelector("#fullNameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
const button = document.querySelector("#formButton");
const formError = document.querySelector("#formError");

function checkForm(event) {
  event.preventDefault();

  if (checkLength(fullName.value, 5) === true) {
    fullNameError.style.display = "none";
  } else {
    fullNameError.style.display = "block";
  }

  if (checkLength(subject.value, 15) === true) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  if (checkEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (checkLength(message.value, 25) === true) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }

  console.log("hello");
}

form.addEventListener("submit", checkForm, validateForm);

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function checkEmail(email) {
  const emailPattern = /\S+@\S+\.\S+/;
  const patternMatches = emailPattern.test(email);
  return patternMatches;
}

function validateForm() {
  if (
    checkLength(fullName.value, 5) &&
    checkLength(subject.value, 15) &&
    checkEmail(email.value) &&
    checkLength(message.value, 25)
  ) {
    button.disabled = false;
    formError.innerHTML = "Form submited successfully.";
    snackbarForm();
  }
  console.log("hello11111");
}

function snackbarForm() {
  const snackbarForm = document.getElementById("snackbarForm");
  snackbarForm.className = "show";
  setTimeout(function () {
    snackbarForm.className = snackbarForm.className.replace("show", "");
  }, 3000);
}
