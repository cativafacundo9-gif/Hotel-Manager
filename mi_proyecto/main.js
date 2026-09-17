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

    /* ==========================================
       6. FUNCIONALIDAD: MÓDULO RESERVAS (reservas.html)
       ========================================== */
    const seccionNuevaReserva = document.getElementById('seccion-nueva-reserva');
    const btnNuevaReserva = document.querySelector('[data-bs-target="#seccion-nueva-reserva"]');
    const seccionListadoReservas = document.getElementById('seccion-listado-reservas');
    const btnListadoReservas = document.querySelector('[data-bs-target="#seccion-listado-reservas"]');
    const formReserva = document.getElementById('form-reserva');
    const alertaReserva = document.getElementById('alerta-reserva');
    const contenedorReservas = document.getElementById('contenedor-reservas');

    // Datos iniciales de prueba si no existen reservas guardadas
    const reservasIniciales = [
        {
            id: 1,
            nombre: 'Juan Pérez',
            habitacion: '102 - Suite Presidencial',
            ingreso: '2026-09-20',
            salida: '2026-09-25',
            estado: 'Confirmada'
        },
        {
            id: 2,
            nombre: 'María Gómez',
            habitacion: '204 - Doble Superior',
            ingreso: '2026-09-22',
            salida: '2026-09-28',
            estado: 'Check-In'
        }
    ];

    // Obtener reservas de localStorage o inicializar
    const obtenerReservas = () => {
        const almacenadas = localStorage.getItem('reservas_hotel');
        if (!almacenadas) {
            localStorage.setItem('reservas_hotel', JSON.stringify(reservasIniciales));
            return reservasIniciales;
        }
        return JSON.parse(almacenadas);
    };

    // Renderizar tarjetas de reservas en el DOM
    const renderizarReservas = () => {
        if (!contenedorReservas) return;

        const reservas = obtenerReservas();
        contenedorReservas.innerHTML = '';

        if (reservas.length === 0) {
            contenedorReservas.innerHTML = `
                <div class="col-12 text-center py-4">
                    <p class="text-muted mb-0">No hay reservas registradas actualmente.</p>
                </div>`;
            return;
        }

        reservas.forEach(reserva => {
            const col = document.createElement('article');
            col.className = 'col';
            col.innerHTML = `
                <div class="card h-100 border-0 shadow-sm bg-white rounded-3 p-3">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h4 class="h6 fw-bold text-dark mb-0">${reserva.nombre}</h4>
                            <span class="badge ${reserva.estado === 'Check-In' ? 'bg-success' : 'bg-primary'}">${reserva.estado}</span>
                        </div>
                        <p class="card-text text-muted small mb-1"><strong>Habitación:</strong> ${reserva.habitacion}</p>
                        <p class="card-text text-muted small mb-1"><strong>Ingreso:</strong> ${reserva.ingreso}</p>
                        <p class="card-text text-muted small mb-3"><strong>Salida:</strong> ${reserva.salida}</p>
                        <button class="btn btn-sm btn-outline-danger btn-eliminar-reserva w-100 mt-auto fw-semibold" data-id="${reserva.id}">
                            Cancelar Reserva
                        </button>
                    </div>
                </div>`;
            contenedorReservas.appendChild(col);
        });

        // Eventos para eliminar reserva
        const botonesEliminar = contenedorReservas.querySelectorAll('.btn-eliminar-reserva');
        botonesEliminar.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idEliminar = Number(e.target.getAttribute('data-id'));
                const reservasActuales = obtenerReservas();
                const reservasFiltradas = reservasActuales.filter(r => r.id !== idEliminar);
                localStorage.setItem('reservas_hotel', JSON.stringify(reservasFiltradas));
                renderizarReservas();
            });
        });
    };

    // Alternar texto del botón (Crear Reserva / Ocultar Formulario)
    if (seccionNuevaReserva && btnNuevaReserva) {
        seccionNuevaReserva.addEventListener('shown.bs.collapse', () => {
            btnNuevaReserva.textContent = 'Ocultar Formulario';
        });

        seccionNuevaReserva.addEventListener('hidden.bs.collapse', () => {
            btnNuevaReserva.textContent = 'Crear Reserva';
        });
    }

    // Alternar texto del botón (Ver Listado / Ocultar Listado)
    if (seccionListadoReservas && btnListadoReservas) {
        seccionListadoReservas.addEventListener('shown.bs.collapse', () => {
            btnListadoReservas.textContent = 'Ocultar Listado';
            renderizarReservas();
        });

        seccionListadoReservas.addEventListener('hidden.bs.collapse', () => {
            btnListadoReservas.textContent = 'Ver Listado';
        });
    }

    // Validación y guardado del formulario
    if (formReserva) {
        formReserva.addEventListener('submit', (e) => {
            e.preventDefault(); // Intercepta el envío del formulario

            const nombre = document.getElementById('nombre-huesped').value.trim();
            const habitacion = document.getElementById('tipo-habitacion').value;
            const ingreso = document.getElementById('fecha-ingreso').value;
            const salida = document.getElementById('fecha-salida').value;

            // Validación: Verificar que ningún campo esté vacío
            if (!nombre || !habitacion || !ingreso || !salida) {
                if (alertaReserva) {
                    alertaReserva.className = 'alert alert-danger mb-3';
                    alertaReserva.textContent = 'Por favor, complete todos los campos obligatorios.';
                }
                return;
            }

            // Crear objeto de reserva
            const nuevaReserva = {
                id: Date.now(),
                nombre: nombre,
                habitacion: habitacion,
                ingreso: ingreso,
                salida: salida,
                estado: 'Confirmada'
            };

            // Guardar en localStorage
            const reservas = obtenerReservas();
            reservas.push(nuevaReserva);
            localStorage.setItem('reservas_hotel', JSON.stringify(reservas));

            // Mostrar mensaje de éxito
            if (alertaReserva) {
                alertaReserva.className = 'alert alert-success mb-3';
                alertaReserva.textContent = 'Reserva simulada con éxito.';
            }

            // Resetear formulario
            formReserva.reset();

            // Actualizar el listado si está visible
            renderizarReservas();
        });
    }

    // Renderizado inicial al cargar la página si la sección está presente
    if (contenedorReservas) {
        renderizarReservas();
    }
});