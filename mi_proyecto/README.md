# Sistema de Gestión Hotelera - TP2

## Integrantes
- Cativa Facundo Simón

## Descripción
Este proyecto es la interfaz web para un sistema de gestión de hotel. Permite a los administradores navegar por los distintos módulos: Habitaciones, Reservas, Huéspedes y Mantenimiento.

## Tecnologías utilizadas
- HTML5 (Semántico)
- CSS3 (Variables, Flexbox, Grid, Media Queries)
- Git y GitHub

## Detalles Técnicos
- **¿Dónde utilice Flexbox?** Se implementó en el `.header` para alinear el logo y la barra de navegación de manera horizontal, y en el `ul` del nav para distribuir los enlaces.
- **¿Dónde utilice Grid?** Se implementó en la sección `.grid-modulos` del contenido principal, creando una cuadrícula adaptable para las tarjetas de cada sección del hotel usando `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));`.
- **¿Qué variables CSS creé?** Creamos variables en el `:root` para la paleta de colores (`--color-primario`, `--color-secundario`, etc.), la tipografía (`--fuente-principal`), los radios de los bordes y las sombras (`--sombra-caja`).
- **¿Cómo implementé el Responsive Design?** Utilizamos la etiqueta `<meta name="viewport">` en el HTML y `@media queries` en el CSS. Cuando la pantalla es menor a 768px, el Flexbox del header cambia a `flex-direction: column` para adaptarse a celulares.

## Estrategias SEO aplicadas
1. **Etiqueta Title:** Títulos descriptivos en cada página.
2. **Meta Description:** Descripción concisa del contenido de la página para los motores de búsqueda.
3. **HTML5 Semántico:** Uso de etiquetas `<header>`, `<main>`, `<section>`, `<article>`, `<nav>` y `<footer>`.
4. **Jerarquía de encabezados:** Uso de un único `<h1>` por página, seguido lógicamente por `<h2>`.
5. **Atributos ALT:** Implementados en todas las imágenes (`<img>`) para accesibilidad y lectura de bots.