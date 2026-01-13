document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    // Mobile Menu Toggle
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // Validating image paths for the user experience (optional debug helper)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            console.error('Error loading image:', this.src);
            // Fallback (for development to see boundaries even if image missing)
            this.style.border = "1px solid red";
            this.alt += " (Image not found)";
        };
    });
});
