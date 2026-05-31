# MIGRATION_TASK.md

## Tarea actual

Fase BLOG-4 — Estilos avanzados de contenido de artículo y refinamiento del blog.

## Contexto

La Fase BLOG-3 creó las páginas principales del blog:

- `src/pages/blog/index.astro` — índice con empty state, FeaturedPostCard, grid de BlogCard
- `src/pages/blog/[slug].astro` — detalle con PostHeader, contenido Markdown, JSON-LD BlogPosting

Estilos de contenido actuales en `[slug].astro` son mínimos (legibilidad básica).
BLOG-4 debe elevar la experiencia de lectura al nivel "Engineered Darkness" del resto del sitio.

## Objetivo

Mejorar la experiencia de lectura de artículos en `/blog/[slug]`:

- Estilos tipográficos avanzados para contenido long-form.
- Callouts estilizados (Nota, Advertencia, Tip) via blockquote + CSS.
- Separadores y spacing editorial.
- Imagen inline con `BlogImage.astro`.
- Scroll progress en Navbar durante la lectura (ya existe `header__progress`).
- Posiblemente: tabla de contenidos automática desde headings.

También revisar y afinar el índice `/blog`:

- Header editorial más rico.
- Posible sección "Últimas notas" si hay múltiples categorías.
- Verificar coherencia visual con el portfolio principal.

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- `BLOG_STRATEGY.md`
- `UI_DIRECTION.md`
- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`
- `src/layouts/BlogLayout.astro`
- `src/layouts/BaseLayout.astro`
- `src/components/blog/*.astro`
- `src/styles/globals.css`
- `src/styles/animations.css`
- `src/content/blog/*.md`
- `src/data/site.ts`
- `src/types/index.ts`

## Archivos permitidos para edición

- `src/pages/blog/[slug].astro`
- `src/pages/blog/index.astro`
- `src/layouts/BlogLayout.astro`
- `src/components/blog/PostHeader.astro`
- `src/components/blog/BlogImage.astro`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Archivos prohibidos

No modificar:

- `src/content.config.ts`
- `src/content/blog/*.md`
- `src/components/shared/**`
- `src/components/sections/**`
- `src/components/home/**`
- `src/components/project/**`
- `src/components/ui/**`
- `src/layouts/BaseLayout.astro`
- `src/layouts/MainLayout.astro`
- `src/layouts/ProjectLayout.astro`
- `src/styles/**`
- `src/scripts/**`
- `src/icons/**`
- `public/**`
- `package.json`
- `pnpm-lock.yaml`
- `astro.config.mjs`
- `tsconfig.json`

## Alcance exacto

### 1. Estilos avanzados de `.post-content`

Elevar los estilos de contenido Markdown en `[slug].astro`:

- Tipografía: tamaños, line-height, letter-spacing para lectura cómoda a 70rem.
- Headings: separación visual clara, anchor links opcionales.
- Listas: sangría, bullets, numeración coherentes.
- Blockquotes: callout styling. Detectar `**Nota:**`, `**⚠ Advertencia:**`, `**💡 Tip:**` via CSS.
- Código inline: color `--primary-color`, fondo `--surface-2`.
- Code blocks: syntax highlighting básico o estilo visual premium con fondo y borde.
- Imágenes inline: centradas, con caption si aplica (usar `BlogImage.astro`).
- Tablas: si aplica, fondo alternado, borde `--card-border`.
- HR: separador sutil `--border-subtle`.
- Links: subrayado con `text-underline-offset`, hover `--primary-color`.

### 2. Callouts CSS

Los callouts se escriben en Markdown como blockquotes con marcador en negrita:

```md
> **Nota:** texto informativo.
> **⚠ Advertencia:** texto de advertencia.
> **💡 Tip:** texto de consejo.
```

CSS `:global()` en `.post-content` detecta el marcador y aplica estilos:
- Nota: borde `--primary-color`, fondo `--primary-color-alpha`.
- Advertencia: borde amarillo/naranja, fondo cálido.
- Tip: borde verde, fondo verde sutil.

### 3. Scroll progress en lectura

El Navbar ya tiene `.header__progress` con `--scroll-progress` CSS variable.
Verificar que el scroll progress funcione correctamente en `/blog/[slug]`.
Si el script no cubre páginas de blog, ajustar `initAnimations` o `animations.ts` via el layout.

### 4. Refinamiento del índice `/blog`

Revisar visualmente el índice:
- Header: ¿necesita más jerarquía visual?
- Grid: ¿el spacing y proportions son correctos?
- Empty state: ¿es sobrio y editorial?

No cambiar la arquitectura. Solo ajustes CSS si hay algo fuera de tono.

## Fuera de alcance

- No crear `/blog/tag/[tag]`.
- No crear `/blog/categoria/[category]`.
- No crear RSS.
- No implementar related posts.
- No instalar MDX.
- No instalar CMS.
- No agregar search.
- No modificar el schema.
- No escribir artículo real.
- No avanzar a BLOG-5.

## Criterios de aceptación

- `.post-content` estilos avanzados implementados.
- Callouts estilizados con CSS `:global()`.
- Scroll progress funciona en `/blog/[slug]`.
- `pnpm astro check`: 0 errores.
- `pnpm build`: limpio.
- `MIGRATION_STATUS.md` actualizado.
- `MIGRATION_TASK.md` preparado para BLOG-5, sin ejecutarlo.

## Validaciones

Ejecutar:

    pnpm astro check
    pnpm build
    git diff --stat

Si el entorno permite preview:

    pnpm preview

Revisar:

    /blog
    /blog/primer-borrador-blog (en dev)

## Respuesta esperada

Responder solo con:

1. Estilos implementados.
2. Callouts funcionando.
3. Scroll progress.
4. Archivos modificados.
5. Resultado de `pnpm astro check`.
6. Resultado de `pnpm build`.
7. Pendientes.
8. Confirmación de que no se avanzó a BLOG-5.
