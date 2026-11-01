// Mobile Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });
}

// Active Nav Link Highlighting on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a:not(.nav-btn)');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Dynamic Rotating Title Effect (Unity [Role])
const roles = [
    "Junior Developer",
    "Game Developer",
    "Gameplay Programmer",
    "XR Developer"
];

let roleIndex = 0;
const rotatingTextElement = document.getElementById('rotating-role');

if (rotatingTextElement) {
    setInterval(() => {
        rotatingTextElement.style.opacity = '0';
        rotatingTextElement.style.transform = 'translateY(8px)';
        
        setTimeout(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            rotatingTextElement.textContent = roles[roleIndex];
            rotatingTextElement.style.opacity = '1';
            rotatingTextElement.style.transform = 'translateY(0)';
        }, 300);
    }, 2000);
}

// Interactive Card Carousel for "What I Do" (10-Second Auto-Slide + Manual Click + Dots)
const track = document.getElementById('carouselTrack');
const cards = track ? Array.from(track.children) : [];
const prevBtn = document.getElementById('prevCard');
const nextBtn = document.getElementById('nextCard');
const dotsContainer = document.getElementById('carouselDots');

let currentIndex = 0;
let autoSlideInterval;

// Create dots dynamically
if (cards.length > 0 && dotsContainer) {
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToCard(index);
            resetAutoSlide(); // Reset timer when user manually interacts
        });
        dotsContainer.appendChild(dot);
    });
}

const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

function updateCarousel() {
    if (!track) return;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToCard(index) {
    currentIndex = index;
    updateCarousel();
}

function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
}

function prevCard() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
}

// Button event listeners with auto-slide reset
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextCard();
        resetAutoSlide();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevCard();
        resetAutoSlide();
    });
}

// 10-Second Auto-Slide Timer Setup
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextCard();
    }, 10000); // 10,000 ms = 10 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize auto-slide on load
if (cards.length > 0) {
    startAutoSlide();
}
