// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
        navLinks.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Reset errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
            el.classList.remove('error');
        });
        
        // Name validation
        if (!name.value.trim()) {
            showError(name, 'Please enter your name');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Please enter your email');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Message validation
        if (!message.value.trim()) {
            showError(message, 'Please enter your message');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
}

function showError(input, message) {
    input.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#dc2626';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Set current year in copyright
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.region-card, .package-card, .feature-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
});

// Initialize Font Awesome icons
(function() {
    const faScript = document.createElement('script');
    faScript.src = 'https://kit.fontawesome.com/a076d05399.js';
    faScript.crossOrigin = 'anonymous';
    document.head.appendChild(faScript);
})();