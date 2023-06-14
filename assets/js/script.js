// script.js

//1. Function to handle left-panel navigation click
const leftNavItems = document.querySelectorAll('.nav-item');

leftNavItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    const targetSection = document.querySelectorAll('.right-panel section')[index];

    if (targetSection) {
      const topOffset = targetSection.offsetTop;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  });
});

//2. Funtion to handle right-panel mouse behavior
//const leftNavItems = document.querySelectorAll('.nav-item');
const rightPanel = document.querySelector('.right-panel');
const rightSections = document.querySelectorAll('.right-panel section');
let activeSection = null;

// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

// Function to update the active section and nav item
function updateActiveSection() {
  const scrollTop = window.scrollY || window.pageYOffset;

  rightSections.forEach((section, index) => {
    if (isInViewport(section) || (scrollTop === 0 && index === 0)) {
      activeSection = section;
      leftNavItems.forEach((item) => item.classList.remove('li-hover'));
      leftNavItems[index].classList.add('li-hover');
    }
  });
}

// Event listener for scrolling the right panel
window.addEventListener('scroll', updateActiveSection);

// Event listeners for mouseenter/mouseleave on the right panel sections
rightSections.forEach((section, index) => {
  section.addEventListener('mouseenter', () => {
    leftNavItems.forEach((item) => item.classList.remove('li-hover'));
    leftNavItems[index].classList.add('li-hover');
  });

  section.addEventListener('mouseleave', () => {
    if (!activeSection) {
      leftNavItems[index].classList.remove('li-hover');
    }
  });

  section.addEventListener('mousemove', (event) => {
    const sectionRect = section.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    if (
      mouseX >= sectionRect.left &&
      mouseX <= sectionRect.right &&
      mouseY >= sectionRect.top &&
      mouseY <= sectionRect.bottom
    ) {
      leftNavItems.forEach((item) => item.classList.remove('li-hover'));
      leftNavItems[index].classList.add('li-hover');
    } else if (section === activeSection) {
      leftNavItems[index].classList.remove('li-hover');
    }
  });
});

//3. typing effect for occupation
const words = ["Data Scientist | Data Analyst", "Machine Learning Engineer"]; // Array of words to cycle through
const typingSpeed = 60; // Adjust the speed (in milliseconds) at which characters are displayed
const eraseSpeed = 5; // Adjust the speed (in milliseconds) at which characters are erased
const delayBeforeErase = 2000; // Delay (in milliseconds) before erasing the word
const blinkSpeed = 500; // Adjust the speed (in milliseconds) at which the cursor blinks

const typingTextElement = document.getElementById("typing-text");

let currentWordIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let isCursorVisible = true;
let eraseTimeoutId;

function typeText() {
  const currentWord = words[currentWordIndex];

  if (isDeleting) {
    typingTextElement.textContent = currentWord.substring(0, currentCharIndex) + (isCursorVisible ? "|" : "");
    currentCharIndex--;

    if (currentCharIndex < 0) {
      isDeleting = false;
      eraseTimeoutId = setTimeout(eraseText, delayBeforeErase);
    }
  } else {
    typingTextElement.textContent = currentWord.substring(0, currentCharIndex + 1) + (isCursorVisible ? "|" : "");
    currentCharIndex++;

    if (currentCharIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(() => {
        eraseTimeoutId = setTimeout(eraseText, typingSpeed);
      }, delayBeforeErase);
      return;
    }
  }

  setTimeout(typeText, typingSpeed);
}

function eraseText() {
  const currentWord = words[currentWordIndex];

  typingTextElement.textContent = currentWord.substring(0, currentCharIndex) + (isCursorVisible ? "|" : "");
  currentCharIndex--;

  if (currentCharIndex < 0) {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    isDeleting = false;
    clearTimeout(eraseTimeoutId);
    setTimeout(typeText, typingSpeed);
  } else {
    eraseTimeoutId = setTimeout(eraseText, eraseSpeed);
  }
}

function toggleCursor() {
    isCursorVisible = !isCursorVisible;
    typingTextElement.textContent = words[currentWordIndex].substring(0, currentCharIndex) + (isCursorVisible ? "|" : "");
    setTimeout(toggleCursor, blinkSpeed);
  }

typeText();
toggleCursor();


//4. make section appear slowly
// const rightSections = document.querySelectorAll('.right-panel section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const { target, boundingClientRect } = entry;
    const topVisible = boundingClientRect.top >= 0;

    if (entry.isIntersecting) {
      target.classList.add('appear');
    } else if (!topVisible) {
      target.classList.remove('appear');
    }
  });
}, { threshold: 0 });

rightSections.forEach((section) => {
  observer.observe(section);
});
