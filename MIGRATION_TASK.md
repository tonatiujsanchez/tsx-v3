# MIGRATION_TASK.md

## Tarea actual

Fase 13 — COMPLETADA. font-display swap + Paralucent eliminado. Performance /blog: 74→81, /blog/slug: 71→78.

## Siguiente tarea sugerida (opcional)

Fase 14 — Conversión TTF → WOFF2 (requiere herramienta externa como `woff2` CLI o `fonttools`).
Estimación: +3-5 puntos Performance adicionales. Baja prioridad si el sitio ya está en producción.

## Contexto

La Fase 12 eliminó Boxicons CDN y reemplazó iconos por SVG inline locales.

Resultado:
- Boxicons CDN eliminado.
- `pnpm astro check`: 0 errores.
- `pnpm build`: limpio.
- Lighthouse mejoró:
  - `/blog`: Performance 58 → 74.
  - `/blog/[slug]`: Performance 66 → 71.

Pendiente detectado:
- Fuentes locales `poppins.css` y `paralucent.css` siguen siendo render-blocking.
- Posible mejora con `font-display: swap`, preload selectivo y reducción de pesos cargados.

## Objetivo

Optimizar la carga de fuentes locales para mejorar Lighthouse Performance sin romper la identidad visual del sitio.

La solución debe:
- mantener Poppins y Paralucent si son parte del diseño actual.
- reducir bloqueo de renderizado.
- evitar cargar pesos innecesarios.
- preservar diseño visual.
- no instalar dependencias.

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- `PERFORMANCE_REPORT.md`
- `FINAL_RELEASE_CHECKLIST.md`
- `BLOG_RELEASE_CHECKLIST.md`
- `src/layouts/BaseLayout.astro`
- `src/styles/globals.css`
- `public/fonts/**`
- `package.json`
- `astro.config.mjs`

## Comandos baratos permitidos

Usar primero:

    git status --short
    git diff --stat
    find public/fonts -maxdepth 4 -type f | sort
    rg "poppins|paralucent|font-face|font-display|preload|fonts|stylesheet" src public -n

## Archivos permitidos para edición

- `src/layouts/BaseLayout.astro`
- `src/styles/globals.css`
- archivos CSS dentro de `public/fonts/**`, solo si contienen `@font-face`.
- `PERFORMANCE_REPORT.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Archivos prohibidos

No modificar:

- `src/components/**`
- `src/pages/**`
- `src/scripts/**`
- `src/content/**`
- `src/data/**`
- `src/icons/**`
- archivos binarios de fuentes `.ttf`, `.otf`, `.woff`, `.woff2`
- `package.json`
- `pnpm-lock.yaml`
- `astro.config.mjs`
- `tsconfig.json`

Si necesitas modificar un archivo prohibido, primero explica por qué y espera confirmación.

## Alcance exacto

### 1. Auditar carga actual de fuentes

Identificar:

- cómo se cargan `poppins.css` y `paralucent.css`.
- cuántos pesos se cargan.
- si usan `@font-face`.
- si tienen `font-display`.
- si se cargan por `<link rel="stylesheet">`.
- qué fuentes/pesos realmente usa el sitio.

No hacer cambios antes de entender el alcance.

### 2. Agregar `font-display: swap`

En los archivos CSS de fuentes, agregar:

    font-display: swap;

a cada `@font-face`.

Reglas:
- No modificar archivos binarios.
- No cambiar nombres de fuentes.
- No cambiar rutas de fuentes.
- No eliminar pesos sin revisar uso primero.

### 3. Optimizar carga en `BaseLayout.astro`

Revisar si actualmente se cargan CSS de fuentes como render-blocking.

Opciones permitidas:

- preload selectivo de los pesos principales.
- mantener stylesheet si es necesario.
- evitar preload masivo de todos los pesos.
- evitar cargar 40 fuentes si no se usan.

Reglas:
- No hacer preload de todos los archivos.
- No agregar hacks frágiles.
- No romper visual.
- No duplicar cargas.

### 4. Reducir pesos si es seguro

Si se detecta que se cargan muchos pesos no usados, proponer reducción mínima.

Pesos probables necesarios:
- Poppins regular.
- Poppins medium/semi-bold.
- Poppins bold.
- Paralucent si se usa en títulos/logo.

Reglas:
- Si no hay certeza, no borrar.
- Preferir documentar como pendiente antes que romper tipografía.
- No eliminar archivos de fuentes.
- No modificar assets binarios.

### 5. Validar

Ejecutar:

    pnpm astro check
    pnpm build
    git diff --stat

Si el entorno permite:

    pnpm preview

Ejecutar Lighthouse si es posible:

    pnpm dlx lighthouse http://localhost:4321/blog --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless"

    pnpm dlx lighthouse http://localhost:4321/blog/claude-code-sin-gastar-tantos-tokens --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless"

## Fuera de alcance

- No rediseñar UI.
- No cambiar fuente principal por otra.
- No instalar dependencias.
- No convertir fuentes manualmente.
- No borrar archivos binarios.
- No modificar componentes.
- No modificar contenido.
- No cambiar arquitectura.
- No optimizar imágenes en esta fase.

## Criterios de aceptación

- Las fuentes locales tienen `font-display: swap`.
- Se redujo o documentó el impacto render-blocking.
- No se rompió tipografía visual.
- `pnpm astro check` pasa.
- `pnpm build` pasa.
- Lighthouse mejora o se documenta claramente por qué no.
- `PERFORMANCE_REPORT.md` queda actualizado.
- `MIGRATION_STATUS.md` queda actualizado.
- No hay cambios fuera del alcance.

## Validaciones

Ejecutar:

    pnpm astro check
    pnpm build
    git diff --stat

Si es posible:

    pnpm preview

Revisar:

    /
    /blog
    /blog/claude-code-sin-gastar-tantos-tokens
    /projects/admin-sites

## Respuesta esperada

Responder solo con:

1. Fuentes auditadas.
2. Optimización aplicada.
3. Archivos modificados.
4. Resultado de `pnpm astro check`.
5. Resultado de `pnpm build`.
6. Resultado Lighthouse si se pudo ejecutar.
7. Pendientes.
8. Veredicto performance.