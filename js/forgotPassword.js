document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const button = document.querySelector("button");
    const message = document.getElementById("message");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    button.disabled = true;
    button.classList.remove("active");

    function updateButtonState() {
        const email = emailInput.value.trim();
        if (emailRegex.test(email)) {
            button.disabled = false;
            button.classList.add("active");
        } else {
            button.disabled = true;
            button.classList.remove("active");
        }
    }

    emailInput.addEventListener("input", () => {
        updateButtonState();
        message.textContent = "";
        message.className = "";
    });

    emailInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (!button.disabled) {button.click();}
        }
    });

    button.addEventListener("click", (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();

        message.className = "";
        message.textContent = "";

        if (emailRegex.test(email)) {
    
            button.textContent = "Sending...";
            button.disabled = true;

            setTimeout(() => {
                message.classList.add("success");
                setTimeout(() => {
                    window.location.href = "/html/ResetPassword.html";
                })
                button.textContent = "Send Reset Link";
                emailInput.value = "";
                button.classList.remove("active");
                updateButtonState();
            }, 1500);
        }
    });
});
