function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}


const words = ["Developer", "UI/UX Designer", "Freelancer"];
let currentIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenWords = 2000;
const delayAfterComplete = 1000;

function type() {
    const wordElement = document.getElementById("changingWord");
    const currentWord = words[currentIndex];
    if (!isDeleting && charIndex < currentWord.length) {
        wordElement.textContent += currentWord.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        wordElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(type, deletingSpeed);
    } else if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, delayAfterComplete);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % words.length;
        setTimeout(type, typingSpeed);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, typingSpeed);
});
