function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
  const themeButtons = document.querySelectorAll(".theme-btn");

  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-theme");
      document.body.className = ""; // Reset all themes

      if (theme === "light") {
        document.body.classList.add("light-theme");
      } else if (theme === "dark") {
        document.body.classList.add("dark-theme");
      }
      // No class for plain → default white
    });
  });
});


window.addEventListener("scroll", () => {
  const profileSection = document.getElementById("profile");
  const sidebar = document.querySelector(".theme-sidebar");
  const profileTop = profileSection.offsetTop;
  const profileHeight = profileSection.offsetHeight;
  const scrollY = window.scrollY;

  if (scrollY >= profileTop && scrollY < profileTop + profileHeight) {
    sidebar.classList.add("active");
  } else {
    sidebar.classList.remove("active");
  }
});



// ✅ Scroll Reveal
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// about container
ScrollReveal().reveal(".about-details-container .about-containers", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about-details-container .text-container", {
  ...scrollRevealOption,
  delay: 1000,
});

// experience container
ScrollReveal().reveal(".experience-details-container .about-containers", {
  ...scrollRevealOption,
  interval: 500,
});

// skills hover effect
document.querySelectorAll(".skill").forEach((skill) => {
  skill.addEventListener("mouseover", () => {
    skill.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
  });

  skill.addEventListener("mouseout", () => {
    skill.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress-bar > div");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute("style").match(/width:\s*(\d+)%/)[1];
        entry.target.style.width = "0%";
        setTimeout(() => {
          entry.target.style.width = width + "%";
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  progressBars.forEach(bar => observer.observe(bar));
});


const roles = [
  "Frontend Developer",
  "Python Developer",
  "Full Stack Developer",
  "..................???????",
  "And Everything In Between"
];

const images = {
  "Frontend Developer": "assets/illustrations/c1.svg",
  "Python Developer": "assets/illustrations/c2.svg",
  "Full Stack Developer": "assets/illustrations/c3.svg",
  "And Everything In Between": "assets/illustrations/final.svg"
};

const typedText = document.getElementById("typed-text");
const roleImage = document.getElementById("role-image");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentRole = roles[roleIndex];
  let displayText = currentRole.substring(0, charIndex);
  typedText.textContent = displayText;

  if (!isDeleting && charIndex < currentRole.length) {
    charIndex++;
    setTimeout(typeEffect, typingSpeed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 50);
  } else {
    if (!isDeleting) {
      if (currentRole === "..................???????") {
        cycleMysteryImages(() => {
          roleIndex++;
          charIndex = 0;
          setTimeout(typeEffect, 1000);
        });
        return;
      } else {
        updateImage(currentRole);
        setTimeout(() => {
          isDeleting = true;
          typeEffect();
        }, 1500);
      }
    } else {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 300);
    }
  }
}

function updateImage(role) {
  if (images[role]) {
    roleImage.src = images[role];
  }
}

// For "..........???......." — cycles quickly between mystery images
function cycleMysteryImages(callback) {
  const mysteryImages = [
    "assets/illustrations/mystery1.svg",
    "assets/illustrations/mystery2.svg",
    "assets/illustrations/mystery3.svg"
  ];

  let i = 0;
  const total = mysteryImages.length;
  const interval = setInterval(() => {
    roleImage.src = mysteryImages[i];
    i++;
    if (i >= total + 1) {
      clearInterval(interval);
      roleImage.src = "assets/illustrations/final.svg";
      callback(); // Continue typing
    }
  }, 300); // Speed of mystery image cycling
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});


