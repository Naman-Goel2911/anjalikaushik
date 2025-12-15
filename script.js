// ==========================================
// SPLASH SCREEN AND TYPEWRITER EFFECT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter');
    const text = "How are you feeling?";
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        } else {
            // Wait 2 seconds then fade out splash screen
            setTimeout(function() {
                const splashScreen = document.getElementById('splash-screen');
                const mainContent = document.getElementById('main-content');

                splashScreen.classList.add('fade-out');
                setTimeout(function() {
                    splashScreen.style.display = 'none';
                    mainContent.classList.add('show');

                    // Initialize carousel after main content is shown
                    initializeCarousel();
                }, 500);
            }, 2000);
        }
    }

    // Start typewriter effect after 1 second
    setTimeout(typeWriter, 1000);
});

// ==========================================
// MOBILE NAVIGATION
// ==========================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==========================================
// SMOOTH SCROLLING
// ==========================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animation classes
const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up');
animatedElements.forEach(element => {
    observer.observe(element);
});

// ==========================================
// STICKY NAVBAR
// ==========================================

let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('hidden');
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else if (currentScroll < lastScroll) {
        // Scrolling up
        navbar.classList.remove('hidden');
    }

    lastScroll = currentScroll;
});

// ==========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ==========================================

window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// TESTIMONIALS CAROUSEL
// ==========================================

let currentSlide = 0;
let testimonialCards = [];
let dots = [];

function initializeCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Get all testimonial cards
    testimonialCards = Array.from(carouselTrack.querySelectorAll('.testimonial-card'));

    // Create dots for each testimonial
    testimonialCards.forEach((card, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
        dots.push(dot);
    });

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', previousSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-play carousel
    setInterval(nextSlide, 5000);

    // Touch/Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            previousSlide();
        }
    }

    // Show first slide
    updateCarousel();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    updateCarousel();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');

    // Move carousel track
    const translateValue = -currentSlide * 100;
    carouselTrack.style.transform = `translateX(${translateValue}%)`;

    // Update card active states
    testimonialCards.forEach((card, index) => {
        if (index === currentSlide) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });

    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// ==========================================
// KEYBOARD NAVIGATION FOR CAROUSEL
// ==========================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        previousSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// ==========================================
// FORM SUBMISSION HANDLING
// NOTE: FormSubmit handles the actual submission
// This code is just for basic client-side validation
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic client-side validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!name || !email) {
                e.preventDefault();
                alert('Please fill in all required fields (Name and Email).');
                return false;
            }

            // If validation passes, FormSubmit will handle the rest
            // The form will submit naturally to FormSubmit's endpoint
        });
    }
});