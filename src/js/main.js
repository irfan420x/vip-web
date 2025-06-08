// DOM Elements
const navbarContainer = document.getElementById('navbar-container');
const footerContainer = document.getElementById('footer-container');

// Load Components
function loadComponents() {
    if (navbarContainer) {
        navbarContainer.innerHTML = await fetch('../components/navbar.html')
            .then(res => res.text());
    }
    
    if (footerContainer) {
        footerContainer.innerHTML = await fetch('../components/footer.html')
            .then(res => res.text());
    }
}

// Theme Toggle
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
    
    // Toggle theme
    themeToggle?.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// GSAP Animations
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero animation
    gsap.from('.hero-title, .hero-subtitle, .hero-text', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out"
    });
    
    // Skill cards animation
    gsap.from('.skill-card', {
        scrollTrigger: {
            trigger: '.skills',
            start: "top 80%"
        },
        y: 100,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out"
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', async () => {
    await loadComponents();
    initTheme();
    initMobileMenu();
    
    // Set current year in footer
    document.getElementById('current-year')?.textContent = new Date().getFullYear();
    
    // Initialize animations after components are loaded
    if (typeof gsap !== 'undefined') {
        initAnimations();
    }
});
