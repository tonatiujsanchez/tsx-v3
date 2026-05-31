# MIGRATION_TASK.md

## Tarea actual

Fase BLOG-7 — QA, SEO y Lighthouse del blog.

## Contexto

Blog completo y primer artículo publicado:

- `src/content/blog/claude-code-sin-gastar-tantos-tokens.md` — `draft: false`, publicado.
- `/blog`, `/blog/[slug]`, `/blog/categoria/[category]`, `/blog/tag/[tag]` — funcionando.
- RSS, sitemap — incluyen el artículo.
- `pnpm build`: 14 páginas. Limpio.

## Objetivo

Auditoría completa del blog antes de deploy:

1. Lighthouse SEO ≥ 90 en `/blog` y `/blog/claude-code-sin-gastar-tantos-tokens`.
2. JSON-LD `BlogPosting` válido.
3. RSS válido (W3C o lector).
4. `prefers-reduced-motion` respetado.
5. Contraste AA en texto del artículo.
6. Mobile: ancho de lectura correcto, código sin scroll horizontal roto.

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- `src/pages/blog/[slug].astro`
- `src/pages/blog/index.astro`
- `src/layouts/BlogLayout.astro`
- `src/components/blog/PostHeader.astro`
- `src/styles/globals.css`

## Fuera de alcance

- No agregar artículos.
- No modificar el artículo publicado (solo si hay error de schema o SEO crítico).
- No instalar dependencias.
- No cambiar diseño del blog.
