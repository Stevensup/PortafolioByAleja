# Ivra — sección de portafolio

Brief para construir la sección de caso de estudio de **Ivra** dentro del portafolio de Alejandra (diseñadora UX/UI y de marca, Bogotá).

Todo el contenido de texto está en `CONTENIDO.md`. Los assets están en `assets/`. El prototipo funcional está en `prototipo/index.html`.

---

## 1. Qué hay que construir

Una página de caso de estudio con **scroll narrativo** que cuenta, en este orden:

1. Cómo se construyó la marca (nombre → símbolo → color → tipografía → voz → aplicaciones).
2. **La app como protagonista**: el problema de UX, el flujo, las pantallas y el prototipo jugable.
3. El sistema de diseño y las decisiones.

La marca es el "cómo llegamos aquí". La app es la estrella. La transición entre las dos partes es el momento más importante de la página.

## 2. Stack

- **Next.js 14+ (App Router) + TypeScript + Tailwind**. Si el portafolio ya existe en otro stack, respétalo y adapta.
- **Framer Motion** para entradas y scroll (`useScroll`, `useTransform`).
- **Lenis** para smooth scroll.
- Sin librerías de UI (nada de shadcn aquí): todo a medida.
- Imágenes con `next/image`, `priority` solo en el hero.
- Deploy en Vercel.

Si prefieres algo sin build: un solo `index.html` con CSS y JS vanilla + GSAP ScrollTrigger también sirve. No mezcles las dos opciones.

## 3. Tokens

```css
--noche:    #120F1E;  /* fondo base, 70% de la página */
--stage:    #0A0812;  /* fondo aún más profundo, para secciones de respiro */
--surf:     #191527;  /* tarjetas */
--surf-2:   #221D36;  /* tarjetas sobre tarjetas */
--line:     #332C4D;  /* bordes 1px */
--mut:      #9B93BC;  /* texto secundario */
--soft:     #C8C2DE;  /* texto de párrafo sobre oscuro */
--blanco:   #FFFFFF;
--rosa:     #FF3FA4;  /* acción del usuario */
--menta:    #3DFFB6;  /* la IA actuó */
--menta-d:  #152B27;  /* fondo de chips menta */
```

**Regla de color, no negociable:** rosa es lo que hace la persona, menta es lo que hizo la IA. Nunca se mezclan dentro del mismo elemento. El color vivo es acento, jamás fondo de sección completa (excepto el cierre).

Proporción objetivo: **70% noche · 20% blanco · 10% rosa + menta**.

### Tipografía

- Titulares: **Unbounded** 800 (Google Fonts). `letter-spacing: -0.035em`.
- Texto e interfaz: **Geist** 400/500/600 (Google Fonts).
- Cifras, etiquetas y metadatos: **Geist Mono** 400/500, `letter-spacing: 0.06em`, mayúsculas.

### Forma

- Radios: 18px (chips), 22–28px (tarjetas), 46px (marcos de teléfono).
- Espaciado base 4. Bloques de sección con 120–160px de aire vertical en desktop, 72–88px en móvil.
- Toque mínimo 44px.
- **El gesto de la marca es un corte diagonal a 24,7°** (el mismo ángulo del corte de la "i"). Úsalo con moderación: una esquina cortada en el botón principal, el borde de un panel, nada más.

## 4. Estructura de secciones

| # | Sección | Fondo | Assets |
|---|---|---|---|
| 01 | Hero | noche | `assets/logo/logo-blanco.svg` |
| 02 | El reto | noche | — |
| 03 | El nombre | noche | — |
| 04 | El símbolo (construcción) | noche | `assets/logo/simbolo.svg` |
| 05 | Color y tipografía | noche | — |
| 06 | Así habla | surf | — |
| 07 | La marca viva | stage | `assets/marca/*`, `assets/campana/*` |
| 08 | **Transición a la app** | noche | `assets/logo/app-icon.png` |
| 09 | El problema de UX | noche | — |
| 10 | El flujo | noche | — |
| 11 | Las pantallas | stage | iframe del prototipo |
| 12 | Pruébala | noche | `prototipo/index.html` |
| 13 | Sistema de diseño | noche | — |
| 14 | Decisiones de UX | noche | — |
| 15 | Contexto y cierre | menta | `assets/logo/logo-noche.svg` |

## 5. La animación que amarra todo: el punto

El punto de la "i" es el hilo conductor de la página. Es un `<div>` fijo (o un SVG `<circle>`) de 14px, menta, con `position: fixed`, que se mueve según el progreso del scroll:

- **Hero:** está en su lugar dentro del logo, latiendo suave (scale 1 → 1.06, 1.9s, `ease-in-out`).
- **Sección 04:** se separa del logo y recorre la diagonal de 24,7° mientras se explica la construcción.
- **Secciones 05–07:** vive en el borde derecho como indicador de progreso del scroll.
- **Sección 08 (la transición clave):** el punto baja al centro, crece y **se convierte en el ícono de la app**, que a su vez se abre en el teléfono. Ese es el gesto que une marca y producto.
- **Secciones 09–14:** vuelve a ser un punto pequeño, ahora **rosa**, junto al título de cada sección.
- **Cierre:** regresa a su posición dentro del logo.

Implementación sugerida: un único componente `<Dot />` con `useScroll` sobre el documento y un array de keyframes por sección (posición, tamaño, color). Nada de animaciones por sección que se peleen entre sí.

**Respeta `prefers-reduced-motion`:** si está activo, el punto no viaja; aparece y desaparece con un fade simple y todo lo demás entra sin desplazamiento.

## 6. Especificaciones por sección

### 01 · Hero
Logo grande centrado (máx. 560px de ancho), tagline debajo, y una línea de metadatos abajo: rol, año, tipo de proyecto. Fondo noche con una retícula de puntos muy tenue (`radial-gradient` de 1.4px cada 44px, `opacity: .35`). Sin scroll-jacking; un indicador discreto de "desliza".

### 04 · El símbolo
Dos columnas: a la izquierda el símbolo grande con las guías de construcción (el corte perpendicular al trazo de la "v" y la trayectoria del punto); a la derecha tres puntos numerados. Las guías se dibujan con SVG `stroke-dasharray` animado al entrar en viewport.

### 07 · La marca viva
Grid tipo bento, no carrusel. Tamaños distintos por pieza: `escultura-persona` y `tarjeta-rostro` grandes, `gorra` y `sobre` medianas, `valla-noche` a todo el ancho. Cada imagen con `object-fit: cover` y radio de 24px. Al pasar el mouse, un zoom muy leve (scale 1.03, 600ms). Sin captions largos: una etiqueta mono de dos palabras por pieza.

### 08 · Transición a la app
Sección sticky de 150vh. El punto crece hasta volverse el app icon, el icon se "abre" en el marco del teléfono y aparece el titular: *"Y entonces, la parte difícil: diseñar la app."* Esta sección no lleva párrafos largos.

### 11 · Las pantallas
Teléfono sticky a la izquierda que cambia de pantalla mientras el texto avanza a la derecha. Cinco pasos: onboarding de autonomía, inicio, chat, detalle y deshacer, metas. Para cada pantalla usa el iframe del prototipo apuntado al estado correspondiente, o capturas estáticas si prefieres (ver nota en §7).

### 12 · Pruébala
El prototipo embebido en un marco de teléfono, a tamaño real (390×844), con un botón "Abrir en pantalla completa". En móvil, reemplázalo por un enlace grande: un iframe de 390px dentro de un móvil de 390px no funciona.

### 15 · Cierre
Único bloque con fondo menta y texto noche. Logo en versión noche, tagline y dos enlaces: siguiente caso y contacto.

## 7. El prototipo

`prototipo/index.html` es un HTML autocontenido (solo depende de Google Fonts) con el flujo completo: bienvenida, registro por celular, código, verificación de identidad, elección de nivel de autonomía, inicio, chat con la IA, detalle con deshacer, metas y reglas.

- Para embeberlo: cópialo a `public/prototipo/index.html` y úsalo en un `<iframe src="/prototipo/index.html" width="390" height="844" loading="lazy" title="Prototipo de la app Ivra">`.
- El marco de teléfono ya viene dentro del HTML, así que **no lo envuelvas en otro marco**: o le quitas el suyo con una variante, o lo muestras tal cual sobre el fondo de la página.
- Para generar capturas estáticas de cada pantalla, ábrelo con Playwright, ejecuta `go('s-home')`, `go('s-chat')`, etc. en el contexto de la página y toma screenshot del `.frame`. Los ids son: `s-splash`, `s-tel`, `s-otp`, `s-id`, `s-auto`, `s-home`, `s-chat`, `s-detalle`, `s-metas`, `s-reglas`.

## 8. Accesibilidad y performance

- Contraste mínimo AA en todo texto. `--mut` sobre `--noche` cumple; no bajes de ahí.
- Un solo `<h1>` por página; jerarquía de headings sin saltos.
- Toda imagen con `alt` descriptivo en español (los textos están en `CONTENIDO.md`).
- `prefers-reduced-motion` respetado en todas las animaciones.
- Imágenes servidas en AVIF/WebP, `sizes` correcto, lazy salvo el hero.
- Objetivo Lighthouse: 95+ en rendimiento y 100 en accesibilidad.

## 9. Qué no hacer

- Nada de glows neón, destellos ni partículas: la marca usa una sola luz de color por pieza.
- Nada de parallax exagerado ni de secuencias que bloqueen el scroll más de 150vh.
- Nada de texto borroso durante los movimientos de cámara (usa `will-change` con cuidado y evita escalar texto).
- No inventes datos de investigación ni métricas de resultado: el proyecto es conceptual y así está rotulado en el contenido.
- No cambies los textos de `CONTENIDO.md` por tu cuenta. Si algo no cabe, acorta la caja, no la frase.
