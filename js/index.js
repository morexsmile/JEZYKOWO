
/* JĘZYKOWO — MAIN JAVASCRIPT */
document.addEventListener("DOMContentLoaded", () => {

  /* MOBILE NAVIGATION */
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileNavigation = document.querySelector(".mobile-navigation");
    if (menuToggle && mobileNavigation) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mobileNavigation.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.innerHTML = isOpen ? "✕" : "☰";
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Zamknij menu" : "Otwórz menu"
            );
        });

        // Close menu after clicking a navigation link
        mobileNavigation.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileNavigation.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.innerHTML = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Otwórz menu");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", event => {
            const clickedInsideMenu = mobileNavigation.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);
            if (!clickedInsideMenu && !clickedToggle) {
                mobileNavigation.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.innerHTML = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Otwórz menu");
            }
        });

        // Close menu with Escape key
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                mobileNavigation.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.innerHTML = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Otwórz menu");
                menuToggle.focus();
            }
        });
    }

    /* SMOOTH SCROLLING */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", event => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    /* HEADER SCROLL EFFECT */
    const header = document.querySelector(".site-header");
    if (header) {
        const updateHeader = () => {
            header.classList.toggle("scrolled", window.scrollY > 30);
        };

        updateHeader();
        window.addEventListener("scroll", updateHeader, {
            passive: true
        });
    }

    /* REVEAL ELEMENTS ON SCROLL */
    const revealElements = document.querySelectorAll(
        ".section-heading, .learning-card, .journey-card, " +
        ".planet-item, .about-content, .about-visual, .cta-card"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });

    } else {
        revealElements.forEach(element => {
            element.classList.add("revealed");
        });
    }

    /* LANGUAGE PLANET INTERACTION */
    const planets = document.querySelectorAll(".planet-item");
    planets.forEach(planet => {
        planet.addEventListener("mouseenter", () => {
            planet.classList.add("planet-active");
        });

        planet.addEventListener("mouseleave", () => {
            planet.classList.remove("planet-active");
        });

        planet.addEventListener("focus", () => {
            planet.classList.add("planet-active");
        });

        planet.addEventListener("blur", () => {
            planet.classList.remove("planet-active");
        });
    });

    /* BUTTON LOADING FEEDBACK */
    document.querySelectorAll("[data-loading-button]").forEach(button => {
        button.addEventListener("click", () => {
            if (button.dataset.loading === "true") return;
            button.dataset.loading = "true";
            const originalText = button.innerHTML;
            button.innerHTML = "Ładowanie...";
            button.setAttribute("aria-busy", "true");
            window.setTimeout(() => {
                button.innerHTML = originalText;
                button.dataset.loading = "false";
                button.removeAttribute("aria-busy");
            }, 1200);
        });
    });

    /* CURRENT YEAR IN FOOTER */
    const yearElements = document.querySelectorAll("[data-current-year]");
    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    /* BACK TO TOP */
    const backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
        window.addEventListener("scroll", () => {
            backToTop.classList.toggle("visible", window.scrollY > 500);
        }, {
            passive: true
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* ACTIVE NAVIGATION LINK */
    const sections = document.querySelectorAll("main section[id]");
    const navigationLinks = document.querySelectorAll(
        ".main-navigation .nav-link"
    );

    if ("IntersectionObserver" in window && sections.length) {
        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const currentId = entry.target.id;
                        navigationLinks.forEach(link => {
                            const isActive =
                                link.getAttribute("href") === `#${currentId}`;
                            link.classList.toggle("active", isActive);
                        });
                    }
                });
            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    /* COSMIC STAR EFFECT */
    const starLayers = document.querySelectorAll(
        ".stars-small, .stars-medium, .stars-large"
    );

    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
        window.addEventListener("scroll", () => {
            const scrollPosition = window.scrollY;
            starLayers.forEach((layer, index) => {
                const speed = (index + 1) * 0.025;
                layer.style.transform =
                    `translateY(${scrollPosition * speed}px)`;
            });
        }, {
            passive: true
        });
    }

    /* ACCESSIBILITY — KEYBOARD PLANET NAVIGATION */
    planets.forEach(planet => {
        planet.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                const link = planet.querySelector("a");
                if (link) {
                    link.click();
                }
            }
        });
    });


    /* PAGE INITIALIZATION */
    document.body.classList.add("page-loaded");
    console.log(
        "%cJęzykowo 🌌",
        "color: #a879ff; font-size: 22px; font-weight: bold;"
    );

    console.log(
        "%cWitaj we wszechświecie języków!",
        "color: #32c8e8; font-size: 13px;"
    );

});
