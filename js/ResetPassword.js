const inputs = document.querySelectorAll(".code-inputs input");
const verifyBtn = document.getElementById("verifyBtn");
const resendBtn = document.getElementById("resendCode");
const resendMessage = document.getElementById("resendMessage");
const errorMessage = document.getElementById("errorMessage");

verifyBtn.disabled = true;

inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        input.value = input.value.replace(/[^0-9]/g, "");

        if(input.value && index < inputs.length - 1){
            inputs[index + 1].focus();
        }
        checkInputs();
        hideMessages();
    });

    input.addEventListener("keydown", (e) => {
        if(e.key === "Backspace" && !input.value && index > 0){
            inputs[index - 1].focus();
        }
    });
});

function checkInputs(){
    const allFilled = [...inputs].every(input => input.value !== "");
    verifyBtn.disabled = !allFilled;
    verifyBtn.classList.toggle("active", allFilled);
}

function hideMessages(){
    errorMessage.style.display = "none";
    resendMessage.style.display = "none";
}

document.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !verifyBtn.disabled) {
            e.preventDefault();
            verifyBtn.click();
        }
    });

verifyBtn.addEventListener("click", () => {
    const code = [...inputs].map(input => input.value).join("");
    const correctCode = "123456";

    if(code === correctCode){
        hideMessages();
        resendMessage.textContent = "Verification successful!";
        resendMessage.style.display = "block";
        setTimeout(() => {
        window.location.href = "/html/newPassword.html";
    }, 2000);
    }else{
        errorMessage.textContent = "The code you entered is incorrect. Please try again.";
        errorMessage.style.display = "block";
    }
});

resendBtn.addEventListener("click", (e) => {
    e.preventDefault();


    resendMessage.textContent = "A new code has been sent to your email";
    resendMessage.style.display = "block";

    inputs.forEach(input => input.value = "");
    inputs[0].focus();
    checkInputs();
});

