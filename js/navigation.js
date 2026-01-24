/**
 * Módulo de Navegação
 * Gerencia toggle do menu e ativa links na navegação
 */

const Navigation = (() => {
    const toggleId = 'nav-toggle';
    const navId = 'nav-menu';
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.getElementById(navId);

    const initMenuToggle = () => {
        const toggle = document.getElementById(toggleId);
        if (toggle && navMenu) {
            toggle.addEventListener('click', () => {
                navMenu.classList.toggle('show-menu');
            });
        }
    };

    const closeMenuOnLinkClick = () => {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show-menu');
            });
        });
    };

    const activateLinkOnScroll = () => {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 50;
                const sectionId = section.getAttribute('id');

                const link = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
                if (link) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        link.classList.add('active-link');
                    } else {
                        link.classList.remove('active-link');
                    }
                }
            });
        });
    };

    return {
        init() {
            initMenuToggle();
            closeMenuOnLinkClick();
            activateLinkOnScroll();
        }
    };
})();

export default Navigation;
