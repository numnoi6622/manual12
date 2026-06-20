// Add scroll event listener to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        
        // Check if logo needs color inversion or adjustments
        // depending on the background
        const logoText = document.querySelector('.logo span');
        const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
        
        if (logoText && navLinks.length > 0) {
            logoText.style.color = 'var(--primary-blue)';
            navLinks.forEach(link => {
                link.style.color = 'var(--text-dark)';
            });
        }
    } else {
        navbar.classList.remove('scrolled');
        
        // Reset colors at the top (over the hero image)
        const logoText = document.querySelector('.logo span');
        const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
        
        if (logoText && navLinks.length > 0) {
            logoText.style.color = 'var(--white)';
            navLinks.forEach(link => {
                link.style.color = 'var(--white)';
            });
        }
    }
});

// Trigger scroll event on load to set initial state
window.dispatchEvent(new Event('scroll'));

// Add simple reveal animation for cards
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select elements to animate
const animateElements = document.querySelectorAll('.card, .photo-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Language Toggle Logic
const langToggleBtn = document.getElementById('lang-toggle');
let currentLang = 'th';

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'th' ? 'en' : 'th';
        langToggleBtn.textContent = currentLang === 'th' ? 'EN' : 'TH';
        
        // Change HTML lang attribute
        document.documentElement.lang = currentLang;

        // Update document title and meta description
        const pageTitle = document.getElementById('page-title');
        const pageDesc = document.getElementById('page-desc');
        
        if (currentLang === 'en') {
            if (pageTitle) pageTitle.textContent = 'Hong Mak Fresh Milk - The Ultimate Night Hangout';
            if (pageDesc) pageDesc.content = 'Hong Mak Fresh Milk, the ultimate night cafe for delicious fresh milk, desserts and great vibes.';
        } else {
            if (pageTitle) pageTitle.textContent = 'นมสดโฮ่งมาก - จุดแฮงก์เอาต์ฟีลตัวมัมยามค่ำคืน';
            if (pageDesc) pageDesc.content = 'นมสดโฮ่งมาก ร้านนมสดกลางคืนสไตล์ตัวมัม ฉ่ำกับนมสด ของหวาน และบรรยากาศสุดจึ้ง';
        }

        // Change all translatable elements
        const translatableElements = document.querySelectorAll('.translate');
        translatableElements.forEach(el => {
            const translatedText = el.getAttribute(`data-${currentLang}`);
            if (translatedText) {
                el.textContent = translatedText;
            }
        });
    });
}

