/**
 * Módulo de Tema
 * Gerencia alternância entre tema claro e escuro com persistência no localStorage
 */

const Theme = (() => {
    const DARK_THEME = 'dark-theme';
    const ICON_THEME = 'bx-sun';
    const THEME_STORAGE_KEY = 'selected-theme';
    const ICON_STORAGE_KEY = 'selected-icon';

    const getCurrentTheme = () => {
        return document.body.classList.contains(DARK_THEME) ? 'dark' : 'light';
    };

    const getCurrentIcon = (themeButton) => {
        return themeButton.classList.contains(ICON_THEME) ? 'bx-moon' : 'bx-sun';
    };

    const loadSavedTheme = (themeButton) => {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        const savedIcon = localStorage.getItem(ICON_STORAGE_KEY);

        if (savedTheme) {
            document.body.classList[savedTheme === 'dark' ? 'add' : 'remove'](DARK_THEME);
        }
        
        if (savedIcon && themeButton) {
            themeButton.classList[savedIcon === 'bx-moon' ? 'add' : 'remove'](ICON_THEME);
        }
    };

    const attachThemeListener = () => {
        const themeButton = document.getElementById('theme-button');
        
        if (!themeButton) {
            console.warn('theme-button not found');
            return;
        }

        loadSavedTheme(themeButton);

        const toggleTheme = () => {
            document.body.classList.toggle(DARK_THEME);
            themeButton.classList.toggle(ICON_THEME);
            localStorage.setItem(THEME_STORAGE_KEY, getCurrentTheme());
            localStorage.setItem(ICON_STORAGE_KEY, getCurrentIcon(themeButton));
        };

        themeButton.addEventListener('click', toggleTheme);
    };

    return {
        init() {
            // Escutar o evento de componentes carregados
            document.addEventListener('components-loaded', attachThemeListener);
            // Tentar também logo, em caso de elementos já existentes
            attachThemeListener();
        }
    };
})();

export default Theme;
