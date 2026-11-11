# Instrucciones para Claude Code

Este repo contiene todo lo necesario para construir la sección de portafolio del caso **Ivra**.

## Orden de trabajo

1. Lee `BRIEF.md` completo antes de escribir una línea. Define stack, tokens, estructura y la animación del punto.
2. Lee `CONTENIDO.md`. Todos los textos ya están escritos y aprobados; no los reescribas.
3. Revisa `assets/` y `docs/` para ver qué material hay.
4. Abre `prototipo/index.html` en el navegador para entender la app antes de maquetar la parte del producto.
5. Propón la estructura de archivos y espera luz verde antes de generar 15 componentes.

## Qué entregar

- Una ruta `/trabajo/ivra` (o la que use el portafolio) con la página completa.
- Componentes separados por sección, no un archivo de 2.000 líneas.
- El prototipo copiado a `public/prototipo/ivra/index.html` y embebido en la sección 12.
- Un `README` corto explicando cómo correr y dónde tocar los textos.

## Reglas que no se negocian

- Rosa = acción de la persona. Menta = acción de la IA. Nunca juntos en el mismo elemento.
- El punto de la "i" es el hilo conductor del scroll. Un solo componente lo controla.
- Fondo noche en el 70% de la página. El único bloque de color completo es el cierre, en menta.
- Nada de glows, destellos ni partículas.
- `prefers-reduced-motion` respetado en todo.
- Contraste AA mínimo, un solo `<h1>`, `alt` en español en todas las imágenes (los textos están en `CONTENIDO.md`).
- El proyecto es conceptual: no inventes métricas de resultado ni datos de investigación.

## Pendientes que debes preguntar antes de cerrar

- El año del proyecto y la duración real (en `CONTENIDO.md` aparecen como `[AÑO]`).
- Si el portafolio ya tiene un sistema de tipografía propio, para decidir si Unbounded convive o se queda solo en los títulos del caso.
- A dónde apuntan los dos enlaces del cierre.
