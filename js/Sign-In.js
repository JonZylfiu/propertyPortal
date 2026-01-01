const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.onclick = () => container.classList.add("right-panel-active");
signInButton.onclick = () => container.classList.remove("right-panel-active");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9+\s]+$/;

document.getElementById("signupForm").addEventListener("submit", function (e) {
    let valid = true;

    const email = signupEmail.value;
    const phone = signupPhone.value;
    const password = signupPassword.value;
    const confirm = signupConfirmPassword.value;

    signupEmailError.textContent = "";
    signupPhoneError.textContent = "";
    signupPasswordError.textContent = "";
    signupConfirmPasswordError.textContent = "";

    if (!emailRegex.test(email)) {
        signupEmailError.textContent = "Invalid email format.";
        valid = false;
    }

    if (!phoneRegex.test(phone)) {
        signupPhoneError.textContent = "Invalid phone number.";
        valid = false;
    }

    if (password.length < 8) {
        signupPasswordError.textContent = "Password must be at least 8 characters.";
        valid = false;
    }

    if (password !== confirm) {
        signupConfirmPasswordError.textContent = "Passwords do not match.";
        valid = false;
    }

    if (!valid) e.preventDefault();
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
    let valid = true;

    loginEmailError.textContent = "";
    loginPasswordError.textContent = "";

    if (!emailRegex.test(loginEmail.value)) {
        loginEmailError.textContent = "Invalid email.";
        valid = false;
    }

    if (loginPassword.value.length < 8) {
        loginPasswordError.textContent = "Password must be at least 8 characters.";
        valid = false;
    }

    if (!valid) e.preventDefault();
});
