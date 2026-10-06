# PROYECTOS R&F, C.A. - Portal Web Corporativo

Sitio web corporativo moderno y de alta fidelidad para **PROYECTOS R&F, C.A.** (RIF: J-29843884-3), empresa especializada en soldadura y fabricación de tuberías, detección de utilidades subterráneas con georadar, alquiler y montaje de andamios Cup-Lock, pruebas hidrostáticas hasta 15.000 PSI e inspección con Holliday detector.

---

## ⚡ Tecnologías y Herramientas

*   **Entorno de desarrollo y empaquetado**: [Vite](https://vitejs.dev/) v6+ (ES Modules, Hot Module Replacement ultra-rápido, Rollup bundling).
*   **Frontend**: HTML5 Semántico, Vanilla CSS3 (Variables de diseño en `:root`, sistema de tokens, Glassmorphism, diseño adaptativo mobile-first), JavaScript ES6+ modular.
*   **Iconografía y Tipografía**: FontAwesome 6, Google Fonts (`Syne`, `Outfit`, `DM Sans`, `Inter`).
*   **Mapas interactivos**: Leaflet.js para zonas operativas en Barcelona, Complejo Jose y Oriente venezolano.

---

## 🚀 Puesta en Marcha Rápida (Vite)

### 1. Requisitos
*   [Node.js](https://nodejs.org/) (versión 18 o superior).

### 2. Instalación de dependencias
```bash
npm install
```

### 3. Servidor de Desarrollo Local
Para iniciar el servidor con recarga instantánea en tiempo real (HMR):
```bash
npm run dev
```
Abre en tu navegador la URL indicada por la consola (generalmente `http://localhost:5173`).

### 4. Compilación para Producción (Build)
Para compilar y optimizar todos los assets (minificación de CSS, JS con tree-shaking y compresión):
```bash
npm run build
```
Los archivos optimizados listos para producción se generan en la carpeta `/dist`.

### 5. Previsualizar la Compilación de Producción
```bash
npm run preview
```

---

## 📂 Estructura del Proyecto

*   **Páginas Principales (HTML)**:
    *   `index.html`: Portal principal (hero interactivo, 7 líneas de servicio, contratos 100% ejecutados, galería técnica, políticas corporativas y clientes).
    *   `areas-de-servicio.html`: Cobertura operativa y mapa interactivo de sedes/complejos petroleros.
    *   `faq.html`: Preguntas frecuentes técnicas y normativas de seguridad (PDVSA, ASME, ASTM).
    *   `solicitar-presupuesto.html`: Formulario técnico interactivo con validación y confirmación inmediata vía WhatsApp e ingeniería.
*   **Assets y Código Fuente (`static/`)**:
    *   `static/css/style.css`: Sistema de diseño global (paleta Deep Slate Navy, Esmeralda y Titanio).
    *   `static/js/script.js`: Motor de interactividad, menú off-canvas, animaciones fluidas y tickers.
*   **Recursos Estáticos (`public/`)**:
    *   `public/static/images/`: Logotipos, fotografías técnicas de campo y proyectos.
    *   `public/static/videos/`: Video institucional del logo corporativo.
*   **Configuración**:
    *   `vite.config.js`: Configuración multi-página (`main`, `areas`, `faq`, `presupuesto`) y carpeta de salida `dist/`.
    *   `package.json`: Scripts de desarrollo y dependencias de Vite.

