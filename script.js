//menu

const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".close-icon");
const navmenu = document.querySelector(".navmenu");
const menuItems = document.querySelectorAll(".navmenu li");

function toggleMenu() {
  if (hamburger.style.visibility === "visible") {
    hamburger.style.visibility = "hidden";
    closeIcon.style.visibility = "visible";
    navmenu.classList.add("active");

    document.addEventListener("click", function closeMenu(event) {
      if (!event.target.closest(".navmenu") && !event.target.closest(".hamburger")) {
        closeIcon.style.visibility = "hidden";
        hamburger.style.visibility = "visible";
        navmenu.classList.remove("active");
        document.removeEventListener("click", closeMenu);
      }
    });
  } else {
    closeIcon.style.visibility = "hidden";
    hamburger.style.visibility = "visible";
    navmenu.classList.remove("active");
  }
}

hamburger.addEventListener("click", toggleMenu);
closeIcon.addEventListener("click", toggleMenu);

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    toggleMenu();
  });
});

// sign-up form
function validateInput(inputField, errorElement, errorMessage, validationRegex) {
  const inputValue = inputField.value.trim();
  if (inputValue === "") {
    showErrorMessage(inputField, errorElement, errorMessage);
  } else if (!validationRegex.test(inputValue)) {
    showErrorMessage(inputField, errorElement, errorMessage)
  } else {
    hideErrorMessage(inputField, errorElement);
  }
}

function showErrorMessage(inputField, errorElement, message) {
  errorElement.textContent = message;
  errorElement.classList.add("visible");
  inputField.style.border = "1px solid var(--red)";
  inputField.style.borderRadius = "6px"
}

function hideErrorMessage(inputField, errorElement) {
  errorElement.textContent = "";
  errorElement.classList.remove("visible");
  inputField.style.border = "none";
}

// username validation

const usernameInput = document.getElementById("username");
const userMessage = document.getElementById("user-error");
const usernameRegex = /^[a-zA-Z0-9_]{5,}$/;
usernameInput.addEventListener("blur", () => {
  validateInput(usernameInput, userMessage, "Username must have at least 5 characters!", usernameRegex);
});
usernameInput.addEventListener("input", () => {
  hideErrorMessage(usernameInput, userMessage);
});

// e-mail validation

const emailInput = document.getElementById("email");
const emailMessage = document.getElementById("email-error");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
emailInput.addEventListener("blur", () => {
  validateInput(emailInput, emailMessage, "Invalid e-mail address format!", emailRegex)
});
emailInput.addEventListener("input", () => {
  hideErrorMessage(emailInput, emailMessage);
});

// hide and show password

const passwordInputs = document.querySelectorAll("input[type='password']");
const passwordIcons = document.querySelectorAll(".password-icon");

passwordIcons.forEach((icon, index) => {
  icon.addEventListener("click", () => {
    const passwordField = passwordInputs[index];
    const passwordIcon = passwordIcons[index];
    togglePasswordVisibility(passwordField, passwordIcon);
  });
});

function togglePasswordVisibility(passwordField, passwordIcon) {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    passwordIcon.classList.remove("bx-hide");
    passwordIcon.classList.add("bx-show");
  } else {
    passwordField.type = "password";
    passwordIcon.classList.remove("bx-show");
    passwordIcon.classList.add("bx-hide");
  }
}

// password validation

const passwordInput = document.getElementById("password");
const passwordMessage = document.getElementById("pass-error");
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // 8 characters, lower and upper case letters, numbers
passwordInput.addEventListener("blur", () => {
  validateInput(passwordInput, passwordMessage, "Password must contain at least 8 characters, lower and upper case letters, and numbers!", passwordRegex);
});
passwordInput.addEventListener("input", () => {
  hideErrorMessage(passwordInput, passwordMessage);
});

// password match check

function passwordMatchCheck(passwordInput, confirmPasswordInput, errorMessageElement) {
  const passwordValue = passwordInput.value.trim();
  const confirmPasswordValue = confirmPasswordInput.value.trim();

  if (passwordValue === "" || confirmPasswordValue === "") {
    showErrorMessage(confirmPasswordInput, errorMessageElement, "Please fill in both password fields!");
  } else if (passwordValue !== confirmPasswordValue) {
    showErrorMessage(confirmPasswordInput, errorMessageElement, "Passwords don't match!");
  } else {
    hideErrorMessage(confirmPasswordInput, errorMessageElement);
  }
}

const passwordInputField = document.getElementById("password");
const confirmPasswordInputField = document.getElementById("confirm-password");
const confirmPasswordMessage = document.getElementById("confirm-pass-error");

confirmPasswordInputField.addEventListener("blur", () => {
  passwordMatchCheck(passwordInputField, confirmPasswordInputField, confirmPasswordMessage);
});
confirmPasswordInputField.addEventListener("input", () => {
  hideErrorMessage(confirmPasswordInputField, confirmPasswordMessage);
});

document.getElementById("submitButton").addEventListener("click", function(event) {
  event.preventDefault();

  validateInput(usernameInput, userMessage, "Username must have at least 5 characters!", usernameRegex);
  validateInput(emailInput, emailMessage, "Invalid e-mail address format!", emailRegex);
  validateInput(passwordInput, passwordMessage, "Password must contain at least 8 characters, lower and upper case letters, and numbers!", passwordRegex);
  passwordMatchCheck(passwordInput, confirmPasswordInputField, confirmPasswordMessage);
});

// scroll up

const backToTop = document.getElementById("up-icon");
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// light/dark switch

const themeToggle = document.getElementById("switch");
const body = document.body;

themeToggle.addEventListener("click", function() {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    themeToggle.classList.remove("bx-toggle-left");
    themeToggle.classList.add("bx-toggle-right");
  } else {
    themeToggle.classList.remove("bx-toggle-right");
    themeToggle.classList.add("bx-toggle-left");
  }
});