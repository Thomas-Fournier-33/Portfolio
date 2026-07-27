// Le rideau reste affiché un temps fixe, puis s'efface
const DUREE_RIDEAU = 200; // en millisecondes, ajuste selon ton goût

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loader = document.getElementById('page-loader');
        if (loader) loader.classList.add('hidden');
    }, DUREE_RIDEAU);
});

// Navigation entre les pages (inchangé)
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const isInternal = link.hostname === window.location.hostname;
    const isSamePage = link.href === window.location.href;
    const opensNewTab = link.target === '_blank';

    if (isInternal && !isSamePage && !opensNewTab) {
        e.preventDefault();
        const loader = document.getElementById('page-loader');
        if (loader) loader.classList.remove('hidden');

        setTimeout(() => {
            window.location.href = link.href;
        }, 100);
    }
});