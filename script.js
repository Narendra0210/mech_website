const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Move the active class immediately for visual feedback
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target) || menuToggle.contains(e.target);
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Ensure the correct link is active based on the current URL on page load
window.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPath = link.getAttribute('href');
        
        // Normalize current page
        const isHomePage = currentPage === '' || currentPage === 'index.html' || currentPath.endsWith('/');
        const isAboutPage = currentPage === 'about.html' || currentPath.includes('about.html');
        const isblogs = currentPage === 'blogs.html' || currentPath.includes('blogs.html');
        const isProductPage = currentPage === 'product.html' || currentPath.includes('product.html');
        const iscatelogue = currentPage === 'catelogue.html' || currentPath.includes('catelogue.html');
        const isServicePage = currentPage === 'service.html' || currentPath.includes('service.html');
        const isContactPage = currentPage === 'contact.html' || currentPath.includes('contact.html');
        
        // Check which page we're on and match with link
        if (isHomePage && (linkPath === '/' || linkPath === 'index.html' || linkPath === '#home' || linkPath === '')) {
            link.classList.add('active');
        } else if (isAboutPage && linkPath === 'about.html') {
            link.classList.add('active');
        } else if (isProductPage && linkPath === 'product.html') {
            link.classList.add('active');
        } else if (isServicePage && linkPath === 'service.html') {
            link.classList.add('active');
        } else if (isContactPage && linkPath === 'contact.html') {
            link.classList.add('active');
        }else if (isblogs && linkPath === 'blogs.html'){
            link.classList.add('active');
        }else if(iscatelogue && linkPath === 'catelogue.html'){
             link.classList.add('active');

        }
    });
});

const header = document.getElementById('header');
const navbar = document.getElementById('navbar');

let lastScrollY = window.scrollY;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
                header.classList.remove('hide');
            }

            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY) {
                    // Scrolling down
                    header.classList.add('hide');
                } else {
                    // Scrolling up
                    header.classList.remove('hide');
                }
            }

            lastScrollY = currentScrollY;
            ticking = false;
        });
        ticking = true;
    }
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe contact form
const contactFormCard = document.querySelector('.contact-form-card');
if (contactFormCard) {
    contactFormCard.style.opacity = '0';
    contactFormCard.style.transform = 'translateY(30px)';
    contactFormCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(contactFormCard);
}

// Observe contact info cards
const contactInfoCards = document.querySelectorAll('.contact-info-card');
contactInfoCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

const contactFormElement = document.getElementById('contactNewForm');

if (contactFormElement) {
    contactFormElement.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // UI feedback (no actual submission)
        const submitButton = contactFormElement.querySelector('.btn-send-message');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission delay
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            submitButton.style.backgroundColor = '#10b981';
            
            // Reset form
            contactFormElement.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '';
            }, 3000);
        }, 1500);
    });
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 160;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});



fetch('header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header-placeholder').innerHTML = data;
  });

fetch('footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  });




// Feature Cards Slider
const cardsSliderTrack = document.querySelector('.cards-slider-track');
const cards = document.querySelectorAll('.cards-slider-track .feature-card');
const dotsContainer = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.slider-arrow-prev');
const nextBtn = document.querySelector('.slider-arrow-next');

if (cardsSliderTrack && cards.length > 0 && dotsContainer) {
    let currentIndex = 0;
    const totalCards = cards.length;
    let touchStartX = 0;
    let touchEndX = 0;

    function isMobileOrTablet() {
        return window.innerWidth <= 1024;
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalCards; i++) {
            const dot = document.createElement('span');
            dot.className = 'slider-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {
        if (!isMobileOrTablet()) {
            cardsSliderTrack.style.transform = 'none';
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }

        const translateX = -currentIndex * 25;
        cardsSliderTrack.style.transform = `translateX(${translateX}%)`;
        
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Update arrow button states
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
            prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex === totalCards - 1;
            nextBtn.style.opacity = currentIndex === totalCards - 1 ? '0.4' : '1';
        }
    }

    function goToSlide(index) {
        if (!isMobileOrTablet()) return;
        currentIndex = Math.max(0, Math.min(index, totalCards - 1));
        updateSlider();
    }

    function nextSlide() {
        if (!isMobileOrTablet()) return;
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateSlider();
        }
    }

    function prevSlide() {
        if (!isMobileOrTablet()) return;
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }

    // Arrow button event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Touch swipe support
    cardsSliderTrack.addEventListener('touchstart', (e) => {
        if (!isMobileOrTablet()) return;
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    cardsSliderTrack.addEventListener('touchend', (e) => {
        if (!isMobileOrTablet()) return;
        touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }, { passive: true });

    // Handle window resize
    window.addEventListener('resize', () => {
        updateSlider();
    });

    createDots();
    updateSlider();
}

// Hero Slider
const heroSlider = document.getElementById('heroSlider');
const heroSliderDotsContainer = document.getElementById('heroSliderDots');

if (heroSlider && heroSliderDotsContainer) {
    const heroSlides = heroSlider.querySelectorAll('.hero-slide');
    const totalSlides = heroSlides.length;
    let currentSlide = 0;
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 seconds

    // Create dots
    function createHeroDots() {
        heroSliderDotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'hero-slider-dot';
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToHeroSlide(i));
            heroSliderDotsContainer.appendChild(dot);
        }
    }

    // Update slider position
    function updateHeroSlider() {
        const translateX = -currentSlide * 100;
        heroSlider.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        const dots = heroSliderDotsContainer.querySelectorAll('.hero-slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Go to specific slide
    function goToHeroSlide(index) {
        currentSlide = index;
        updateHeroSlider();
        resetHeroAutoPlay();
    }

    // Next slide
    function nextHeroSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateHeroSlider();
    }

    // Auto-play functionality
    function startHeroAutoPlay() {
        // Clear any existing interval first
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        autoPlayInterval = setInterval(() => {
            nextHeroSlide();
        }, autoPlayDelay);
    }

    function stopHeroAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    function resetHeroAutoPlay() {
        stopHeroAutoPlay();
        startHeroAutoPlay();
    }

    // Pause on hover
    const heroSliderWrapper = heroSlider.closest('.hero-slider-wrapper');
    if (heroSliderWrapper) {
        heroSliderWrapper.addEventListener('mouseenter', stopHeroAutoPlay);
        heroSliderWrapper.addEventListener('mouseleave', startHeroAutoPlay);
    }

    // Touch swipe support
    let heroTouchStartX = 0;
    let heroTouchEndX = 0;

    heroSlider.addEventListener('touchstart', (e) => {
        heroTouchStartX = e.changedTouches[0].screenX;
        stopHeroAutoPlay();
    }, { passive: true });

    heroSlider.addEventListener('touchend', (e) => {
        heroTouchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        const diff = heroTouchStartX - heroTouchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextHeroSlide();
            } else {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateHeroSlider();
            }
        }
        startHeroAutoPlay();
    }, { passive: true });

    // Initialize - ensure auto-scroll starts properly
    function initHeroSlider() {
        createHeroDots();
        updateHeroSlider();
        // Start auto-play with 5 second intervals
        startHeroAutoPlay();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroSlider);
    } else {
        initHeroSlider();
    }
}
