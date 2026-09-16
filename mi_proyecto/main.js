// Espero a que el DOM cargue completamente
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. FUNCIONALIDAD: SALUDO DINÁMICO (index.html)
       ========================================== */
    const saludoElement = document.getElementById('saludo-dashboard');
    
    // Verifico si estoy en la página correcta (donde existe el elemento)
    if (saludoElement) {
        const horaActual = new Date().getHours();
        let mensajeSaludo = 'Buenas noches';

        if (horaActual >= 6 && horaActual < 12) {
            mensajeSaludo = 'Buenos días';
        } else if (horaActual >= 12 && horaActual < 20) {
            mensajeSaludo = 'Buenas tardes';
        }
        
        // Manipulación del DOM: Cambio el texto dinámicamente
        saludoElement.textContent = `${mensajeSaludo}, Admin | Panel General`;
    }

    /* ==========================================
       2. FUNCIONALIDAD: FILTRO DE HABITACIONES (habitaciones.html)
       ========================================== */
    const botonesFiltro = document.querySelectorAll('.btn-filtro');
    const tarjetasHabitacion = document.querySelectorAll('.tarjeta-habitacion');

    if (botonesFiltro.length > 0) {
        botonesFiltro.forEach(boton => {
            // Evento click en cada botón
            boton.addEventListener('click', (e) => {
                
                // A) Estilos visuales de los botones
                // quito la clase 'btn-dark' (activo) a todos y pongo 'btn-outline-dark'
                botonesFiltro.forEach(btn => {
                    btn.classList.remove('btn-dark');
                    btn.classList.add('btn-outline-dark');
                });
                // Le doy estilo de activo solo al botón clickeado
                e.target.classList.remove('btn-outline-dark');
                e.target.classList.add('btn-dark');

                // B) Lógica de filtrado
                const filtro = e.target.getAttribute('data-filtro'); // Lee si es "todas", "disponible" u "ocupada"

                tarjetasHabitacion.forEach(tarjeta => {
                    const estadoHabitacion = tarjeta.getAttribute('data-estado');

                    // Lógica para mostrar/ocultar mediante DOM (display)
                    if (filtro === 'todas' || estadoHabitacion === filtro) {
                        tarjeta.style.display = 'block'; // Mostrar
                    } else {
                        tarjeta.style.display = 'none';  // Ocultar
                    }
                });
            });
        });
    }
});