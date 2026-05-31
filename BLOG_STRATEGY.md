# BLOG_STRATEGY.md

## Propósito editorial

El blog es una extensión profesional del portfolio, no una sección de contenido genérico.

Tono: técnico, directo, editorial. Sin copy de marketing, sin clickbait, sin intro de "hola somos...".

Sirve para publicar:
- artículos sobre IA aplicada (herramientas, modelos, flujos de trabajo).
- tutoriales paso a paso con imágenes de apoyo.
- notas sobre arquitectura, patrones y decisiones de ingeniería.
- aprendizajes reales de proyectos propios.
- análisis de herramientas y productos técnicos.

No es: un blog de noticias, un magazine, un SEO farm, una newsletter genérica.

Modelo de publicación: irregular. Artículos de calidad > frecuencia.

---

## Arquitectura de contenido

### Colección

```
src/content/blog/
  como-use-rag-en-produccion.md
  guia-claude-code-workflows.md
  astro-content-collections-2025.md
```

### Assets

```
public/img/blog/{slug}/
  cover.webp          ← imagen de portada obligatoria
  step-01.webp        ← pasos de tutoriales
  step-02.webp
  result.webp         ← resultado final
```

### Naming conventions

- slugs: `kebab-case`, descriptivos, sin fechas en el slug.
- imágenes: `webp`, optimizadas antes de subir, `step-NN.webp` para secuencias.
- titles: claros, sin mayúsculas innecesarias.
- tags: `lowercase`, `kebab-case`.
- categorías: enum controlado (ver Taxonomía).

### Formato

- **Markdown `.md` como formato principal.** Sin MDX en BLOG-1 a BLOG-6.
- MDX se evalúa solo si se necesitan componentes interactivos reales (gráficas, demos embebidas). Se reserva para una fase futura.

---

## Content Model — Schema propuesto

```ts
// src/content/blog/*.md frontmatter

// OBLIGATORIOS
title: string
description: string            // SEO meta description, ~155 chars
excerpt: string                // Para cards del blog, 1-2 oraciones
publishedAt: Date              // YYYY-MM-DD
category: 'ia' | 'tutoriales' | 'desarrollo' | 'herramientas' | 'novedades'
cover:
  src: string                  // /img/blog/{slug}/cover.webp
  alt: string
draft: boolean                 // default: false

// OPCIONALES
updatedAt: Date
tags: string[]
cover.caption: string
featured: boolean              // default: false — aparece destacado en /blog
series: string                 // nombre de la serie si es parte de una
canonical: string url          // override de canonical si se publicó en otro sitio primero
ogImage: string                // override de OG image (default: cover.src)
```

**Regla de `draft`:** artículos con `draft: true` se excluyen del build de producción vía filtro en `getCollection`. Se renderizan en desarrollo. `noindex` si por alguna razón se construyen.

**`readingTime`:** se calcula automáticamente en la página/layout desde el content renderizado — sin campo manual.

---

## Taxonomía

### Categorías (enum controlado)

| Slug | Descripción |
|------|-------------|
| `ia` | IA generativa, modelos, prompting, herramientas de IA |
| `tutoriales` | Guías paso a paso con imágenes |
| `desarrollo` | Arquitectura, patrones, decisiones de ingeniería |
| `herramientas` | Reviews y análisis de productos técnicos |
| `novedades` | Novedades relevantes del ecosistema |

Regla: máximo 5 categorías en MVP. No expandir sin justificación.

### Tags sugeridos (libre, no enum)

```
astro, typescript, ia-generativa, claude-code, openai, rag,
frontend, automatizacion, productividad, prompt-engineering,
react, nodejs, css, arquitectura, devtools
```

Tags son metadata de búsqueda futura — en MVP se muestran pero no generan páginas de filtro hasta BLOG-5.

---

## Rutas

### MVP (BLOG-1 a BLOG-3)

| Ruta | Prioridad | Nota |
|------|-----------|------|
| `/blog` | Alta | Listado de artículos publicados |
| `/blog/[slug]` | Alta | Artículo individual |

### Fase posterior (BLOG-5)

| Ruta | Prioridad | Nota |
|------|-----------|------|
| `/blog/categoria/[category]` | Media | Filtro por categoría |
| `/blog/tag/[tag]` | Baja | Filtro por tag — si el volumen lo justifica |
| `/rss.xml` | Media | RSS para lectores externos |

**Decisión:** `/rss.xml` a nivel raíz (no `/blog/rss.xml`) para máxima compatibilidad con agregadores.

---

## Componentes necesarios

### `src/components/blog/`

| Componente | Responsabilidad |
|------------|-----------------|
| `BlogCard.astro` | Tarjeta de artículo en el listado `/blog`. Recibe: title, excerpt, cover, category, publishedAt, slug, readingTime. Compact, premium. |
| `FeaturedPostCard.astro` | Tarjeta destacada para `featured: true`. Más grande, con cover prominente. Máximo 1 en portada. |
| `PostHeader.astro` | Hero del artículo: título, description, meta (fecha, tiempo lectura, categoría), cover con frame. |
| `PostContent.astro` | Wrapper del markdown renderizado. Aplica estilos de tipografía editorial: `h2/h3/p/ul/li/code/blockquote/img`. |
| `PostMeta.astro` | Fecha publicación + tiempo de lectura + categoría. Usado dentro de `PostHeader` y `BlogCard`. |
| `TagPill.astro` | Pill individual para un tag. Props: `label`, `href?`. Sin href en MVP. |
| `CategoryPill.astro` | Pill para categoría. Distinct del TagPill — color accent distinto. |
| `RelatedPosts.astro` | Sección de artículos relacionados al final del artículo. Filtra por misma categoría. Máximo 3. BLOG-5. |
| `BlogCallout.astro` | No aplica en `.md` nativo. Los callouts se implementan como blockquotes estilizados vía CSS global. No componente. |
| `BlogImage.astro` | Figura con caption para imágenes dentro de artículos. `<figure>/<figcaption>`. Reutiliza patrón de `ProjectFigure`. BLOG-4. |
| `TableOfContents.astro` | Índice navegable generado desde headings del artículo. Solo desktop. Opcional BLOG-5 si los artículos lo justifican. |
| `BlogSearch.astro` | No en MVP. Fase futura si el volumen de artículos lo requiere. |

**`PostContent` no es un componente de slot** — es un `<div class="post-content">` con `:global()` CSS. El markdown renderizado se inserta con `<Content />`.

---

## Layout del blog

### Nuevo layout necesario

`src/layouts/BlogLayout.astro` — wrapper de `BaseLayout`. Props SEO extendidas con `publishedAt`, `updatedAt`, JSON-LD `BlogPosting`. Comparte `Navbar` (variant `home`) y `Footer`.

No necesita `ProjectLayout` — es su propio layout.

### Layout de artículo

```
[Navbar]
  [PostHeader]            ← título, meta, cover
  [PostContent]           ← markdown
    h2, h3, p, code, blockquote, img
  [TagPill] × N           ← inline al final
  [RelatedPosts]          ← BLOG-5
  [ProjectContact]        ← reusar CTA existente (enlaza a /#contacto)
[Footer]
```

### Layout de listado `/blog`

```
[Navbar]
  [FeaturedPostCard]      ← si hay featured
  [BlogCard] × N          ← listado cronológico
[Footer]
```

---

## Diseño visual — Engineered Darkness aplicado al blog

### Lineamientos generales

- Fondo: `--surface-0` (`#18181B`). Sin cambios.
- Ancho de lectura: `max-width: 70rem` para `PostContent`. Diferente al container general (`76rem`) — el texto largo necesita líneas más cortas (65-75 chars por línea).
- Tipografía: Poppins. `font-size: 1.8rem`, `line-height: 1.8` para párrafos de artículo. Más generoso que el portfolio.
- Heading H2: `2.4rem`, `font-weight: 700`, `letter-spacing: -0.01em`, borde izquierdo sutil con `--primary-color` como accent.
- Heading H3: `2rem`, `font-weight: 600`.
- Código inline: `background: --surface-2`, `border: --border-subtle`, `border-radius: --radius-xs`, `font-family: monospace`.
- Código en bloque: `background: --surface-1`, `border: --card-border`, `--radius-md`, padding generoso, scroll horizontal si desborda.
- Links en contenido: `--primary-color`, underline `offset: 3px`, hover más opaco.

### Cards en listado

- `BlogCard`: misma familia que `ProjectCard`. `--surface-1` + `--card-border` + `--radius-lg`. Hover `translateY(-2px)` + `--shadow-soft`. Sin shine border — reservar para proyectos.
- Cover: `aspect-ratio: 16/9`, `object-fit: cover`. Escala en hover `1.02` (más sutil que proyectos).
- Sin efectos por hover complejos — el texto es el protagonista, no la imagen.

### Callouts (blockquote estilizado)

En Markdown puro, los callouts se escriben como:

```markdown
> **Nota:** texto de la nota.

> **⚠ Advertencia:** texto de advertencia.

> **💡 Tip:** texto del tip.
```

CSS global en `PostContent` detecta el primer `<strong>` del blockquote:
- `Nota` / `Note` → accent azul sutil (`--info`)
- `Advertencia` / `Warning` → accent naranja (`--primary-color`)
- `Tip` → accent verde sutil (`--success`)
- Blockquote genérico → borde izquierdo `--border-normal`

Tres tokens CSS nuevos: `--info-color`, `--success-color`. Neutral para el resto.

### Imágenes en tutoriales

```markdown
![Descripción del paso](/img/blog/mi-articulo/step-01.webp)
*Figura 1: caption descriptivo.*
```

CSS global en `PostContent`: `img + em` → `font-size: 1.4rem`, `--text-muted`, block, centered. Sin componente adicional en BLOG-4.

### Motion

- `data-reveal` en `PostHeader` (título + meta). Sin reveal en el cuerpo del artículo — el texto no debe animarse mientras se lee.
- `data-reveal-stagger` en listado `BlogCard`. Mismo sistema existente.
- Sin animaciones infinitas ni scroll reveal dentro del artículo.

---

## Soporte para tutoriales con imágenes

### Estructura recomendada en Markdown

```markdown
---
title: "Título del tutorial"
category: tutoriales
---

## Prerequisitos

- Node.js 20+
- ...

**Tiempo estimado:** 30 minutos  
**Dificultad:** Intermedio

---

## Paso 1 — Título del paso

Explicación del paso.

![Screenshot del paso](/img/blog/mi-tutorial/step-01.webp)
*Figura 1: descripción del resultado del paso.*

> **Nota:** dato importante a tener en cuenta.

## Paso 2 — ...

## Resultado final

![Resultado final](/img/blog/mi-tutorial/result.webp)
*Figura: vista final del proyecto.*
```

**Sin frontmatter de prerequisitos o steps** — se escribe como secciones Markdown estándar. Simple, portable, sin dependencias.

---

## SEO del blog

### Por artículo (`/blog/[slug]`)

- `<title>`: `{title} — {siteConfig.author}` 
- `<meta name="description">`: `description` del frontmatter.
- `<link rel="canonical">`: `canonical` del frontmatter si existe, sino URL calculada.
- `noindex`: si `draft: true` (aunque en prod se excluyen del build).
- OG: `og:type="article"`, `og:image` = `cover.src` (absoluta), `article:published_time`, `article:modified_time`, `article:tag` (primer tag).
- Twitter Card: `summary_large_image`, misma imagen.
- JSON-LD: `BlogPosting` con `headline`, `datePublished`, `dateModified`, `author`, `image`, `description`.

### Para `/blog` (índice)

- `<title>`: `Blog — {siteConfig.author}`
- JSON-LD: `Blog` con `BlogPosting[]` de los últimos artículos.
- Canonical propio.

### Sitemap

Extender `src/pages/sitemap.xml.ts` existente para incluir rutas `/blog/[slug]` además de proyectos.

### RSS

`src/pages/rss.xml.ts` — endpoint Astro nativo. Itera `getCollection('blog')` excluyendo drafts. Items con `title`, `link`, `description` (excerpt), `pubDate`. Sin dependencias externas.

### Drafts

`getCollection('blog', ({ data }) => !data.draft)` en producción. En dev: incluir todos.

---

## Fases de implementación

### BLOG-1 — Content Collection y estructura base

**Objetivo:** Definir schema, registrar colección, crear estructura de carpetas.

**Archivos:**
- `src/content.config.ts` — añadir colección `blog`
- `src/content/blog/.gitkeep` — placeholder
- `src/types/index.ts` — tipo `BlogPost` si necesario

**Criterios de aceptación:**
- `pnpm astro check` sin errores.
- `getCollection('blog')` retorna array vacío sin errores.
- Schema completo con required/optional correcto.

**Riesgos:** Bajo. Solo schema, sin páginas ni componentes.

---

### BLOG-2 — Componentes base del blog

**Objetivo:** Crear `BlogCard`, `PostHeader`, `PostMeta`, `TagPill`, `CategoryPill`, `BlogLayout`.

**Archivos:**
- `src/components/blog/BlogCard.astro`
- `src/components/blog/PostHeader.astro`
- `src/components/blog/PostMeta.astro`
- `src/components/blog/TagPill.astro`
- `src/components/blog/CategoryPill.astro`
- `src/layouts/BlogLayout.astro`

**Criterios de aceptación:**
- `pnpm astro check` sin errores.
- Componentes tipados. Cero `any`.
- Coherencia visual con el sistema existente.

**Riesgos:** Medio. Primer contacto con la estética del blog.

---

### BLOG-3 — Páginas `/blog` y `/blog/[slug]`

**Objetivo:** Rutas funcionales con artículos reales mínimos.

**Archivos:**
- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`
- Al menos 1 artículo de prueba en `src/content/blog/`

**Criterios de aceptación:**
- `/blog` lista artículos.
- `/blog/[slug]` renderiza markdown con `<Content />`.
- SEO básico (title, description, canonical).
- `pnpm build` sin errores.

**Riesgos:** Medio. Integración completa de Content Collection + páginas dinámicas.

---

### BLOG-4 — Estilos de contenido largo, imágenes, callouts y código

**Objetivo:** `PostContent` con estilos editoriales completos.

**Archivos:**
- `src/pages/blog/[slug].astro` — añadir clase `post-content` con `:global()`
- `src/styles/globals.css` o `src/styles/blog.css` — estilos de `h2/h3/p/code/blockquote/img`

**Criterios de aceptación:**
- Callouts (Nota/Advertencia/Tip) estilizados.
- Código con contraste correcto.
- Imágenes con caption.
- Lectura cómoda en desktop y mobile.

**Riesgos:** Medio. El CSS de contenido largo puede romperse entre breakpoints.

---

### BLOG-5 — Tags, categorías, related posts y RSS

**Objetivo:** Rutas de filtro + RSS + posts relacionados.

**Archivos:**
- `src/pages/blog/categoria/[category].astro`
- `src/pages/rss.xml.ts`
- `src/components/blog/RelatedPosts.astro`
- `src/pages/sitemap.xml.ts` — extender con blog

**Criterios de aceptación:**
- `/rss.xml` válido.
- Sitemap incluye artículos del blog.
- Related posts filtra por categoría.

**Riesgos:** Bajo. Operaciones con `getCollection` ya conocidas.

---

### BLOG-6 — Primer artículo real

**Objetivo:** Artículo real de producción sobre IA o desarrollo.

**Archivos:**
- `src/content/blog/{slug}.md`
- `public/img/blog/{slug}/*.webp`

**Criterios de aceptación:**
- Cover WebP optimizada.
- Frontmatter completo.
- Texto revisado y sin borrador.
- Sin `draft: true`.

**Riesgos:** Bajo técnico. El riesgo es editorial (calidad del contenido).

---

### BLOG-7 — QA, SEO y Lighthouse

**Objetivo:** Auditoría completa del blog.

**Checks:**
- Lighthouse SEO ≥ 90 en `/blog` y `/blog/[slug]`.
- JSON-LD `BlogPosting` válido en Rich Results Test.
- RSS válido en validador W3C.
- `prefers-reduced-motion` respetado.
- Contraste AA en texto de artículo.
- Mobile: ancho lectura correcto, código sin scroll horizontal roto.

**Riesgos:** Bajo si BLOG-1 a BLOG-6 respetaron SEO.

---

## Criterios de calidad generales

- Sin artículos sin cover.
- Sin excerpts vacíos.
- Sin slugs con espacios o mayúsculas.
- Imágenes en WebP, no PNG ni JPG raw.
- Sin `draft: true` en producción.
- Tags en lowercase/kebab-case.
- Categoría siempre del enum controlado.
- Canonical siempre presente.
- JSON-LD válido por artículo.
- Sin exceso de glow ni efectos que distraigan la lectura.
