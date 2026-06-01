# MIGRATION_TASK.md

## Tarea actual

Fase BLOG-7 — COMPLETADA. Blog listo para producción (`BLOG_READY_WITH_NON_BLOCKING_PENDING`).

## Siguiente tarea sugerida

Fase 12 — Performance optimization del sitio completo.

Objetivo: subir Performance de Lighthouse de ~58-66 a ≥90. Principal causa: Boxicons CDN render-blocking.

Opciones:
1. Self-host Boxicons en `public/fonts/` + `@font-face`.
2. Añadir `rel="preconnect"` + `font-display: swap` en BaseLayout.
3. Reemplazar Boxicons por SVG inline en componentes críticos (Navbar, Footer, Hero).

## Estado del blog

## Contexto

El blog ya tiene:

- Content Collection `blog`.
- Primer artículo real publicado o manejable con `draft`.
- Componentes base del blog.
- Páginas `/blog` y `/blog/[slug]`.
- Categorías y tags.
- RSS.
- Sitemap.
- Related posts.
- Estilos editoriales para Markdown largo.
- `/blog` refinado con diseño minimalista y paginación de máximo 10 artículos por página.

Ahora se debe ejecutar QA final del blog antes de considerar el módulo listo para producción.

## Objetivo

Validar que el blog esté listo para producción en:

- funcionalidad.
- rutas.
- drafts.
- SEO.
- RSS.
- sitemap.
- accesibilidad.
- rendimiento.
- diseño visual.
- Lighthouse.

También se debe crear un reporte final:

- `BLOG_RELEASE_CHECKLIST.md`

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- `BLOG_STRATEGY.md`
- `UI_DIRECTION.md`
- `FINAL_RELEASE_CHECKLIST.md`
- `src/content.config.ts`
- `src/content/blog/*.md`
- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`
- `src/pages/blog/page/[page].astro`
- `src/pages/blog/categoria/[category].astro`
- `src/pages/blog/tag/[tag].astro`
- `src/pages/rss.xml.ts`
- `src/pages/sitemap.xml.ts`
- `src/pages/robots.txt.ts`
- `src/layouts/BlogLayout.astro`
- `src/layouts/BaseLayout.astro`
- `src/components/blog/**`
- `src/utils/blog.ts`
- `src/data/site.ts`
- `src/data/navigation.ts`
- `src/styles/globals.css`
- `src/styles/animations.css`
- `package.json`
- `astro.config.mjs`

## Comandos baratos permitidos

Usar primero:

    git status --short
    git diff --stat
    find src/pages/blog -maxdepth 4 -type f | sort
    find src/components/blog -maxdepth 2 -type f | sort
    find src/content/blog -maxdepth 2 -type f | sort
    rg "draft|canonical|og:|twitter:|jsonLd|rss|sitemap|BlogPosting|alt=|aria-label|href=|target=|rel=|pagination|page" src -n

## Archivos permitidos para edición

Correcciones pequeñas y puntuales en:

- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`
- `src/pages/blog/page/[page].astro`
- `src/pages/blog/categoria/[category].astro`
- `src/pages/blog/tag/[tag].astro`
- `src/pages/rss.xml.ts`
- `src/pages/sitemap.xml.ts`
- `src/pages/robots.txt.ts`
- `src/components/blog/**`
- `src/utils/blog.ts`
- `src/content/blog/*.md`, solo para corregir frontmatter inválido.
- `BLOG_RELEASE_CHECKLIST.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Archivos prohibidos

No modificar:

- `src/components/sections/**`
- `src/components/home/**`
- `src/components/project/**`
- `src/components/shared/**`
- `src/layouts/BaseLayout.astro`, salvo error SEO bloqueante.
- `src/styles/**`, salvo bug visual bloqueante del blog.
- `src/scripts/**`
- `src/data/**`, salvo error bloqueante en `siteConfig`.
- `src/icons/**`
- `public/**`
- `package.json`
- `pnpm-lock.yaml`
- `tsconfig.json`
- `astro.config.mjs`, salvo error bloqueante de site/build.

Si necesitas modificar un archivo prohibido, primero explica por qué y espera confirmación.

## Alcance exacto

### 1. Validar rutas del blog

Verificar que funcionen:

- `/blog`
- `/blog/[slug]`
- `/blog/page/[page]` si hay más de 10 posts.
- `/blog/categoria/[category]`
- `/blog/tag/[tag]`
- `/rss.xml`
- `/sitemap.xml`
- `/robots.txt`

Reglas:

- No generar páginas vacías.
- No incluir drafts en producción.
- No romper rutas del portfolio.

### 2. Validar comportamiento de drafts

Confirmar:

- `draft: true` no aparece en build de producción.
- `draft: true` no entra a `/blog`.
- `draft: true` no entra al RSS.
- `draft: true` no entra al sitemap.
- En desarrollo puede verse si el sistema así fue definido.

Documentar el comportamiento en `BLOG_RELEASE_CHECKLIST.md`.

### 3. Validar SEO del blog

Revisar:

- title único en `/blog`.
- title único por artículo.
- meta description.
- canonical.
- Open Graph.
- Twitter Card.
- JSON-LD `BlogPosting` en artículos.
- RSS válido.
- sitemap válido.
- robots correcto.

Corregir solo errores reales.

### 4. Validar accesibilidad básica

Revisar:

- imágenes con `alt`.
- links externos con `rel="noopener noreferrer"`.
- links con texto o `aria-label`.
- navegación por teclado.
- focus visible.
- paginación con `aria-current`.
- headings en orden lógico.
- contraste razonable.

Corregir solo issues puntuales.

### 5. Validar diseño visual

Revisar:

- `/blog` minimalista y coherente con Engineered Darkness.
- cards legibles.
- paginación discreta.
- artículo legible.
- callouts.
- código.
- tablas.
- imágenes.
- mobile.
- desktop.
- dark theme.
- light theme si existe.

No rediseñar.

### 6. Validar build y Lighthouse

Ejecutar:

    pnpm astro check
    pnpm build

Luego, si el entorno lo permite:

    pnpm preview

Revisar manualmente:

    /blog
    /blog/claude-code-sin-gastar-tantos-tokens
    /rss.xml
    /sitemap.xml

Si Lighthouse está disponible sin instalar dependencias permanentes, ejecutar:

    pnpm dlx lighthouse http://localhost:4321/blog --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless"

    pnpm dlx lighthouse http://localhost:4321/blog/claude-code-sin-gastar-tantos-tokens --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless"

No commitear reportes HTML/JSON de Lighthouse salvo que ya exista convención.

### 7. Crear `BLOG_RELEASE_CHECKLIST.md`

Debe incluir:

- estado general del blog.
- comandos ejecutados.
- rutas verificadas.
- estado de drafts.
- estado de RSS.
- estado de sitemap.
- estado de SEO.
- estado de accesibilidad.
- estado visual.
- resultado Lighthouse si se pudo ejecutar.
- pendientes bloqueantes.
- pendientes no bloqueantes.
- veredicto final.

Veredictos posibles:

- `BLOG_READY_FOR_DEPLOY`
- `BLOG_READY_WITH_NON_BLOCKING_PENDING`
- `BLOG_BLOCKED`

## Fuera de alcance

- No rediseñar el blog.
- No crear artículos nuevos.
- No publicar/despublicar artículos salvo que sea parte de validar drafts y se justifique.
- No instalar dependencias.
- No agregar búsqueda.
- No agregar CMS.
- No agregar MDX.
- No modificar el home.
- No modificar páginas de proyectos.
- No cambiar arquitectura.

## Criterios de aceptación

- `pnpm astro check` pasa.
- `pnpm build` pasa.
- `/blog` funciona.
- artículo publicado funciona.
- RSS funciona.
- sitemap funciona.
- drafts no se publican en producción.
- SEO técnico del blog está validado.
- accesibilidad básica validada.
- diseño visual validado.
- `BLOG_RELEASE_CHECKLIST.md` existe.
- `MIGRATION_STATUS.md` queda actualizado.
- no quedan bloqueantes sin documentar.

## Validaciones

Ejecutar:

    pnpm astro check
    pnpm build
    git diff --stat

Si es posible:

    pnpm preview

Revisar:

    /blog
    /blog/claude-code-sin-gastar-tantos-tokens
    /rss.xml
    /sitemap.xml
    /robots.txt

Lighthouse si el entorno lo permite.

## Respuesta esperada

Responder solo con:

1. Veredicto del blog.
2. Archivo creado.
3. Rutas verificadas.
4. Resultado de `pnpm astro check`.
5. Resultado de `pnpm build`.
6. Resultado Lighthouse si se pudo ejecutar.
7. Correcciones aplicadas.
8. Pendientes bloqueantes.
9. Pendientes no bloqueantes.
10. Confirmación de readiness.