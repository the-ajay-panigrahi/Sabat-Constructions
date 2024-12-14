// Add this function at the start of your main.js file
function preloadImages(images, callback) {
    let loadedImages = 0;
    const totalImages = images.length;

    images.forEach(src => {
        const img = new Image();
        img.onload = () => {
            loadedImages++;
            if (loadedImages === totalImages) {
                callback();
            }
        };
        img.src = src;
    });
}

// Navigation and Mobile Menu
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Toggle menu
    navToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks?.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Close menu when clicking a link
    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Handle scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 50
    });

    initNavigation();
    initTestimonials();

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Enhanced Portfolio Preview with filtering
    const portfolioItems = [
        {
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
            title: 'Modern Office Complex',
            category: 'Commercial',
            description: 'A state-of-the-art office complex featuring sustainable design'
        },
        {
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
            title: 'Luxury Apartments',
            category: 'Residential',
            description: 'High-end residential development with premium amenities'
        },
        {
            image: 'https://images.unsplash.com/photo-1562648293-15d7e9f2a261',
            title: 'Shopping Mall',
            category: 'Commercial',
            description: 'Modern shopping center with innovative architecture'
        },
        {
            image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77',
            title: 'Eco-Friendly Housing',
            category: 'Residential',
            description: 'Sustainable residential project with green technologies'
        }
    ];

    // Update portfolio grid with hover effects
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid) {
        portfolioItems.forEach(item => {
            const portfolioItem = `
                <div class="portfolio-item" data-aos="fade-up">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="portfolio-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.category}</p>
                        <p class="description">${item.description}</p>
                    </div>
                </div>
            `;
            portfolioGrid.innerHTML += portfolioItem;
        });
    }

    // Enhanced testimonials with auto-scroll
    const testimonials = [
        {
            name: 'John Doe',
            position: 'CEO, Tech Corp',
            text: 'Exceptional quality and professionalism. Sabat Construction delivered our project on time and within budget.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
        },
        {
            name: 'Jane Smith',
            position: 'Real Estate Developer',
            text: 'Working with Sabat Construction was a pleasure. Their attention to detail is unmatched.',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
        },
        {
            name: 'Michael Johnson',
            position: 'Architect',
            text: 'Their innovative approach to construction challenges sets them apart from others in the industry.',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
        }
    ];

    // Ensure video plays on mobile and handle loading
    document.addEventListener('DOMContentLoaded', function() {
        const video = document.querySelector('.hero-video');
        if (video) {
            video.play().catch(function(error) {
                console.log("Video autoplay failed:", error);
            });
            
            // Add loading state
            video.addEventListener('loadeddata', function() {
                video.classList.add('loaded');
            });
        }
    });

    // Add counter animation for statistics
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    }

    // Initialize counters when in view
    const counters = document.querySelectorAll('.counter');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));

    // Optimize testimonials loading and scrolling
    function initTestimonials() {
        const testimonialSection = document.querySelector('.testimonials-slider');
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        
        // Create Intersection Observer for testimonials section
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    testimonialSection.classList.add('loaded');
                    sectionObserver.unobserve(entry.target);
                    
                    // Start item animations after section is loaded
                    setTimeout(() => {
                        animateTestimonialItems();
                    }, 200);
                }
            });
        }, {
            threshold: 0.2
        });

        // Observe the testimonials section
        sectionObserver.observe(testimonialSection);

        // Function to animate individual testimonial items
        function animateTestimonialItems() {
            testimonialItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 150); // Stagger the animations
            });
        }

        // Set initial styles for items
        testimonialItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }
}); 