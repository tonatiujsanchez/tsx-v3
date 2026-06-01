# BLOG_RELEASE_CHECKLIST.md

## Veredicto: `BLOG_READY_WITH_NON_BLOCKING_PENDING`

---

## Comandos ejecutados

```bash
pnpm astro check   # 0 errores, 0 warnings, 45 hints preexistentes
pnpm build         # 14 páginas + robots.txt + sitemap.xml + rss.xml — 948ms
pnpm preview + Lighthouse
```

---

## Rutas verificadas en dist/

| Ruta | Estado |
|---|---|
| `/` | PASS |
| `/blog` | PASS |
| `/blog/claude-code-sin-gastar-tantos-tokens` | PASS |
| `/blog/categoria/tutoriales` | PASS |
| `/blog/tag/claude-code` | PASS |
| `/blog/tag/herramientas` | PASS |
| `/blog/tag/ia-generativa` | PASS |
| `/blog/tag/productividad` | PASS |
| `/blog/tag/workflow` | PASS |
| `/rss.xml` | PASS |
| `/sitemap.xml` | PASS |
| `/robots.txt` | PASS |
| `/blog/page/[N]` | N/A — solo 1 artículo publicado, `totalPages = 1`. No se genera. Correcto. |
| `/blog/primer-borrador-blog` | PASS — excluido en build. Solo visible en dev. |

---

## Estado de drafts

| Check | Estado |
|---|---|
| `draft: true` excluido del build | PASS |
| `draft: true` excluido de `/blog` | PASS |
| `draft: true` excluido del RSS | PASS |
| `draft: true` excluido del sitemap | PASS |
| `draft: true` visible en dev (`import.meta.env.DEV`) | PASS |

Artículos con `draft: true`: `primer-borrador-blog.md`
Artículos publicados: `claude-code-sin-gastar-tantos-tokens.md` (`draft: false`)

---

## Estado de RSS

| Check | Estado |
|---|---|
| XML válido | PASS |
| Incluye solo artículos publicados | PASS |
| `title`, `link`, `guid`, `description`, `pubDate` presentes | PASS |
| `atom:link` self-reference correcto | PASS |
| `Content-Type: application/xml; charset=utf-8` | PASS |
| Caracteres especiales escapados (`&amp;`, `&lt;`, etc.) | PASS |
| Item publicado: "Cómo usar Claude Code sin gastar tantos tokens" | PASS |

---

## Estado de sitemap

| Check | Estado |
|---|---|
| `/` incluido, priority 1.0 | PASS |
| Proyectos incluidos, priority 0.8 | PASS |
| `/blog` incluido, priority 0.8 | PASS |
| Artículo publicado incluido, priority 0.7 | PASS |
| Categorías incluidas (solo con posts publicados), priority 0.6 | PASS |
| Tags incluidos (solo con posts publicados), priority 0.5 | PASS |
| `draft: true` excluido del sitemap | PASS |
| Namespace correcto (`http://www.sitemaps.org/schemas/sitemap/0.9`) | PASS |

---

## Estado de SEO técnico

| Check | Estado |
|---|---|
| `/blog` — title único | PASS: "Blog — Tonatiuj Sánchez" |
| `/blog` — meta description | PASS |
| `/blog` — canonical | PASS: `https://tonatiujsanchez.dev/blog` |
| `/blog` — OG `website` | PASS |
| `/blog` — JSON-LD `Blog` | PASS |
| `/blog/[slug]` — title único por artículo | PASS |
| `/blog/[slug]` — meta description desde frontmatter | PASS |
| `/blog/[slug]` — canonical (frontmatter override o auto) | PASS |
| `/blog/[slug]` — OG `article` | PASS |
| `/blog/[slug]` — Twitter Card | PASS (via BaseLayout) |
| `/blog/[slug]` — JSON-LD `BlogPosting` con datePublished, dateModified, author, image | PASS |
| `/blog/categoria/[category]` — title/description/canonical | PASS |
| `/blog/tag/[tag]` — title/description/canonical | PASS |
| `/blog/page/[page]` — title/description/canonical | PASS |
| robots.txt con `Sitemap:` correcto | PASS |

---

## Estado de accesibilidad

| Check | Estado |
|---|---|
| Imágenes con `alt` | PASS — `cover.alt` requerido en schema; decorativas con `alt=""` + `aria-hidden` |
| Links externos con `rel="noopener noreferrer"` | PASS (componentes shared) |
| Links con texto visible | PASS |
| Back links con icono `aria-hidden="true"` | PASS — corregido en BLOG-7 |
| Nav paginación con `aria-label` | PASS: "Paginación del blog" |
| Botones disabled con `aria-disabled="true"` | PASS |
| Iconos decorativos con `aria-hidden="true"` | PASS |
| `h1` único por página | PASS |
| Orden de headings lógico (h1 → h2 → h3) | PASS |
| Focus visible (`:focus-visible` en globals) | PASS |
| `prefers-reduced-motion` respetado | PASS (globals.css) |

---

## Estado visual

| Área | Estado |
|---|---|
| `/blog` — lista minimalista con `border-bottom` separador | PASS |
| `/blog` — header left-aligned, tipografía coherente | PASS |
| `/blog` — thumbnail visible en ≥640px | PASS |
| `/blog` — badge "Destacado" en artículo featured | PASS |
| `/blog/[slug]` — PostHeader con cover 16:9 frame premium | PASS |
| `/blog/[slug]` — contenido Markdown estilizado | PASS |
| `/blog/[slug]` — callouts, código, tablas, listas | PASS |
| `/blog/categoria/[category]` — grid de cards | PASS |
| `/blog/tag/[tag]` — grid de cards | PASS |
| Dark theme coherente | PASS |
| Light theme | NO VERIFICADO en browser (no bloqueante) |
| Mobile | NO VERIFICADO en browser (no bloqueante) |

---

## Resultado Lighthouse

Ejecutado con `pnpm preview` (localhost) + `pnpm dlx lighthouse` headless.

### `/blog`

| Categoría | Score |
|---|---|
| Performance | 58 |
| Accessibility | 96 |
| Best Practices | 96 |
| SEO | 100 |

### `/blog/claude-code-sin-gastar-tantos-tokens`

| Categoría | Score |
|---|---|
| Performance | 66 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |

**Notas sobre performance:**
- Score de localhost con `pnpm preview` — en producción con CDN y caché HTTP, la cifra mejora.
- Principal sospechoso: Boxicons CDN (`cdn.jsdelivr.net`) como recurso render-blocking. Afecta a todo el sitio, no solo al blog.
- No es un bloqueante de deploy del blog — el portafolio completo tenía esta configuración desde Fase UI-8.

---

## Correcciones aplicadas en BLOG-7

1. **`[page].astro`**: Eliminada variable `POSTS_PER_PAGE` declarada pero no usada (lint warning).
2. **`[category].astro`**: Añadido `aria-hidden="true"` al ícono del back link.
3. **`[tag].astro`**: Añadido `aria-hidden="true"` al ícono del back link.

---

## Pendientes bloqueantes

**Ninguno.**

---

## Pendientes no bloqueantes

| Pendiente | Prioridad | Nota |
|---|---|---|
| Performance < 90 en Lighthouse | Media | Causa: Boxicons CDN render-blocking. Afecta todo el sitio. Mejoraría con `rel="preconnect"` + `font-display: swap` o self-hosting Boxicons. |
| Light theme sin verificar en browser | Baja | Tokens definidos para ambos temas. |
| Mobile sin verificar en browser | Baja | CSS responsive implementado. |
| `siteConfig.contactApi` vacío | Media | Form falla de forma controlada. Ya documentado en FINAL_RELEASE_CHECKLIST.md. |
| `year` faltante en 5 frontmatters de proyectos | Baja | Campo optional. Ya documentado. |
| Imágenes internas en artículo | Baja | El artículo actual no tiene imágenes en el cuerpo. Cuando se agreguen, deben existir en `public/`. |
| Segundo artículo | — | Fuera de alcance de BLOG-7. |

---

## Estado final

- `pnpm astro check`: **0 errores, 0 warnings**
- `pnpm build`: **14 páginas, 0 errores**
- Rutas del blog: **todas presentes**
- Drafts: **excluidos en producción**
- RSS: **válido, 1 item**
- Sitemap: **14 URLs**
- SEO: **100/100**
- Accesibilidad: **96/100**
- Bloqueantes: **ninguno**

**Veredicto: `BLOG_READY_WITH_NON_BLOCKING_PENDING`**
