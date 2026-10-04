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

    // Carrousel d'images des pages de projet
    const AUTOPLAY_DELAY = 3000;

    document.querySelectorAll('.project-carousel').forEach((carousel) => {
        const track = carousel.querySelector('.carousel-track');
        const images = Array.from(track.children);
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dotsContainer = carousel.querySelector('.carousel-dots');

        if (images.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }

        let index = 0;
        let autoplayTimer = null;

        // Création des points de navigation
        const dots = images.map((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Go to image ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
            return dot;
        });

        function update() {
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        }

        function goTo(newIndex) {
            index = (newIndex + images.length) % images.length;
            update();
        }

        function next() {
            goTo(index + 1);
        }

        function prev() {
            goTo(index - 1);
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(next, AUTOPLAY_DELAY);
        }

        function stopAutoplay() {
            if (autoplayTimer) clearInterval(autoplayTimer);
        }

        if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });

        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        update();
        startAutoplay();
    });
});