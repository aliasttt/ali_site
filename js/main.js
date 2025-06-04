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

// Video playback functionality
document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll('.play-video');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoPath = this.getAttribute('data-video');
            const videoElement = this.closest('.video-card').querySelector('video');
            
            if (videoElement) {
                videoElement.play();
                // Scroll to video
                videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});

// Ensure videos stay muted
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Force mute on load
        video.muted = true;
        
        // Force mute on play
        video.addEventListener('play', function() {
            this.muted = true;
        });
        
        // Force mute on volume change
        video.addEventListener('volumechange', function() {
            this.muted = true;
        });
    });
}); 