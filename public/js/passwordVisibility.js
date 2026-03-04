document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirmPassword");
  const passwordHint = document.getElementById("passwordHint");
  const confirmHint = document.getElementById("confirmHint");
  const toggleButtons = document.querySelectorAll(".toggle-pw");

  // toggle password (works on both login and register pages)
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const input = button.closest(".input-wrap").querySelector("input");
      const icon = button.querySelector(".material-icons");

      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      icon.textContent = isHidden ? "visibility_off" : "visibility";
    });
  });

  // validation only for register page
  if (passwordInput && passwordHint) {
    passwordInput.addEventListener("input", () => {
      const val = passwordInput.value;

      if (val.length === 0) {
        passwordHint.innerHTML = "";
        passwordInput.classList.remove("valid", "invalid");
      } else if (val.length < 8) {
        passwordHint.innerHTML =
          '<span class="material-icons">close</span> At least 8 characters required';
        passwordHint.className = "field-hint error";
        passwordInput.classList.add("invalid");
        passwordInput.classList.remove("valid");
      } else {
        passwordHint.innerHTML =
          '<span class="material-icons">check</span> Looks good!';
        passwordHint.className = "field-hint success";
        passwordInput.classList.add("valid");
        passwordInput.classList.remove("invalid");
      }

      if (confirmInput && confirmInput.value.length > 0) {
        checkConfirm();
      }
    });
  }

  if (confirmInput && confirmHint) {
    confirmInput.addEventListener("input", checkConfirm);
  }

  function checkConfirm() {
    if (!confirmInput || !confirmHint || !passwordInput) return;

    if (confirmInput.value.length === 0) {
      confirmHint.innerHTML = "";
      confirmInput.classList.remove("valid", "invalid");
      return;
    }

    if (confirmInput.value !== passwordInput.value) {
      confirmHint.innerHTML =
        '<span class="material-icons">close</span> Passwords do not match';
      confirmHint.className = "field-hint error";
      confirmInput.classList.add("invalid");
      confirmInput.classList.remove("valid");
    } else {
      confirmHint.innerHTML =
        '<span class="material-icons">check</span> Passwords match';
      confirmHint.className = "field-hint success";
      confirmInput.classList.add("valid");
      confirmInput.classList.remove("invalid");
    }
  }
});
