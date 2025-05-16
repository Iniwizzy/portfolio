document.addEventListener('DOMContentLoaded', function () {
    // Navigation untuk semua link yang menuju ke ID halaman (sidebar maupun tombol)
    const allLinks = document.querySelectorAll('a[href^="#"]');
    const pageContents = document.querySelectorAll('.page-content');
    const navItems = document.querySelectorAll('.sidebar li');

    allLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetPage = document.getElementById(targetId);

            if (targetPage) {
                e.preventDefault();

                // Sembunyikan semua konten
                pageContents.forEach(page => page.classList.remove('active'));

                // Tampilkan target
                targetPage.classList.add('active');

                // Hapus class 'active' dari semua item sidebar
                navItems.forEach(item => item.classList.remove('active'));

                // Tambahkan class 'active' ke item sidebar yang sesuai href-nya
                navItems.forEach(item => {
                    const linkInside = item.querySelector('a');
                    if (linkInside && linkInside.getAttribute('href') === `#${targetId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });

    // Gallery filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                item.style.display =
                    filterValue === 'all' || item.getAttribute('data-category') === filterValue
                        ? 'block'
                        : 'none';
            });
        });
    });

    // Contact form validation
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;

            if (nameInput.value.trim() === '') {
                highlightError(nameInput);
                isValid = false;
            } else {
                removeError(nameInput);
            }

            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                highlightError(emailInput);
                isValid = false;
            } else {
                removeError(emailInput);
            }

            if (messageInput.value.trim() === '') {
                highlightError(messageInput);
                isValid = false;
            } else {
                removeError(messageInput);
            }

            if (isValid) {
                const submitBtn = contactForm.querySelector('.submit-btn');
                submitBtn.innerHTML = 'Sending...';

                setTimeout(() => {
                    submitBtn.innerHTML = 'Message Sent!';
                    contactForm.reset();

                    setTimeout(() => {
                        submitBtn.innerHTML = 'Send Message';
                    }, 3000);
                }, 1500);
            }
        });
    }

    function highlightError(input) {
        input.style.borderColor = '#ff3366';
    }

    function removeError(input) {
        input.style.borderColor = '';
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Animate decorative elements
    const stars = document.querySelectorAll('.star-1, .star-2, .star-3, .star-4, .star-5, .star-6');
    stars.forEach(star => {
        setInterval(() => {
            const randomY = Math.random() * 10 - 3;
            const randomX = Math.random() * 10 - 3;
            star.style.transform = `translate(${randomX}px, ${randomY}px)`;
            star.style.transition = 'transform 1s ease-in-out';
        }, 1000);
    });

    const emoji = document.querySelector('.emoji-decoration img');
    if (emoji) {
        setInterval(() => {
            emoji.style.transform = 'rotate(10deg)';
            setTimeout(() => {
                emoji.style.transform = 'rotate(-10deg)';
            }, 1000);
            setTimeout(() => {
                emoji.style.transform = 'rotate(0deg)';
            }, 2000);
        }, 3000);
    }

    const geometry = document.querySelector('.geometry');
    if (geometry) {
        geometry.style.animation = 'rotate 20s linear infinite';
    }

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.gallery-item, .timeline-item, .skills-column, .about-image');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.gallery-item, .timeline-item, .skills-column, .about-image').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    setTimeout(animateOnScroll, 300);

    const handleResponsiveNav = () => {
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.sidebar a').forEach(link => {
                link.addEventListener('click', function () {
                    const toggle = document.querySelector('.mobile-nav-toggle');
                    const sidebar = document.querySelector('.sidebar');
                    if (toggle && sidebar) {
                        toggle.classList.remove('active');
                        sidebar.classList.remove('active');
                    }
                });
            });
        }
    };

    handleResponsiveNav();

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
    `;
    document.head.appendChild(style);
});
