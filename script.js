// Espera a que el HTML esté completamente cargado antes de ejecutar
document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. LÓGICA DE PESTAÑAS (TABS)
       ========================================= */
    const botonesPestanas = document.querySelectorAll('.tab-btn');
    const contenidosPestanas = document.querySelectorAll('.tab-content');

    botonesPestanas.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesPestanas.forEach(b => b.classList.remove('active'));
            contenidosPestanas.forEach(c => c.classList.remove('active'));
            boton.classList.add('active');
            const idDestino = boton.getAttribute('data-tab');
            document.getElementById(idDestino).classList.add('active');
        });
    });

    /* =========================================
       2. LÓGICA DEL BUSCADOR (CON PROTECCIÓN)
       ========================================= */
    const buscador = document.getElementById('buscador');
    
    // Solo ejecutar si el buscador existe en el HTML
    if (buscador) {
        const terminos = document.querySelectorAll('.termino');

        buscador.addEventListener('input', (evento) => {
            const textoBusqueda = evento.target.value.toLowerCase().trim();

            if (textoBusqueda.length > 0) {
                const btnDiccionario = document.querySelector('.tab-btn[data-tab="diccionario"]');
                if (btnDiccionario) btnDiccionario.click();
            }

            terminos.forEach(termino => {
                const textoTermino = termino.textContent.toLowerCase();
                if (textoTermino.includes(textoBusqueda)) {
                    termino.style.display = '';
                } else {
                    termino.style.display = 'none';
                }
            });
        });
    }

    /* =========================================
       3. LÓGICA DE SUB-PESTAÑAS (MÁQUINAS VIRTUALES)
       ========================================= */
    const botonesVM = document.querySelectorAll('.vm-btn');
    const contenidosVM = document.querySelectorAll('.vm-content');

    botonesVM.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesVM.forEach(b => b.classList.remove('active'));
            contenidosVM.forEach(c => c.classList.remove('active'));
            boton.classList.add('active');
            const idVM = boton.getAttribute('data-vm');
            document.getElementById(idVM).classList.add('active');
        });
    });

}); // ← FIN DEL DOMCONTENTLOADED

/* =========================================
   4. CARRUSEL DE IMÁGENES (SCOPE GLOBAL)
   ========================================= */

function moverCarrusel(direccion) {
    const slides = document.querySelectorAll('.carrusel-slide');
    const indicadores = document.querySelectorAll('.indicador');
    let slideActivo = document.querySelector('.carrusel-slide.active');
    
    // Protección: si no hay carrusel, salir
    if (!slideActivo) return;
    
    let indiceActivo = Array.from(slides).indexOf(slideActivo);
    let nuevoIndice = indiceActivo + direccion;
    
    if (nuevoIndice >= slides.length) {
        nuevoIndice = 0;
    } else if (nuevoIndice < 0) {
        nuevoIndice = slides.length - 1;
    }
    
    slideActivo.classList.remove('active');
    indicadores[indiceActivo].classList.remove('active');
    slides[nuevoIndice].classList.add('active');
    indicadores[nuevoIndice].classList.add('active');
}

function irAlSlide(indice) {
    const slides = document.querySelectorAll('.carrusel-slide');
    const indicadores = document.querySelectorAll('.indicador');
    let slideActivo = document.querySelector('.carrusel-slide.active');
    
    if (!slideActivo) return;
    
    let indiceActivo = Array.from(slides).indexOf(slideActivo);
    if (indice === indiceActivo) return;
    
    slideActivo.classList.remove('active');
    indicadores[indiceActivo].classList.remove('active');
    slides[indice].classList.add('active');
    indicadores[indice].classList.add('active');
}