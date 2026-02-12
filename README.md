# Glow & Grace Salon Landing Page

Una Landing Page moderna y premium para salón de belleza, diseñada con estética "Dark Luxury" e integrada con automatización n8n.

## 🚀 Características

- **Diseño Premium Dark Mode:** Paleta de colores violeta (#A855F7) sobre fondos oscuros.
- **Micro-interacciones:** Animaciones 3D, Glassmorphism, y efectos de partículas.
- **Flip Cards de Servicios:** Tarjetas interactivas para mostrar los servicios.
- **Formulario Integrado:** Conexión directa a webhook de n8n para gestión de citas.
- **100% Responsive:** Adaptada a todos los dispositivos móviles y desktop.

## 🛠️ Tecnologías

- **HTML5:** Estructura semántica.
- **CSS3:** Variables, Flexbox/Grid, Animations.
- **JavaScript (Vanilla):** Lógica de interacción y fetch API.
- **Librerías:** 
    - `Lucide Icons` (Iconografía)
    - `SweetAlert2` (Notificaciones modales)

## 📦 Instalación y Despliegue

La web es estática, por lo que puede desplegarse en cualquier servidor web (Apache, Nginx, Vercel, Netlify, Hostinger).

1.  **Subir archivos:** Sube `index.html`, `styles.css` y `script.js` a tu carpeta `public_html` o raíz del servidor.
2.  **Verificar:** Accede a tu dominio y verifica que cargue correctamente.

## ⚙️ Configuración

### Webhook n8n
El formulario envía los datos por POST a la URL configurada en `script.js` línea 100:

```javascript
const N8N_WEBHOOK_URL = 'https://n8n.nexamentia.com/webhook/1306a6cb-608a-471a-a84b-f07f981c67da';
```

Si cambias la URL del webhook, actualiza esta línea.

### Imágenes (Placeholders)
Actualmente el proyecto usa **Placeholders** (imágenes generadas por código) debido a límites de API en el momento de la creación.

Para poner tus propias fotos:
1.  Guarda tus fotos en una carpeta `images/` (ej: `images/corte.jpg`).
2.  Edita `index.html` y busca las líneas que contienen `style="background-image: url('https://placehold.co/...'`.
3.  Cambia la URL por tu imagen local: `style="background-image: url('images/corte.jpg')`.

## 🎨 Personalización

Para cambiar el color principal, edita `styles.css` en la sección `:root`:

```css
:root {
    --primary-500: #nuevo_color;
    /* Actualiza también los derivados 50-900 y el RGB */
}
```
