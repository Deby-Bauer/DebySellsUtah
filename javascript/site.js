// ========================================
// DebySellsUtah.com
// Site-Wide Image Protection
// ========================================

// Prevent right-click menus on photographs
document.addEventListener("contextmenu", function(event) {
    if (event.target.closest("img")) {
        event.preventDefault();
    }
});

// Prevent dragging photographs
document.addEventListener("dragstart", function(event) {
    if (event.target.closest("img")) {
        event.preventDefault();
    }
});

// ======================================
// Mobile Navigation Menu
// ======================================

function initializeMobileMenu() {
    const menuButton = document.querySelector(".menu-toggle");
    const mainMenu = document.querySelector("#main-menu");

    if (!menuButton || !mainMenu) return;

    menuButton.addEventListener("click", function() {
        const isOpen = mainMenu.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuButton.textContent = isOpen ? "×" : "≡";
    });
}

// ========================================
// Homepage Slideshow
// ============================
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function showNextSlide() {
        slides[currentSlide].classList.remove("active");

        currentSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.add("active");
    }

    let slideshowTimer;

if (slides.length > 0) {
    slideshowTimer = setInterval(showNextSlide, 7000);
}
let isPaused = false;

const hero = document.querySelector(".hero");
const toggleButton = document.querySelector(".slideshow-toggle");

function stopSlideshow() {
    clearInterval(slideshowTimer);
}

function startSlideshow() {
    clearInterval(slideshowTimer);
    slideshowTimer = setInterval(showNextSlide, 7000);
}

if (hero) {
    // Pause when the mouse enters the photograph
    hero.addEventListener("mouseenter", function() {
        stopSlideshow();
    });

    // Resume when the mouse leaves, unless manually paused
    hero.addEventListener("mouseleave", function() {
        if (!isPaused) {
            startSlideshow();
        }
    });
}


// ======================================
// Interactive FAQ Accordion
// ======================================


const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function(question) {
    question.addEventListener("click", function() {
        const answer = question.nextElementSibling;
        const wasHidden = answer.hidden;

        // Close all other answers
        faqQuestions.forEach(function(otherQuestion) {
            const otherAnswer = otherQuestion.nextElementSibling;

            otherAnswer.hidden = true;
            otherQuestion.setAttribute("aria-expanded", "false");
        });

        // Open the selected answer, unless it was already open
        answer.hidden = !wasHidden;
        question.setAttribute("aria-expanded", String(wasHidden));
    });
});


// ======================================
// Shared Website Navigation
// ======================================

async function loadNavigation() {
    const placeholder = document.querySelector("#site-navigation");

    if (!placeholder) return;

    const response = await fetch("navigation.html");
    const navigationHTML = await response.text();

placeholder.innerHTML = navigationHTML;

// Activate the hamburger menu after navigation loads
initializeMobileMenu();
initializeExploreDropdown();
}

loadNavigation();

 // ======================================
 // Explore Navigation Dropdown
 // ======================================

function initializeExploreDropdown() {
    const dropdown = document.querySelector(".nav-dropdown");
    const toggle = document.querySelector(".dropdown-toggle");

    if (!dropdown || !toggle) return;

    toggle.addEventListener("click", function() {
        const isOpen = dropdown.classList.toggle("open");

        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the dropdown when clicking outside it
    document.addEventListener("click", function(event) {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        }
    });
}


// ======================================
// Shared Website Footer
// ======================================

async function loadFooter() {
    const placeholder = document.querySelector("#site-footer");

    if (!placeholder) return;

    const response = await fetch("footer.html");
    const footerHTML = await response.text();

    placeholder.innerHTML = footerHTML;
}

loadFooter();

// ======================================
// Contact Form Validation
// ======================================

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const feedback = document.querySelector("#form-feedback");
        const name = document.querySelector("#contact-name").value.trim();

            contactForm.reset();

      const confirmationDialog = document.querySelector("#contact-confirmation");
const confirmationMessage = document.querySelector("#confirmation-message");
const closeButton = document.querySelector("#close-confirmation");

document.querySelector("#confirmation-title").textContent =
    "Thank You!";

confirmationMessage.textContent =
    `${name}, your form has been completed successfully. This is a demonstration, so your message has not been sent.`;

confirmationDialog.showModal();

closeButton.addEventListener("click", function() {
    confirmationDialog.close();
  }, { once: true });

    });
}

