# Astro Portfolio Multilenguaje

Este proyecto es una plantilla minimalista para crear un portafolio personal, basada en el esquema de [JSON Resume](https://jsonresume.org/schema). Está inspirado en los repositorios de [minimalist-portfolio-json](https://github.com/midudev/minimalist-portfolio-json) y [cv](https://github.com/BartoszJarocki/cv), pero con mejoras y funcionalidades adicionales.

## Índice

- [Astro Portfolio Multilenguaje](#astro-portfolio-multilenguaje)
  - [Índice](#índice)
  - [Características](#características)
  - [Instalación](#instalación)
  - [Cómo Personalizar](#cómo-personalizar)
  - [Repositorios de Inspiración](#repositorios-de-inspiración)
  - [Licencia](#licencia)

## Características

- **Basado en JSON Resume**: Facilita la generación de currículums estandarizados y personalizables.
- **Traducción Automática**: Soporte para múltiples idiomas con generación automática de páginas traducidas.
- **Contenido Personalizable**: Modifica los archivos JSON para cambiar los datos de tu portafolio y actualizar las secciones.

## Instalación

1. Clona este repositorio:

    ```bash
    git clone https://github.com/ClearCB/portfolio-json.git
    cd portfolio-json
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Inicia el entorno de desarrollo:

    ```bash
    npm run dev
    ```

## Cómo Personalizar

1. **Cambiar el contenido**:

    El contenido del portafolio se encuentra en los archivos JSON dentro de la carpeta `data`. Modifica estos archivos para ajustar la información a tu gusto. Además, deberás de adaptar los tipos y configuraciones adicionales para permitir contenido diferente adecuado a tus necesidades.

2. **Agregar nuevos idiomas**:

    - Para añadir traducciones, crea una nueva carpeta dentro de `data` con los archivos JSON correspondientes al nuevo idioma.
    - Crea una carpeta dentro de `pages` para el nuevo idioma y las páginas se generarán automáticamente utilizando el contenido traducido.

3. **Modificar Secciones**:

    Puedes ajustar el diseño de las secciones del portafolio editando los componentes de Astro dentro de la carpeta `src/components`.

## Repositorios de Inspiración

Este proyecto toma como base los siguientes repositorios:

- [minimalist-portfolio-json](https://github.com/midudev/minimalist-portfolio-json)
- [cv](https://github.com/BartoszJarocki/cv)

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
