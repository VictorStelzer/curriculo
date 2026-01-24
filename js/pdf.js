/**
 * Módulo de PDF
 * Gerencia geração do currículo em PDF com html2pdf
 */

const PDFGenerator = (() => {
    const SCALE_TIMEOUT = 5000;

    const pdfOptions = {
        margin: 0,
        filename: 'Curriculo.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 4 },
        jsPDF: { format: 'a4', orientation: 'portrait' }
    };

    const scaleCv = () => {
        document.body.classList.add('scale-cv');
    };

    const removeScaleCv = () => {
        document.body.classList.remove('scale-cv');
    };

    const generateResume = async () => {
        if (typeof html2pdf === 'undefined') {
            console.error('html2pdf library not loaded');
            return;
        }

        const areaCv = document.getElementById('area-cv');
        if (!areaCv) {
            console.error('area-cv element not found');
            return;
        }

        try {
            scaleCv();
            html2pdf().set(pdfOptions).from(areaCv).save();
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setTimeout(removeScaleCv, SCALE_TIMEOUT);
        }
    };

    const attachPDFListener = () => {
        const resumeButton = document.getElementById('resume-button');
        
        if (!resumeButton) {
            console.warn('resume-button not found');
            return;
        }

        resumeButton.addEventListener('click', generateResume);
    };

    return {
        init() {
            // Escutar o evento de componentes carregados
            document.addEventListener('components-loaded', attachPDFListener);
            // Tentar também logo, em caso de elementos já existentes
            attachPDFListener();
        }
    };
})();

export default PDFGenerator;
