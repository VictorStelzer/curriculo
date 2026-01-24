/**
 * Módulo de Scroll
 * Gerencia comportamento do botão de scroll para o topo
 */

const ScrollManager = (() => {
    const scrollTopBtn = document.getElementById('scroll-top');
    const SCROLL_THRESHOLD = 200;

    const handleScroll = () => {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= SCROLL_THRESHOLD) {
                scrollTopBtn.classList.add('show-scroll');
            } else {
                scrollTopBtn.classList.remove('show-scroll');
            }
        });
    };

    return {
        init() {
            if (scrollTopBtn) {
                handleScroll();
            }
        }
    };
})();

export default ScrollManager;
