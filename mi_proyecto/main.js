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
       3. FUNCIONALIDAD: FILTRO Y DETALLES DE HABITACIONES (habitaciones.html)
       ========================================== */
    const botonesFiltro = document.querySelectorAll('.btn-filtro');
    const tarjetasHabitacion = document.querySelectorAll('.tarjeta-habitacion');
    const botonesDetallesHab = document.querySelectorAll('.btn-detalles');

    // A) Lógica de filtrado de estado (Disponibles / Ocupadas)
    if (botonesFiltro.length > 0) {
        botonesFiltro.forEach(boton => {
            boton.addEventListener('click', (e) => {
                
                // Estilos visuales de los botones
                botonesFiltro.forEach(btn => {
                    btn.classList.remove('btn-dark');
                    btn.classList.add('btn-outline-dark');
                });
                e.target.classList.remove('btn-outline-dark');
                e.target.classList.add('btn-dark');

                // Lógica de filtrado
                const filtro = e.target.getAttribute('data-filtro');

                tarjetasHabitacion.forEach(tarjeta => {
                    const estadoHabitacion = tarjeta.getAttribute('data-estado');

                    if (filtro === 'todas' || estadoHabitacion === filtro) {
                        tarjeta.style.display = 'block';
                    } else {
                        tarjeta.style.display = 'none';
                    }
                });
            });
        });
    }

    // B) Lógica para alternar el texto "Ver Detalles" / "Ocultar Detalles"
    if (botonesDetallesHab.length > 0) {
        botonesDetallesHab.forEach(btn => {
            // Buscamos el elemento colapsable asociado (usando el data-bs-target del botón)
            const targetId = btn.getAttribute('data-bs-target');
            const collapseElement = document.querySelector(targetId);

            if (collapseElement) {
                // Evento cuando se muestra el detalle
                collapseElement.addEventListener('shown.bs.collapse', () => {
                    btn.textContent = 'Ocultar Detalles';
                });
                
                // Evento cuando se oculta el detalle
                collapseElement.addEventListener('hidden.bs.collapse', () => {
                    btn.textContent = 'Ver Detalles';
                });
            }
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

                        // Actualizar botón para revertir
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
                        <div class="d-flex justify-content-between text-muted small mt-2">
                            <span><i class="bi bi-box-arrow-in-right"></i> ${reserva.ingreso}</span>
                            <span><i class="bi bi-box-arrow-right"></i> ${reserva.salida}</span>
                        </div>
                    </div>
                </div>
            `;
            contenedorReservas.appendChild(col);
        });
    };

    // Cambio dinámico de botones de colapsables (Nueva Reserva)
    if (seccionNuevaReserva && btnNuevaReserva) {
        seccionNuevaReserva.addEventListener('shown.bs.collapse', () => {
            btnNuevaReserva.textContent = 'Cancelar / Ocultar';
            btnNuevaReserva.classList.replace('btn-dark', 'btn-outline-danger');
        });

        seccionNuevaReserva.addEventListener('hidden.bs.collapse', () => {
            btnNuevaReserva.textContent = 'Crear Nueva Reserva';
            btnNuevaReserva.classList.replace('btn-outline-danger', 'btn-dark');
            if (formReserva) formReserva.reset(); // Limpiar al ocultar
        });
    }

    // Cambio dinámico de botones de colapsables (Listado)
    if (seccionListadoReservas && btnListadoReservas) {
        seccionListadoReservas.addEventListener('shown.bs.collapse', () => {
            btnListadoReservas.textContent = 'Ocultar Listado';
        });

        seccionListadoReservas.addEventListener('hidden.bs.collapse', () => {
            btnListadoReservas.textContent = 'Ver Listado de Reservas';
        });
    }

    // Lógica para guardar una nueva reserva
    if (formReserva) {
        formReserva.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Obtener valores del formulario
            const nombre = document.getElementById('clienteNombre').value;
            const habitacionSelect = document.getElementById('habitacionSelect');
            const habitacionTexto = habitacionSelect.options[habitacionSelect.selectedIndex].text;
            const fechaIngreso = document.getElementById('fechaIngreso').value;
            const fechaSalida = document.getElementById('fechaSalida').value;

            // 2. Validación básica de fechas
            if (new Date(fechaSalida) <= new Date(fechaIngreso)) {
                alert("La fecha de salida debe ser posterior a la de ingreso.");
                return;
            }

            // 3. Crear el nuevo objeto reserva
            const nuevaReserva = {
                id: Date.now(),
                nombre: nombre,
                habitacion: habitacionTexto,
                ingreso: fechaIngreso,
                salida: fechaSalida,
                estado: 'Confirmada'
            };

            // 4. Guardar en localStorage
            const reservas = obtenerReservas();
            reservas.push(nuevaReserva);
            localStorage.setItem('reservas_hotel', JSON.stringify(reservas));

            // 5. Mostrar feedback visual temporal
            if (alertaReserva) {
                alertaReserva.style.display = 'block';
                setTimeout(() => {
                    alertaReserva.style.display = 'none';
                }, 3000); // Se oculta a los 3 segundos
            }

            // 6. Actualizar el listado en el DOM
            renderizarReservas();

            // 7. Resetear formulario y cerrar panel
            formReserva.reset();
            const collapseInstancia = bootstrap.Collapse.getInstance(seccionNuevaReserva);
            if(collapseInstancia) collapseInstancia.hide();
        });
    }

    // Inicializar renderizado si estamos en la página de reservas
    if (contenedorReservas) {
        renderizarReservas();
    }

});