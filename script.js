document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const portefolioTopOverlay = document.querySelector('.portefolio-top-overlay');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        // Masque l'indicateur de scroll dès qu'on descend un peu
        if (scrollIndicator) {
            const scrolled = window.scrollY > 20;
            scrollIndicator.style.opacity = scrolled ? '0' : '1';
            scrollIndicator.style.transition = 'opacity 0.3s ease';
        }

        // Assombrit progressivement le haut de l'image de fond (uniquement si présent)
        if (portefolioTopOverlay) {
            const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
            const progress = 0.6 * window.scrollY / scrollMax;
            portefolioTopOverlay.style.opacity = progress;
        }

        // Fait disparaître la navbar au scroll (sur toutes les pages qui en ont une)
        if (navbar) {
            navbar.style.opacity = 1 - window.scrollY / 150;
        }
    });
});