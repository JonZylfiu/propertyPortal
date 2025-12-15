const signUp = document.getElementById("signUp");
const signIn = document.getElementById("signIn");
const container = document.getElementById("container");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginEmailError = document.getElementById("loginEmailError");
const loginPasswordError = document.getElementById("loginPasswordError");
const loginSuccess = document.getElementById("loginSuccess");

const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupNameError = document.getElementById("signupNameError");
const signupEmailError = document.getElementById("signupEmailError");
const signupPasswordError = document.getElementById("signupPasswordError");
const signupSuccess = document.getElementById("signupSuccess");

/* TOGGLE */
signUp.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signIn.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

/* LOGIN */
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    loginEmailError.textContent = "";
    loginPasswordError.textContent = "";
    loginSuccess.textContent = "";

    if (loginEmail.value === "") {
        loginEmailError.textContent = "Email is required";
        return;
    }

    if (loginPassword.value === "") {
        loginPasswordError.textContent = "Password is required";
        return;
    }

    loginSuccess.textContent = "Login successful";
    loginForm.reset();
});

/* SIGN UP */
signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    signupNameError.textContent = "";
    signupEmailError.textContent = "";
    signupPasswordError.textContent = "";
    signupSuccess.textContent = "";

    if (signupName.value === "") {
        signupNameError.textContent = "Name is required";
        return;
    }

    if (signupEmail.value === "") {
        signupEmailError.textContent = "Email is required";
        return;
    }

    if (signupPassword.value.length < 6) {
        signupPasswordError.textContent = "Password must be at least 6 characters";
        return;
    }

    signupSuccess.textContent = "Account created successfully";
    signupForm.reset();
});
