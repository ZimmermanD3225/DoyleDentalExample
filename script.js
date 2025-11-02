const chatButton = document.getElementById('chat-button');
const chatPopup = document.getElementById('chat-popup');
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

function toggleChat() {
    chatPopup.classList.toggle('active');
}

chatButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleChat();
});

document.addEventListener('click', (event) => {
    if (!chatPopup.contains(event.target) && !chatButton.contains(event.target)) {
        chatPopup.classList.remove('active');
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        chatPopup.classList.remove('active');
    }
});

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

const rotatingWords = ['confident', 'welcomed', 'comfortable', 'cared for', 'amazing'];
let currentWordIndex = 0;
const rotatingTextElement = document.querySelector('.rotating-text');

function rotateWords() {
    currentWordIndex = (currentWordIndex + 1) % rotatingWords.length;
    rotatingTextElement.style.opacity = '0';
    
    setTimeout(() => {
        rotatingTextElement.textContent = rotatingWords[currentWordIndex];
        rotatingTextElement.style.opacity = '1';
    }, 300);
}

if (rotatingTextElement) {
    rotatingTextElement.style.transition = 'opacity 0.3s ease';
    setInterval(rotateWords, 3000);
}

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

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.value-card, .service-card, .team-member');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    setTimeout(() => {
        if (chatPopup) {
            chatPopup.classList.add('active');
        }
    }, 2000);
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}
