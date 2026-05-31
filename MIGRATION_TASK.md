# MIGRATION_TASK.md

## Tarea actual

Fase BLOG-6 — Primer artículo real de producción.

## Contexto

La Fase BLOG-5 completó la infraestructura editorial del blog:

- `src/utils/blog.ts` — helpers: getVisiblePosts, sortPostsByDate, getAllTags, getAllCategories, getRelatedPosts
- `/blog/categoria/[category]` — páginas por categoría
- `/blog/tag/[tag]` — páginas por tag
- `/rss.xml` — RSS nativo válido
- `RelatedPosts.astro` — sección de relacionados
- Sitemap extendido con categorías/tags publicados

Ahora se debe publicar el primer artículo real. El contenido debe ser técnico, editorial y coherente con el portfolio.

## Objetivo

Crear y publicar el primer artículo real del blog:

- Frontmatter completo y correcto.
- Contenido técnico real (no relleno).
- Cover WebP optimizada.
- `draft: false`.
- SEO completo.

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- `BLOG_STRATEGY.md`
- `src/content.config.ts`
- `src/content/blog/primer-borrador-blog.md` — referencia de estructura
- `src/pages/blog/[slug].astro`

## Comandos baratos permitidos

    git status --short
    find src/content/blog -type f | sort
    find public/img/blog -type f | sort

## Archivos permitidos para edición

- `src/content/blog/{slug-real}.md` — artículo nuevo
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Archivos prohibidos

No modificar ningún otro archivo salvo el artículo nuevo y los docs de estado.

## Alcance exacto

### 1. Definir el tema del artículo

El usuario debe confirmar el tema antes de redactar. Opciones sugeridas:

- Cómo uso Claude Code en flujos de desarrollo reales.
- RAG en producción: lecciones de implementación.
- Astro Content Collections en proyectos profesionales.
- Prompt engineering para desarrolladores.
- Arquitectura de un proyecto full-stack moderno.

### 2. Estructura del artículo

Frontmatter requerido:

```yaml
title: "..."
description: "..." # ~155 chars, SEO
excerpt: "..." # 1-2 oraciones para cards
publishedAt: YYYY-MM-DD
category: desarrollo | ia | tutoriales | herramientas | novedades
tags:
  - tag1
  - tag2
cover:
  src: /img/blog/{slug}/cover.webp
  alt: "..."
draft: false
featured: false # cambiar a true si es destacado
```

### 3. Cover image

Agregar cover a `public/img/blog/{slug}/cover.webp`.

Requisitos:
- WebP optimizada.
- ~1200×630px (proporción 16/9 o similar).
- Sin texto embebido en la imagen (accesibilidad).

### 4. Contenido del artículo

Debe usar las estructuras editoriales implementadas en BLOG-4:

- Headings h2 y h3.
- Párrafos con buena densidad informativa.
- Al menos un bloque de código.
- Al menos un callout (Nota/Tip/Advertencia).
- Links a recursos externos relevantes.

### 5. Eliminar el draft de prueba

Opcionalmente, eliminar o renombrar `primer-borrador-blog.md` después de confirmar que el artículo real funciona.

## Fuera de alcance

- No escribir contenido de relleno.
- No usar imágenes PNG/JPG sin optimizar.
- No modificar ningún componente.
- No agregar dependencias.
- No avanzar a BLOG-7.

## Criterios de aceptación

- Artículo con `draft: false`.
- Cover WebP presente en `public/img/blog/{slug}/`.
- Frontmatter completo.
- Contenido técnico real.
- `/blog` muestra el artículo.
- `/blog/{slug}` renderiza correctamente.
- `/blog/categoria/{category}` muestra el artículo.
- `/rss.xml` incluye el artículo.
- `pnpm astro check` pasa.
- `pnpm build` pasa.

## Validaciones

    pnpm astro check
    pnpm build
    git diff --stat

## Respuesta esperada

Responder solo con:

1. Slug y título del artículo.
2. Frontmatter final.
3. Archivos creados.
4. Resultado de `pnpm astro check`.
5. Resultado de `pnpm build`.
6. Pendientes.
7. Confirmación de que no se avanzó a BLOG-7.
