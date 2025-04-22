document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');

    // Theme toggle
    if (themeToggle) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', currentTheme);
        themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for sections
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.id === 'experience') {
                    const timelineItemsInSection = entry.target.querySelectorAll('.timeline-item');
                    timelineItemsInSection.forEach((item, index) => {
                        setTimeout(() => item.classList.add('visible'), 200 * index);
                    });
                }
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
        card.classList.add('fade-in');
    });

    document.querySelectorAll('.skill-category li').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            item.style.transition = 'transform 0.3s ease';
            item.classList.add('glitch');
            setTimeout(() => item.classList.remove('glitch'), 500);
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                console.log('Form submitted:', formData);
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.classList.add('success');

                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                }, 3000);
            }, 1500);
        });
    }

    // Particle effect in hero
    const hero = document.querySelector('.hero');
    if (hero) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            hero.appendChild(particle);
        }
    }

    // Typing effect
    const typeEffect = (el) => {
        const text = el.textContent;
        el.textContent = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                el.textContent += text.charAt(i++);
                setTimeout(type, 100);
            }
        };
        setTimeout(type, 1000);
    };

    const tagline = document.querySelector('.tagline');
    if (tagline) typeEffect(tagline);

    const profileTitle = document.querySelector('.profile-info h2');
    if (profileTitle) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeEffect(profileTitle);
                observer.unobserve(profileTitle);
            }
        });
        observer.observe(profileTitle);
    }

    // Timeline and skill animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    timelineItems.forEach(item => timelineObserver.observe(item));

    document.querySelectorAll('.skill-category').forEach(category => {
        category.addEventListener('mouseenter', () => category.style.transform = 'translateY(-5px)');
        category.addEventListener('mouseleave', () => category.style.transform = 'translateY(0)');
    });

    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('mouseenter', () => link.style.transform = 'translateY(-5px)');
        link.addEventListener('mouseleave', () => link.style.transform = 'translateY(0)');
    });

    // Fade in animation observer
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // Mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }

    // Inject animation styles
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .timeline-item {
            opacity: 0;
            transform: translateX(-20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .timeline-item.visible {
            opacity: 1;
            transform: translateX(0);
        }
        @media (max-width: 767px) {
            .nav-links {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: var(--bg-color);
                padding: 1rem;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .nav-links.active {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .mobile-menu-btn {
                display: block;
            }
        }
    `;
    document.head.appendChild(style);

    // Show important content manually
    ['#experience', '#education'].forEach(id => {
        const el = document.querySelector(id);
        if (el) el.style.display = 'block';
    });
});
