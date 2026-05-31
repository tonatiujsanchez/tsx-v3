# MIGRATION_TASK.md

## Tarea actual

Fase BLOG-7 — QA, SEO y Lighthouse del blog.

## Contexto

Blog completo con artículo publicado y listado refactorizado:

- Artículo publicado: `src/content/blog/claude-code-sin-gastar-tantos-tokens.md` (`draft: false`)
- `/blog` — lista editorial minimalista, 10 por página
- `/blog/page/[page]` — paginación lista (inactiva hasta >10 artículos)
- `/blog/categoria/[category]`, `/blog/tag/[tag]` — funcionando
- RSS, sitemap — incluyen el artículo
- `pnpm build`: 14 páginas. Limpio.

## Objetivo

Auditoría completa del blog antes de deploy:

1. Lighthouse SEO ≥ 90 en `/blog` y `/blog/claude-code-sin-gastar-tantos-tokens`.
2. JSON-LD `BlogPosting` válido en el artículo.
3. RSS válido.
4. `prefers-reduced-motion` respetado.
5. Contraste AA en texto del artículo.
6. Mobile: ancho de lectura correcto, código sin scroll horizontal roto.
7. Verificar que `BlogCard` en categoría y tag no está roto con el nuevo diseño.

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- `src/pages/blog/[slug].astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/categoria/[category].astro`
- `src/pages/blog/tag/[tag].astro`
- `src/layouts/BlogLayout.astro`
- `src/components/blog/PostHeader.astro`
- `src/components/blog/BlogCard.astro`
- `src/styles/globals.css`

## Fuera de alcance

- No agregar artículos.
- No rediseñar el blog.
- No instalar dependencias.
- No cambiar diseño del portafolio.
