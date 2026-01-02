const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const saveBtn = document.getElementById("saveBtn");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");
const lengthRule = document.getElementById("length");
const numberRule = document.getElementById("number");
const uppercaseRule = document.getElementById("uppercase");

function validatePassword(){
    const value = newPassword.value;

    const hasLength = value.length >= 8;
    const hasNumber = /\d/.test(value);
    const hasUppercase = /[A-Z]/.test(value);

    lengthRule.classList.toggle("valid", hasLength);
    numberRule.classList.toggle("valid", hasNumber);
    uppercaseRule.classList.toggle("valid", hasUppercase);

    const passwordsMatch = value === confirmPassword.value;

    saveBtn.disabled = !(hasLength && hasNumber && hasUppercase && passwordsMatch);
    saveBtn.classList.toggle("active", !saveBtn.disabled);
}

document.addEventListener("keydown", (e) => {
    if( e.key === 'Enter'){
        e.preventDefault();
        saveBtn.click();
    }
})

newPassword.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validatePassword);

saveBtn.addEventListener("click", () => {
    errorMessage.textContent = "";
    successMessage.textContent = "";

    if(newPassword.value !== confirmPassword.value){
        errorMessage.textContent = "Passwords do not match.";
        return;
    }

    successMessage.textContent = "Password changed successfully! Redirecting...";

    setTimeout(() => {
        window.location.href = "/html/login.html";
    }, 2000);
});
