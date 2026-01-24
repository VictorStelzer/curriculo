/**
 * Arquivo Principal de Inicialização
 * Inicializa todos os módulos da aplicação
 */

import ComponentLoader from './components.js';
import Navigation from './navigation.js';
import Theme from './theme.js';
import ScrollManager from './scroll.js';
import PDFGenerator from './pdf.js';

const App = (() => {
    const init = async () => {
        // Carregar componentes primeiro
        await ComponentLoader.init();
        
        // Depois inicializar outros módulos
        Navigation.init();
        Theme.init();
        ScrollManager.init();
        PDFGenerator.init();
    };

    return { init };
})();

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
