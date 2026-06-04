// Espera a que el HTML esté completamente cargado antes de ejecutar
document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. LÓGICA DE PESTAÑAS (TABS)
       ========================================= */
    // Seleccionamos todos los botones y todas las secciones de contenido
    const botonesPestanas = document.querySelectorAll('.tab-btn');
    const contenidosPestanas = document.querySelectorAll('.tab-content');

    // Añadimos un "escucha" a cada botón
    botonesPestanas.forEach(boton => {
        boton.addEventListener('click', () => {
            // 1. Desactivamos todo
            botonesPestanas.forEach(b => b.classList.remove('active'));
            contenidosPestanas.forEach(c => c.classList.remove('active'));

            // 2. Activamos el botón que se clickeó
            boton.classList.add('active');

            // 3. Mostramos la sección que coincide con data-tab
            const idDestino = boton.getAttribute('data-tab');
            document.getElementById(idDestino).classList.add('active');
        });
    });

    /* =========================================
       2. LÓGICA DEL BUSCADOR
       ========================================= */
    const buscador = document.getElementById('buscador');
    const terminos = document.querySelectorAll('.termino');

    // Se ejecuta cada vez que el usuario escribe o borra una letra
    buscador.addEventListener('input', (evento) => {
        const textoBusqueda = evento.target.value.toLowerCase().trim();

        // Si el usuario escribe, forzamos que se muestre la pestaña Diccionario
        if (textoBusqueda.length > 0) {
            const btnDiccionario = document.querySelector('.tab-btn[data-tab="diccionario"]');
            if (btnDiccionario) btnDiccionario.click();
        }

        // Recorremos cada tarjeta de término
        terminos.forEach(termino => {
            // Obtenemos todo el texto de la tarjeta (título + definición + ejemplos)
            const textoTermino = termino.textContent.toLowerCase();

            // Si el texto incluye lo que escribió el usuario → se muestra
            if (textoTermino.includes(textoBusqueda)) {
                termino.style.display = ''; // Vuelve al estado original del CSS
            } else {
                termino.style.display = 'none'; // Se oculta
            }
        });
    });

    /* =========================================
       3. TIP PARA EL FUTURO
       ========================================= */
    // Si quieres añadir más interacciones (modo oscuro, copiar comandos, etc.),
    // solo agrégalas aquí abajo. Este archivo es tu "centro de control".
        /* =========================================
       4. LÓGICA DE SUB-PESTAÑAS (MÁQUINAS VIRTUALES)
       ========================================= */
    const botonesVM = document.querySelectorAll('.vm-btn');
    const contenidosVM = document.querySelectorAll('.vm-content');

    botonesVM.forEach(boton => {
        boton.addEventListener('click', () => {
            // Quitar clase active de todos
            botonesVM.forEach(b => b.classList.remove('active'));
            contenidosVM.forEach(c => c.classList.remove('active'));

            // Activar el clickeado
            boton.classList.add('active');

            // Mostrar su contenido
            const idVM = boton.getAttribute('data-vm');
            document.getElementById(idVM).classList.add('active');
        });
    });
        /* =========================================
       5. BOTÓN COPIAR CÓDIGO
       ========================================= */
    const botonesCopiar = document.querySelectorAll('.btn-copiar');

    botonesCopiar.forEach(boton => {
        boton.addEventListener('click', async () => {
            // 1. Encontrar el elemento <code> dentro del mismo bloque
            const codigoBlock = boton.closest('.codigo');
            const textoCodigo = codigoBlock.querySelector('code').textContent;

            try {
                // 2. Copiar al portapapeles (API moderna)
                await navigator.clipboard.writeText(textoCodigo.trim());

                // 3. Feedback visual: cambiar texto y color
                const textoOriginal = boton.innerHTML;
                boton.innerHTML = '✅ ¡Copiado!';
                boton.classList.add('copiado');

                // 4. Restaurar después de 2 segundos
                setTimeout(() => {
                    boton.innerHTML = textoOriginal;
                    boton.classList.remove('copiado');
                }, 2000);

            } catch (err) {
                // Fallback si la API falla (navegadores muy viejos)
                console.error('Error al copiar:', err);
                alert('No se pudo copiar. Selecciona y copia manualmente.');
            }
        });
    });
});