// Initialize AOS animations
AOS.init({
    duration: 1000,
    once: true
});

// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('languageSelect');
    
    // Set initial language based on browser preference or stored preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'tr';
    languageSelect.value = savedLanguage;
    changeLanguage(savedLanguage);

    // Add event listener for language change
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        localStorage.setItem('preferredLanguage', selectedLanguage);
        changeLanguage(selectedLanguage);
    });
});

function changeLanguage(lang) {
    // Update HTML lang attribute and direction
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update placeholders
    const placeholders = document.querySelectorAll('[data-placeholder]');
    placeholders.forEach(element => {
        const key = element.getAttribute('data-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // Update button text
    const buttons = document.querySelectorAll('[data-button]');
    buttons.forEach(element => {
        const key = element.getAttribute('data-button');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Add RTL support for Persian
    if (lang === 'fa') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
} 