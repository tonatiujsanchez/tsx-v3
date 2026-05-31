# MIGRATION_TASK.md

## Tarea actual

Fase BLOG-5 — Mejoras de UX del blog: paginación, filtros, RSS y sitemap de blog.

## Contexto

La Fase BLOG-4 completó los estilos editoriales del artículo:

- Sistema completo de headings (h2/h3/h4) con jerarquía editorial
- Párrafos, listas, enlaces, strong, em
- Código inline y bloques de código con font monospace stack
- Blockquotes como callouts con accent label (Nota/Tip/Advertencia)
- Tablas con overflow horizontal seguro para mobile
- Imágenes Markdown nativas con border y radius coherentes
- Draft de prueba actualizado con todos los ejemplos

Ahora BLOG-5 puede mejorar la experiencia de navegación y descubrimiento del blog.

## Objetivo

Mejorar la navegación del blog y preparar el contenido para descubrimiento:

- Paginación en `/blog` si los posts superan N artículos.
- Filtros por categoría en `/blog`.
- Página `/blog/categoria/[slug]` opcional.
- RSS en `/rss.xml`.
- Sitemap actualizado para incluir artículos publicados.

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- `BLOG_STRATEGY.md`
- `UI_DIRECTION.md`
- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`
- `src/pages/sitemap.xml.ts`
- `src/layouts/BlogLayout.astro`
- `src/components/blog/BlogCard.astro`
- `src/components/blog/FeaturedPostCard.astro`
- `src/components/blog/CategoryPill.astro`
- `src/content.config.ts`
- `src/data/navigation.ts`
- `src/styles/globals.css`

## Comandos baratos permitidos

Usar primero:

    git status --short
    git diff --stat
    find src/pages/blog -type f | sort
    find src/components/blog -type f | sort
    rg "getCollection|category|filter|paginate|rss|sitemap" src/pages/ -n

## Archivos permitidos para edición

- `src/pages/blog/index.astro`
- `src/pages/sitemap.xml.ts`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Archivos que se pueden crear

- `src/pages/rss.xml.ts` — endpoint RSS para el blog
- `src/pages/blog/categoria/[category].astro` — opcional, si aplica filtro por categoría
- `src/components/blog/CategoryFilter.astro` — filtro de categorías en el índice (si se implementa como componente)

## Archivos prohibidos

No modificar:

- `src/pages/blog/[slug].astro`
- `src/layouts/**`
- `src/components/blog/BlogCard.astro`
- `src/components/blog/FeaturedPostCard.astro`
- `src/components/blog/PostHeader.astro`
- `src/components/blog/PostMeta.astro`
- `src/components/blog/TagPill.astro`
- `src/components/blog/CategoryPill.astro`
- `src/content.config.ts`
- `src/data/**`
- `src/styles/**`
- `src/scripts/**`
- `public/**`
- `package.json`
- `pnpm-lock.yaml`
- `astro.config.mjs`
- `tsconfig.json`

## Alcance exacto

### 1. RSS

Crear `/src/pages/rss.xml.ts`:

- Solo posts con `draft: false`.
- Ordenados por `publishedAt` desc.
- Incluir `title`, `description`, `pubDate`, `link`.
- Usar `@astrojs/rss` si ya está instalado; si no, implementar XML nativo.
- No instalar dependencias nuevas.

### 2. Sitemap de blog

Actualizar `src/pages/sitemap.xml.ts`:

- Añadir `/blog` como URL estática (si no está ya).
- Añadir todos los posts publicados (`!draft`).
- Mantener las rutas de proyectos existentes.
- No duplicar rutas.

### 3. Filtros por categoría (opcional)

Si la lógica es limpia, añadir filtro de categorías en `/blog`:

- Botones de categoría encima del grid.
- Filtraje client-side con JS o páginas estáticas `/blog/categoria/[category]`.
- No instalar librerías.

### 4. Paginación (opcional)

Si hay más de 6 posts publicados, añadir paginación con `Astro.paginate()`.

Por ahora, con un solo post de prueba, la paginación es prematura. Preparar la arquitectura pero no activar hasta tener contenido real.

## Fuera de alcance

- No instalar dependencias.
- No instalar MDX.
- No instalar CMS.
- No agregar search.
- No modificar estilos ya definidos en BLOG-4.
- No tocar `[slug].astro`.
- No avanzar a BLOG-6.

## Criterios de aceptación

- `/rss.xml` accesible y válido.
- Sitemap incluye posts publicados.
- Filtro de categorías funciona o la arquitectura está preparada.
- `pnpm astro check` pasa.
- `pnpm build` pasa.
- `MIGRATION_STATUS.md` queda actualizado.
- `MIGRATION_TASK.md` queda preparado para BLOG-6.

## Validaciones

Ejecutar:

    pnpm astro check
    pnpm build
    git diff --stat

## Respuesta esperada

Responder solo con:

1. Funcionalidades implementadas.
2. Archivos creados o modificados.
3. Resultado de `pnpm astro check`.
4. Resultado de `pnpm build`.
5. Pendientes.
6. Confirmación de que no se avanzó a BLOG-6.
