const counters = document.querySelectorAll(".counter");
const speed = 200;

const runCounter = (counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const inc = target / speed;
    if (count < target) {
      // Add inc to count and output in counter
      counter.innerText = count + inc;
      // Call function every ms
      setTimeout(updateCount, 1);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.innerText = "0"; // Reset the counter
        runCounter(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

counters.forEach((counter) => {
  observer.observe(counter);
});

//steps cards

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".steps-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Reset the card's state before applying the animation
          entry.target.style.opacity = "0";
          entry.target.style.transform = "translateY(-50px)";

          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 200);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });
});

//login form
const showPopupLink = document.querySelector("#login-link");
const getStartedBtn = document.querySelector(".get-started-btn");
const formPopup = document.querySelector(".form-popup");
const blurOverlay = document.querySelector(".blur-bg-overlay");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");
const signupForm = formPopup.querySelector(".signup form");
const passwordInput = document.querySelector("#signup-password");
const verifyPasswordInput = document.querySelector("#verify-password");
const passwordError = document.querySelector("#password-error");
const verifyError = document.querySelector("#verify-error");
const signupButton = signupForm.querySelector("button[type='submit']");

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{6,}$/;
  return passwordRegex.test(password);
}

// Show login popup
showPopupLink.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.toggle("show-popup");
  formPopup.classList.remove("show-signup");
});
getStartedBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.toggle("show-popup");
  formPopup.classList.add("show-signup");
});

hidePopupBtn.addEventListener("click", () => {
  document.body.classList.toggle("show-popup");
});

signupLoginLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    formPopup.classList[link.id === "signup-link" ? "add" : "remove"](
      "show-signup"
    );
  });
});
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const password = passwordInput.value;
  const verifyPassword = verifyPasswordInput.value;
  let isValid = true;
  passwordError.style.display = "none";
  verifyError.style.display = "none";
  if (!validatePassword(password)) {
    passwordError.textContent =
      "Password must contain at least 1 uppercase, 1 lowercase letter, 1 digit, and no spaces.";
    passwordError.style.display = "block";
    isValid = false;
  }
  if (password !== verifyPassword) {
    verifyError.textContent = "Passwords do not match. Please try again.";
    verifyError.style.display = "block";
    isValid = false;
  }
  if (isValid) {
    alert("Signup successful!");
    signupForm.submit();
  }
});
