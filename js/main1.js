document.addEventListener('DOMContentLoaded', function() {
    // Navigation - Active page handling (Hash-based navigation)
    const currentPath = window.location.hash || '#home';
    const sidebarLinks = document.querySelectorAll('.sidebar li');
    const pageContents = document.querySelectorAll('.page-content');
    
    // Function to set active page
    function setActivePage(pageName) {
        // Remove active class from all links and pages
        sidebarLinks.forEach(link => link.classList.remove('active'));
        pageContents.forEach(page => page.classList.remove('active'));
        
        // Add active class to current link and page
        const activeLink = document.querySelector(`.sidebar li[data-page="${pageName.replace('#', '')}"]`);
        const activePage = document.getElementById(pageName.replace('#', ''));
        
        if (activeLink) activeLink.classList.add('active');
        if (activePage) activePage.classList.add('active');
    }

    // Set initial active page
    setActivePage(currentPath);

    // Handle navigation clicks
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const pageName = this.getAttribute('data-page');
            setActivePage(pageName);
            window.location.hash = pageName;
        });
    });

    // Handle hash change
    window.addEventListener('hashchange', function() {
        const pageName = window.location.hash || '#home';
        setActivePage(pageName);
    });

    // Gallery filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to current button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Typewriter effect for subtitle
    function typeWriter(element, text, speed = 100) {
        if (element) {
            let i = 0;
            function typing() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typing, speed);
                }
            }
            typing();
        }
    }

    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.textContent;
        typewriterElement.textContent = '';
        setTimeout(() => {
            typeWriter(typewriterElement, text);
        }, 500);
    }

    // Project Modal
    const projectModal = document.getElementById('project-modal');
    const projectLinks = document.querySelectorAll('.view-project');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');

    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            
            // Placeholder for project details
            modalBody.innerHTML = `
                <h2>Project Details: ${this.parentElement.querySelector('h3').textContent}</h2>
                <p>Loading project details for ${projectId}...</p>
                <div class="project-images">
                    <img src="${this.closest('.gallery-item').querySelector('img').src}" alt="Project Image" class="img-fluid">
                </div>
                <div class="project-description mt-4">
                    <p>${this.parentElement.querySelector('p').textContent}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
                </div>
            `;
            projectModal.style.display = 'block';
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            projectModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });

    // Certificate Modal
    const certificateModal = document.getElementById('certificate-modal');
    const certificateLinks = document.querySelectorAll('.certificate-link');
    const closeCertificate = document.querySelector('.close-certificate');
    const certificateBody = document.querySelector('.certificate-body');

    certificateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const certificateId = this.getAttribute('data-certificate');
            
            // Placeholder for certificate details
            certificateBody.innerHTML = `
                <h2>Certificate: ${this.closest('.timeline-content').querySelector('h3').textContent}</h2>
                <div class="certificate-image">
                    <img src="/storage/certificates/${certificateId}.jpg" alt="Certificate" class="img-fluid" onerror="this.src='/images/certificate-placeholder.jpg'">
                </div>
            `;
            certificateModal.style.display = 'block';
        });
    });

    if (closeCertificate) {
        closeCertificate.addEventListener('click', function() {
            certificateModal.style.display = 'none';
        });
    }

    // Close certificate modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === certificateModal) {
            certificateModal.style.display = 'none';
        }
    });

    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
            });

            // Get form data
            const formData = new FormData(this);

            // Send AJAX request
            fetch('/contact/send', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';

                    // Reset form
                    contactForm.reset();
                } else {
                    // Show validation errors
                    const errors = data.errors;
                    for (const field in errors) {
                        const errorElement = document.getElementById(`${field}-error`);
                        if (errorElement) {
                            errorElement.textContent = errors[field][0];
                        }
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    // Animations for decorative elements
    const stars = document.querySelectorAll('.star-1, .star-2');
    stars.forEach(star => {
        setInterval(() => {
            const randomY = Math.random() * 10 - 5;
            const randomX = Math.random() * 10 - 5;
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

    // Scroll animations
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

    // Handle responsive navigation for mobile
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

    // CSS styles for animations
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
