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
       2. FUNCIONALIDAD: RELOJ EN TIEMPO REAL (index.html)
       ========================================== */
    const relojElement = document.getElementById('reloj-digital');

    if (relojElement) {
        const actualizarReloj = () => {
            const ahora = new Date();
            const horas = String(ahora.getHours()).padStart(2, '0');
            const minutos = String(ahora.getMinutes()).padStart(2, '0');
            const segundos = String(ahora.getSeconds()).padStart(2, '0');
            
            relojElement.textContent = `${horas}:${minutos}:${segundos}`;
        };

        // Ejecución inicial inmediata para evitar el retraso de 1 segundo
        actualizarReloj();
        // Actualización contínua cada 1 segundo (1000ms)
        setInterval(actualizarReloj, 1000);
    }

    /* ==========================================
       3. FUNCIONALIDAD: FILTRO DE HABITACIONES (habitaciones.html)
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

    /* ==========================================
       4. FUNCIONALIDAD: BUSCADOR EN TIEMPO REAL Y DESPLEGABLES (huespedes.html)
       ========================================== */
    const inputBuscador = document.getElementById('buscador-huespedes');
    const tarjetasHuesped = document.querySelectorAll('.tarjeta-huesped');
    const seccionDirectorio = document.getElementById('seccion-directorio');
    const btnDirectorio = document.querySelector('[data-bs-target="#seccion-directorio"]');
    const seccionHistorial = document.getElementById('seccion-historial');
    const btnHistorial = document.querySelector('[data-bs-target="#seccion-historial"]');

    // Buscador en tiempo real
    if (inputBuscador) {
        inputBuscador.addEventListener('keyup', (e) => {
            const textoBusqueda = e.target.value.toLowerCase();

            tarjetasHuesped.forEach(tarjeta => {
                const nombreHuesped = tarjeta.querySelector('.nombre-huesped').textContent.toLowerCase();

                if (nombreHuesped.includes(textoBusqueda)) {
                    tarjeta.style.display = 'block';
                } else {
                    tarjeta.style.display = 'none';
                }
            });
        });
    }

    // Cambio dinámico del texto del botón (Ver / Ocultar Directorio)
    if (seccionDirectorio && btnDirectorio) {
        seccionDirectorio.addEventListener('shown.bs.collapse', () => {
            btnDirectorio.textContent = 'Ocultar Directorio';
        });

        seccionDirectorio.addEventListener('hidden.bs.collapse', () => {
            btnDirectorio.textContent = 'Ver Directorio';
        });
    }

    // Cambio dinámico del texto del botón (Consultar / Ocultar Historial)
    if (seccionHistorial && btnHistorial) {
        seccionHistorial.addEventListener('shown.bs.collapse', () => {
            btnHistorial.textContent = 'Ocultar Historial';
        });

        seccionHistorial.addEventListener('hidden.bs.collapse', () => {
            btnHistorial.textContent = 'Consultar';
        });
    }

    /* ==========================================
       5. FUNCIONALIDAD: Mantenimiento (mantenimiento.html)
       ========================================== */
    const seccionReportes = document.getElementById('seccion-reportes');
    const btnReportes = document.querySelector('[data-bs-target="#seccion-reportes"]');
    const seccionCronograma = document.getElementById('seccion-cronograma');
    const btnCronograma = document.querySelector('[data-bs-target="#seccion-cronograma"]');

    // Cambio dinámico del texto de los botones (Ver / Ocultar)
    if (seccionReportes && btnReportes) {
        seccionReportes.addEventListener('shown.bs.collapse', () => {
            btnReportes.textContent = 'Ocultar Reportes';
        });

        seccionReportes.addEventListener('hidden.bs.collapse', () => {
            btnReportes.textContent = 'Ver Reportes';
        });
    }

    if (seccionCronograma && btnCronograma) {
        seccionCronograma.addEventListener('shown.bs.collapse', () => {
            btnCronograma.textContent = 'Ocultar Cronograma';
        });

        seccionCronograma.addEventListener('hidden.bs.collapse', () => {
            btnCronograma.textContent = 'Ver Cronograma';
        });
    }

    // Alternar reporte entre Resuelto / Pendiente
    const botonesResolver = document.querySelectorAll('.btn-resolver');

    if (botonesResolver.length > 0) {
        botonesResolver.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const tarjeta = e.target.closest('.card');
                const titulo = tarjeta.querySelector('.titulo-reporte');
                const estadoBadge = tarjeta.querySelector('.estado-badge');

                if (tarjeta && estadoBadge) {
                    const estaResuelto = estadoBadge.classList.contains('bg-success');

                    if (!estaResuelto) {
                        // Cambiar a Solucionado
                        tarjeta.classList.remove('border-0');
                        tarjeta.classList.add('border', 'border-success', 'border-2');

                        if (titulo) {
                            titulo.classList.add('text-decoration-line-through', 'text-muted');
                        }

                        estadoBadge.classList.remove('bg-danger');
                        estadoBadge.classList.add('bg-success');
                        estadoBadge.textContent = 'Solucionado';

                        // Actualizar botón para permitir revertir
                        e.target.textContent = 'Marcar como pendiente';
                        e.target.classList.remove('btn-outline-success');
                        e.target.classList.add('btn-outline-danger');
                    } else {
                        // Volver a Pendiente
                        tarjeta.classList.remove('border', 'border-success', 'border-2');
                        tarjeta.classList.add('border-0');

                        if (titulo) {
                            titulo.classList.remove('text-decoration-line-through', 'text-muted');
                        }

                        estadoBadge.classList.remove('bg-success');
                        estadoBadge.classList.add('bg-danger');
                        estadoBadge.textContent = 'Pendiente';

                        // Restaurar botón original
                        e.target.textContent = 'Marcar como resuelto';
                        e.target.classList.remove('btn-outline-danger');
                        e.target.classList.add('btn-outline-success');
                    }
                }
            });
        });
    }
});