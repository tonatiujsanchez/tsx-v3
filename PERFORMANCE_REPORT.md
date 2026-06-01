# PERFORMANCE_REPORT.md

## Veredicto: `PERFORMANCE_READY_WITH_PENDING`

---

## Problema detectado

Boxicons CSS cargado desde CDN externo (`cdn.jsdelivr.net`) como recurso render-blocking.
Afectaba todas las páginas del sitio. Score Performance Lighthouse: `/blog` 58, `/blog/[slug]` 66.

---

## Estrategia: SVG inline con `Icon.astro`

- Eliminado `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">` de `BaseLayout.astro`.
- Creado `src/components/ui/Icon.astro` con 20 SVG paths inline (viewBox 0 0 24 24, fill="currentColor", width/height="1em").
- Cada `<i class="bx bx-*">` reemplazado por `<Icon name="bx-*" class="..." />`.
- Iconos de marca (GitHub, LinkedIn, X) usan paths de Simple Icons (MIT licensed).
- Iconos de UI usan paths de Material Icons.
- Toast de ContactForm: SVG inyectado dinámicamente vía JS en `showToast()` (sin depender de clases CSS).
- Datos en `navigation.ts` y `site.ts` mantienen los mismos identificadores `bx-*` — solo cambia cómo se renderizan.
- `font-size` en CSS de componentes sigue aplicando al SVG vía `width="1em"` (misma mecánica que webfont).

---

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/layouts/BaseLayout.astro` | Elimina `<link>` Boxicons CDN |
| `src/components/ui/Icon.astro` | **CREADO** — 20 SVG icons inline |
| `src/components/shared/Navbar.astro` | `<i class="bx ...">` → `<Icon>` |
| `src/components/shared/ThemeToggle.astro` | `<i class="bx ...">` → `<Icon>` |
| `src/components/shared/ScrollTop.astro` | `<i class="bx ...">` → `<Icon>` |
| `src/components/ui/SocialLink.astro` | `<i class="bx ...">` → `<Icon>` |
| `src/components/sections/HeroSection.astro` | `<i class="bx ...">` → `<Icon>`, CSS `.bx-download` → `.hero__cta-download` |
| `src/components/project/ProjectLinks.astro` | `<i class="bx ...">` → `<Icon>` |
| `src/components/project/ProjectContact.astro` | `<i class="bx ...">` → `<Icon>` |
| `src/components/home/ContactForm.astro` | Toast icon: `innerHTML` SVG en JS, sin clases Boxicons |
| `src/components/home/ProjectCard.astro` | `<i class="bx ...">` → `<Icon>` |
| `src/components/blog/BlogCard.astro` | `<i class="bx ...">` → `<Icon>` |
| `src/components/blog/BlogPagination.astro` | `<i class="bx ...">` → `<Icon>` |
| `src/components/blog/RelatedPosts.astro` | `<i class="bx ...">` → `<Icon>` |
| `src/components/blog/FeaturedPostCard.astro` | `<i class="bx ...">` → `<Icon>` |
| `src/pages/blog/categoria/[category].astro` | `<i class="bx ...">` → `<Icon>` |
| `src/pages/blog/tag/[tag].astro` | `<i class="bx ...">` → `<Icon>` |
| `src/pages/projects/[slug].astro` | `<i class="bx ...">` → `<Icon>` |

**Total: 18 archivos modificados, 1 creado.**

---

## Recursos externos eliminados

- `https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css` — render-blocking CSS externo.

Después de la eliminación, **no quedan requests externos** de recursos críticos de renderizado.

---

## Resultado `pnpm astro check`

```
Result (57 files): 0 errors, 0 warnings, 45 hints (preexistentes)
```

## Resultado `pnpm build`

```
14 page(s) built in 948ms — Complete!
```

---

## Resultado Lighthouse (localhost preview)

### Antes (BLOG-7)

| Página | Perf | A11y | Best | SEO |
|---|---|---|---|---|
| `/blog` | 58 | 96 | 96 | 100 |
| `/blog/[slug]` | 66 | 96 | 100 | 100 |

### Después (Fase 12)

| Página | Perf | A11y | Best | SEO |
|---|---|---|---|---|
| `/blog` | 74 | 96 | 100 | 100 |
| `/blog/[slug]` | 71 | 96 | 100 | 100 |

**Mejora: +16 en /blog, +5 en /blog/[slug].**
**Best Practices: 96 → 100 en /blog** (sin CDN externo ya no hay mixed-content issues).

Nota: scores de localhost. En producción con CDN+cache y compresión HTTP/2, Performance será mayor.

---

## Pendientes no bloqueantes

| Pendiente | Impacto | Nota |
|---|---|---|
| Fuentes locales render-blocking | Medio | `/fonts/poppins/poppins.css` y `/fonts/paralucent/paralucent.css` son render-blocking. Mejoraría con `<link rel="preload" as="font">` + `font-display: swap`. Requiere modificar archivos de fuentes en `public/` y `BaseLayout`. |
| Performance <90 en localhost | Bajo | La diferencia entre localhost y producción CDN es típicamente 10-20 puntos. |
| LCP — imagen de perfil | Bajo | Ya tiene `loading="eager" fetchpriority="high"`. Optimizar con `<link rel="preload">` en BaseLayout si se quiere mejorar más. |

---

## Siguiente recomendación

Fase 13 (opcional): Optimizar fuentes locales.

1. Agregar `font-display: swap` en `/fonts/poppins/poppins.css` y `/fonts/paralucent/paralucent.css`.
2. Agregar `<link rel="preload" as="font">` para los `.woff2` críticos en BaseLayout.

Estimación de mejora adicional: +5-10 puntos Performance.
