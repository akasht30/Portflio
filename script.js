// =====================
// Dark/Light Mode Toggle
// =====================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌞';
        localStorage.setItem('theme', 'light');
    }
}

themeToggle.addEventListener('click', toggleTheme);

// Check for saved theme preference or system preference
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '🌙';
} else {
    themeIcon.textContent = '🌞';
}

// =====================
// Carousel functionality
// =====================
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const projects = document.querySelectorAll('.project-card');
let currentIndex = 0;

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Auto-rotate carousel
function autoRotate() {
    currentIndex = (currentIndex < projects.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
}

let carouselInterval = setInterval(autoRotate, 5000);

function resetInterval() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(autoRotate, 5000);
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < projects.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
    resetInterval();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : projects.length - 1;
    updateCarousel();
    resetInterval();
});

// =====================
// Back to top button
// =====================
const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =====================
// Smooth scrolling for nav links
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// =====================
// Contact form handling
// =====================
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('⚠ Please fill out all fields before submitting.');
        return;
    }

    // Here you would normally send the form data to a server
    console.log('Form submitted:', { name, email, message });

    alert('✅ Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});