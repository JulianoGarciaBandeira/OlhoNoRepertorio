    function ajustarAlturaFormulario() {
        const iframe = document.querySelector(".iframe-container iframe");

        if (!iframe) return;

        let largura = window.innerWidth;

        // Ajuste proporcional baseado na largura
        if (largura > 1200) {
            iframe.style.height = "2900px";
        } else if (largura > 992) {
            iframe.style.height = "3000px";
        } else if (largura > 768) {
            iframe.style.height = "3300px";
        } else if (largura > 480) {
            iframe.style.height = "3600px";
        } else {
            iframe.style.height = "4000px";  // celulares pequenos
        }
    }

    // Ajusta ao carregar a página
    window.addEventListener("load", ajustarAlturaFormulario);

    // Ajusta ao redimensionar a janela
    window.addEventListener("resize", ajustarAlturaFormulario);

