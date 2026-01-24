/**
 * Módulo de Componentes
 * Carrega componentes HTML dinamicamente
 */

const ComponentLoader = (() => {
    const COMPONENTS_PATH = './components';

    const loadComponent = async (componentName) => {
        try {
            const response = await fetch(`${COMPONENTS_PATH}/${componentName}.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.error(`Erro ao carregar componente ${componentName}:`, error);
            return '';
        }
    };

    const renderComponent = async (placeholder, componentName) => {
        const element = document.querySelector(placeholder);
        if (element) {
            const html = await loadComponent(componentName);
            element.innerHTML = html;
        }
    };

    const renderAllComponents = async () => {
        const components = [
            { placeholder: '[data-component="header"]', name: 'header' },
            { placeholder: '[data-component="social"]', name: 'social' },
            { placeholder: '[data-component="profile"]', name: 'profile' },
            { placeholder: '[data-component="education"]', name: 'education' },
            { placeholder: '[data-component="languages"]', name: 'languages' },
            { placeholder: '[data-component="experience"]', name: 'experience' },
            { placeholder: '[data-component="skills"]', name: 'skills' },
            { placeholder: '[data-component="certificates"]', name: 'certificates' },
            { placeholder: '[data-component="interests"]', name: 'interests' },
            { placeholder: '[data-component="footer"]', name: 'footer' }
        ];

        // Carregar componentes em paralelo
        await Promise.all(
            components.map(({ placeholder, name }) => 
                renderComponent(placeholder, name)
            )
        );

        // Disparar evento customizado após carregar todos os componentes
        const event = new CustomEvent('components-loaded');
        document.dispatchEvent(event);
    };

    return {
        init() {
            return renderAllComponents();
        }
    };
})();

export default ComponentLoader;
