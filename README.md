# ONYXLINK — Landing

Landing page de venta para **ONYXLINK** — bento grid estilo Apple, blanco y negro sobre
fondo negro, glows elegantes, animaciones *liquid glass*, tipografía **Unbounded**.
Estructura de oferta estilo Alex Hormox (dream outcome → mecanismo → value stack →
planes → garantía → bonus → FAQ → CTA final).

Sitio **100% estático**. Sin build, sin dependencias. Se despliega en Vercel tal cual.

## Estructura

```
index.html      Todo el contenido y las secciones
styles.css      Sistema de diseño (bento, glass, glows, gráficas, responsive)
script.js       Scroll reveal, glow al cursor, marquesina del banner, count-up, nav sticky
fonts/          Hikasami Sans (.woff2) + OFL.txt
imagenes/       Imágenes del sitio. logo.svg = logo del menú (reemplázalo por el real)
favicon.svg
vercel.json     Clean URLs + cabeceras de seguridad + cache de assets
```

## Logo

El logo del menú es `imagenes/logo.svg`. Sustitúyelo por el archivo real
(mismo nombre) o pon otro formato en `imagenes/` y cambia el `src` del
`<img class="nav__logo">` en `index.html`. Arte claro/blanco, fondo transparente.

## Antes de publicar — conecta los CTA

Abre `script.js` y edita el objeto `LINKS` (arriba del todo):

```js
var LINKS = {
  signup: 'https://app.tudominio.com/signup',            // botones "Empezar gratis"
  sales:  'https://wa.me/34XXXXXXXXX?text=Quiero%20info', // botón "Hablar con ventas" (plan Scale)
};
```

Mientras estén en `'#'`, los botones hacen scroll a la sección final.

## Contenido a revisar (marcado como editable)

- **Bonus / "Si entras ahora"** (`#bonus`): "Puesta en marcha guiada 1:1", "Migración asistida"
  y "Precio de fundador bloqueado" no venían en el PDF de oferta. Ajusta o quita según lo que ofrezcáis de verdad.
- Cifras, planes, límites y garantía salen del PDF `oferta-aura-bento.pdf`.

## Desplegar en Vercel

### Opción A — Dashboard (sin instalar nada)
1. Sube esta carpeta a un repo de GitHub/GitLab.
2. En vercel.com → **Add New… → Project** → importa el repo.
3. Framework Preset: **Other**. Build Command: *(vacío)*. Output Directory: *(vacío / raíz)*.
4. **Deploy**.

### Opción B — Vercel CLI
```bash
npm i -g vercel
vercel        # preview
vercel --prod # producción
```

### Opción C — Drag & drop
vercel.com/new → arrastra la carpeta.

## Ver en local

No hay proceso de build. Cualquier servidor estático sirve, por ejemplo:

```bash
npx serve .
```

o abre `index.html` directamente en el navegador (las fuentes de Google necesitan conexión).
