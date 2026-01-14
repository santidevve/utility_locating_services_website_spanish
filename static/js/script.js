document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    // Mobile Menu Toggle
    if (mobileMenu && navbar) {
        mobileMenu.addEventListener('click', () => {
            navbar.classList.toggle('active');

            // Hamburger animation
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
        });

        // Close menu when clicking links
        const navLinks = navbar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
            });
        });
    }

    // Scroll Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
