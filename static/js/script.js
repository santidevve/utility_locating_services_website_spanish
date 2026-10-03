/**
 * Utility Locating Services R&F - Motion Design & Interactive Engine
 * Adheres to LottieFiles Motion Design Spec:
 * - Decelerated easing, 60fps/120fps GPU pipelines, staggered entrances
 * - Interactive Subsurface Radar GPR Simulator
 * - Numerical counter ticker with ease-out
 * - Card 3D tilt micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Menú Hamburguesa & Drawer Off-Canvas Moderno
    // -------------------------------------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const drawerNav = document.getElementById('drawer-navigation');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerClose = document.getElementById('drawer-close');

    function openDrawer() {
        if (drawerNav && drawerOverlay) {
            drawerNav.classList.add('active');
            drawerOverlay.classList.add('active');
            if (menuToggle) {
                menuToggle.classList.add('active');
                menuToggle.setAttribute('aria-expanded', 'true');
            }
            document.body.style.overflow = 'hidden';
        }
    }

    function closeDrawer() {
        if (drawerNav && drawerOverlay) {
            drawerNav.classList.remove('active');
            drawerOverlay.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (drawerNav && drawerNav.classList.contains('active')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    if (drawerClose) {
        drawerClose.addEventListener('click', closeDrawer);
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeDrawer);
    }

    // Cerrar al presionar tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDrawer();
        }
    });

    // Cerrar al hacer clic en enlaces internos del drawer
    document.querySelectorAll('.drawer-link').forEach(link => {
        link.addEventListener('click', () => {
            closeDrawer();
        });
    });

    // -------------------------------------------------------------
    // 2. Scroll Animation with Stagger Calculation
    // -------------------------------------------------------------
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealElements = document.querySelectorAll('.reveal');

    // Auto-calculate stagger delays for child elements in containers
    const containersWithStagger = document.querySelectorAll('.grid-3, .gallery-grid, .clients-grid, .contracts-grid, .faq-preview-list, .faq-full-list');
    containersWithStagger.forEach(container => {
        const items = container.querySelectorAll('.reveal');
        items.forEach((item, index) => {
            // Cap maximum stagger to 320ms according to motion-design 1/3 rules
            const delay = Math.min((index % 6) * 0.06, 0.32);
            item.style.transitionDelay = `${delay}s`;
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // If this is the hero stats container, trigger the number counter
                if (entry.target.classList.contains('hero-stats') || entry.target.classList.contains('hafran-stats-section') || entry.target.querySelector('.stat-number') || entry.target.querySelector('.metric-val')) {
                    initCounters(entry.target);
                }

                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // -------------------------------------------------------------
    // 3. Stat Counter Animation (Ticker)
    // -------------------------------------------------------------
    function initCounters(container) {
        if (prefersReducedMotion) {
            container.querySelectorAll('.stat-number, .metric-val').forEach(stat => {
                const target = stat.dataset.target;
                const suffix = stat.dataset.suffix || '';
                stat.innerHTML = `${target}<span>${suffix}</span>`;
            });
            return;
        }

        const statNumbers = container.querySelectorAll('.stat-number[data-target], .metric-val[data-target]');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target, 10);
            const suffix = stat.dataset.suffix || '';
            const duration = 1600; // 1.6s
            const startTime = performance.now();

            function easeOutCubic(t) {
                return 1 - Math.pow(1 - t, 3);
            }

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutCubic(progress);
                const currentVal = Math.floor(easedProgress * target);

                stat.innerHTML = `${currentVal}<span>${suffix}</span>`;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerHTML = `${target}<span>${suffix}</span>`;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // -------------------------------------------------------------
    // 4. Interactive 3D Perspective Card Tilt
    // -------------------------------------------------------------
    if (!prefersReducedMotion && window.innerWidth > 768) {
        const tiltCards = document.querySelectorAll('.value-card, .client-item, .gallery-item, .contract-card');

        tiltCards.forEach(card => {
            let bounds = null;
            let isHovering = false;

            card.addEventListener('mouseenter', () => {
                bounds = card.getBoundingClientRect();
                isHovering = true;
                card.style.transition = 'transform 0.12s ease-out, box-shadow 0.25s ease-out';
            });

            card.addEventListener('mousemove', (e) => {
                if (!bounds || !isHovering) return;
                const mouseX = e.clientX - bounds.left;
                const mouseY = e.clientY - bounds.top;

                const xPct = (mouseX / bounds.width) - 0.5;
                const yPct = (mouseY / bounds.height) - 0.5;

                // Max 6 degrees rotation
                const rotateY = xPct * 10;
                const rotateX = -yPct * 10;

                requestAnimationFrame(() => {
                    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
                });
            });

            card.addEventListener('mouseleave', () => {
                isHovering = false;
                card.style.transition = 'transform 0.5s var(--ease-out-expo), box-shadow 0.5s var(--ease-out-expo)';
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            });
        });
    }

    // -------------------------------------------------------------
    // 5. Interactive GPR Subsurface Radar Simulator
    // -------------------------------------------------------------
    const scannerStage = document.getElementById('scanner-stage');
    const scannerCart = document.getElementById('scanner-cart');
    const radarBeam = document.getElementById('radar-beam');
    const hudStatusText = document.getElementById('hud-status-text');
    const hudDetectedText = document.getElementById('hud-detected-text');
    const hudDepthText = document.getElementById('hud-depth-text');
    const hudIndicator = document.querySelector('.hud-indicator');
    const utilities = document.querySelectorAll('.underground-utility');

    if (scannerStage && scannerCart && radarBeam) {
        let isUserInteracting = false;
        let autoDirection = 1;
        let currentPosPercent = 20;
        let autoSpeed = 0.15; // smooth patrol speed
        let stageWidth = scannerStage.offsetWidth;

        window.addEventListener('resize', () => {
            stageWidth = scannerStage.offsetWidth;
        });

        function updateScannerPosition(percent) {
            // Clamp within 8% and 92% to avoid running off stage
            const clamped = Math.max(8, Math.min(percent, 92));
            scannerCart.style.left = `${clamped}%`;
            radarBeam.style.left = `${clamped}%`;

            // Check proximity to utilities
            let detectedUtility = null;

            utilities.forEach(util => {
                // Get the left percent from style
                const utilLeft = parseFloat(util.style.left);
                const distance = Math.abs(clamped - utilLeft);

                // Detection threshold (within 7% horizontal delta)
                if (distance < 7.5) {
                    util.classList.add('detected');
                    detectedUtility = util;
                } else {
                    util.classList.remove('detected');
                }
            });

            // Update HUD
            if (detectedUtility) {
                const name = detectedUtility.dataset.name;
                const color = detectedUtility.dataset.color;
                const depth = detectedUtility.dataset.depth;

                hudStatusText.textContent = `OBJETO DETECTADO (${color.toUpperCase()})`;
                hudDetectedText.textContent = name;
                hudDepthText.textContent = depth;

                if (hudIndicator) {
                    hudIndicator.classList.add('active');
                }
            } else {
                hudStatusText.textContent = "EMITIENDO PULSO 400 MHz";
                hudDetectedText.textContent = "Escaneando estrato...";
                hudDepthText.textContent = "--";
            }
        }

        // Mouse & Touch Tracking
        function handleInteractionMove(e) {
            isUserInteracting = true;
            const rect = scannerStage.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const offsetX = clientX - rect.left;
            const percent = (offsetX / rect.width) * 100;
            currentPosPercent = percent;
            updateScannerPosition(percent);
        }

        scannerStage.addEventListener('mousemove', handleInteractionMove);
        scannerStage.addEventListener('touchmove', handleInteractionMove, { passive: true });

        scannerStage.addEventListener('mouseleave', () => {
            isUserInteracting = false;
        });

        scannerStage.addEventListener('touchend', () => {
            setTimeout(() => { isUserInteracting = false; }, 1500);
        });

        // Click utility to move cart directly to it
        utilities.forEach(util => {
            util.addEventListener('click', (e) => {
                e.stopPropagation();
                const utilLeft = parseFloat(util.style.left);
                currentPosPercent = utilLeft;
                updateScannerPosition(utilLeft);
                isUserInteracting = true;
                setTimeout(() => { isUserInteracting = false; }, 3000);
            });
        });

        // APWA Legend Chips click interaction
        const legendChips = document.querySelectorAll('.legend-chip');
        legendChips.forEach(chip => {
            chip.addEventListener('click', () => {
                let targetClass = '';
                if (chip.classList.contains('chip-red')) targetClass = '.util-electric';
                if (chip.classList.contains('chip-yellow')) targetClass = '.util-gas';
                if (chip.classList.contains('chip-orange')) targetClass = '.util-fiber';
                if (chip.classList.contains('chip-blue')) targetClass = '.util-water';

                if (targetClass) {
                    const targetEl = document.querySelector(targetClass);
                    if (targetEl) {
                        const targetLeft = parseFloat(targetEl.style.left);
                        currentPosPercent = targetLeft;
                        updateScannerPosition(targetLeft);
                        isUserInteracting = true;
                        setTimeout(() => { isUserInteracting = false; }, 3000);
                    }
                }
            });
        });

        // Ambient Patrol Loop when user is idle
        if (!prefersReducedMotion) {
            function autoPatrolLoop() {
                if (!isUserInteracting) {
                    currentPosPercent += autoSpeed * autoDirection;

                    if (currentPosPercent >= 90) {
                        autoDirection = -1;
                    } else if (currentPosPercent <= 10) {
                        autoDirection = 1;
                    }

                    updateScannerPosition(currentPosPercent);
                }
                requestAnimationFrame(autoPatrolLoop);
            }

            requestAnimationFrame(autoPatrolLoop);
        } else {
            updateScannerPosition(50);
        }
    }

    // -------------------------------------------------------------
    // 6. Desktop Navigation ScrollSpy (Enlace Activo al Hacer Scroll)
    // -------------------------------------------------------------
    const desktopLinks = document.querySelectorAll('.nav-desktop-link');
    const sections = document.querySelectorAll('section[id]');

    if (desktopLinks.length > 0 && sections.length > 0) {
        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            const scrollPosition = window.scrollY + 120; // Offset por altura del header

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            if (currentSectionId) {
                desktopLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Header Elevation & Compact effect on scroll
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // -------------------------------------------------------------
    // Hafran-style Expanding Content Cards Interactive Engine
    // -------------------------------------------------------------
    const expandingCards = document.querySelectorAll('.rf-card-item');
    if (expandingCards.length > 0) {
        expandingCards.forEach(card => {
            const activateCard = (e) => {
                // Si hizo clic en un link interno, no prevenir navegación
                if (e.target.closest('.rf-card-link')) return;

                expandingCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            };

            card.addEventListener('mouseenter', activateCard);
            card.addEventListener('click', activateCard);
        });
    }
});
