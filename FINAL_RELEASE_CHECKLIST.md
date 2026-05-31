# FINAL_RELEASE_CHECKLIST.md

**Fecha:** 2026-05-30  
**Fase:** UI-8 — Final polish, accesibilidad y deployment readiness  
**Veredicto:** `READY_WITH_NON_BLOCKING_PENDING`

---

## Comandos ejecutados

```bash
pnpm astro check   # 0 errores, 0 warnings, 25 hints preexistentes
pnpm build         # 6 páginas + robots.txt + sitemap.xml — 936ms
```

---

## Rutas verificadas

| Ruta | Estado |
|------|--------|
| `/` | ✅ `dist/index.html` generado |
| `/projects/admin-sites` | ✅ generado |
| `/projects/contextos-guerrero` | ✅ generado |
| `/projects/devmanager` | ✅ generado |
| `/projects/legado-de-tlapa` | ✅ generado |
| `/projects/share-groups` | ✅ generado |
| `/robots.txt` | ✅ generado |
| `/sitemap.xml` | ✅ generado |

---

## Accesibilidad

| Check | Estado | Notas |
|-------|--------|-------|
| `lang="es"` en `<html>` | ✅ | `BaseLayout.astro:39` |
| `alt` descriptivo en todas las imágenes | ✅ | Ninguno vacío |
| `aria-hidden="true"` en iconos decorativos | ✅ | Todos los `<i class="bx">` |
| `aria-label` en links icon-only | ✅ | NavBar, Hero social, ProjectLinks |
| `target="_blank"` + `rel="noopener noreferrer"` | ✅ | Todos los links externos |
| `<main>` landmark en home y detalle | ✅ | |
| `<nav>` landmark | ✅ | `Navbar.astro` |
| `<footer>` landmark | ✅ | `Footer.astro` |
| `<header>` landmark | ✅ | `Navbar.astro` wrapper |
| Focus visible global | ✅ | `outline: 2px solid --primary-color` en globals |
| Labels de formulario (floating) | ✅ | `<label for="...">` correcto |
| Toast `aria-live="polite"` | ✅ | **Añadido en UI-8** — `role="status" aria-live="polite" aria-atomic="true"` |
| `prefers-reduced-motion` | ✅ | Global en globals.css |
| Contraste textos principales | ✅ | Dark: zinc-100/muted sobre zinc-950 |
| Motion no oculta sin JS | ✅ | `html.motion-ready` requerido — sin JS, todo visible |

---

## SEO técnico

| Check | Estado | Notas |
|-------|--------|-------|
| `<title>` único por página | ✅ | |
| `<meta name="description">` | ✅ | |
| `<link rel="canonical">` | ✅ | `Astro.site + pathname` |
| Open Graph completo | ✅ | `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`, `og:locale` |
| Twitter Cards | ✅ | `summary_large_image` |
| JSON-LD | ✅ | `Person + WebSite` en home, `SoftwareApplication` por proyecto |
| `<meta name="robots">` | ✅ | `index, follow` default |
| `/robots.txt` | ✅ | `User-agent: *`, `Allow: /`, `Sitemap:` URL correcta |
| `/sitemap.xml` | ✅ | Home + 5 rutas de proyectos |
| `site` en `astro.config.mjs` | ✅ | `https://tonatiujsanchez.dev` |
| OG image URL absoluta | ✅ | `Astro.site + ogImage` |

---

## Estado visual

| Sección | Estado |
|---------|--------|
| Navbar | ✅ Sticky desktop, fixed-bottom mobile, backdrop-blur, scroll progress |
| Hero | ✅ Premium — dot pattern, gradient text, CTAs reales, social links |
| Experience | ✅ JobCards con surface, jerarquía, badge periodo, stagger |
| Projects | ✅ ProjectCards con shine border, hover elevation, stagger |
| Skills | ✅ TechBadge con surface + hover glow, iconos resueltos |
| Contact | ✅ Social cards premium, form con floating labels y CTA |
| Footer | ✅ Minimal y correcto |
| Páginas de detalle | ✅ Hero grande, tech pills, galería con reveal, ProjectContact callout |
| Motion system | ✅ data-reveal + stagger en todas las secciones |
| Dark theme | ✅ Tokens calibrados en todas las fases |
| Light theme | ⚠️ Tokens definidos — no verificado visualmente en preview |
| Mobile responsive | ✅ Sin overflow horizontal detectado |

---

## Motion system

| Check | Estado |
|-------|--------|
| Contenido visible sin JS | ✅ `html.motion-ready` requerido — sin clase, nada oculto |
| `html.motion-ready` pre-marca viewport como `is-visible` | ✅ `animations.ts:24` |
| Stagger reveal | ✅ `data-reveal-stagger` en todas las listas |
| Scroll progress bar | ✅ CSS var `--scroll-progress`, navbar desktop |
| `prefers-reduced-motion` colapsa | ✅ `animation-duration: 0.01ms` global |

---

## Build / Performance

| Check | Estado |
|-------|--------|
| SSG puro | ✅ Astro static output |
| Zero React | ✅ No React islands |
| Images lazy-loaded | ✅ `loading="lazy"` en todas salvo perfil hero |
| Profile hero `loading="eager" fetchpriority="high"` | ✅ LCP optimizado |
| webp en todas las imágenes de proyecto | ✅ |
| Fonts desde `public/fonts/` | ✅ No CDN bloqueante |
| Boxicons vía CDN | ⚠️ Carga externa — podría afectar performance. No bloqueante. |
| CSS global mínimo | ✅ Sin Tailwind, sin framework CSS |
| Scripts bundleados por Astro | ✅ `<script>` sin `is:inline` se deduplicanel |

---

## Lighthouse

No ejecutado en este entorno (requiere Chrome headless).

Para ejecutar manualmente:
```bash
pnpm preview
# http://localhost:4321 — home
# http://localhost:4321/projects/devmanager — detalle
```

Estimado por arquitectura:
- Performance: ≥ 90
- SEO: 100
- Accesibilidad: ≥ 95
- Best Practices: ≥ 85 (penalización posible por Boxicons CDN)

---

## Pendientes NO bloqueantes

| Pendiente | Detalle | Bloqueante |
|-----------|---------|------------|
| `year` en los 5 proyectos | No hay fechas confiables. El sitio funciona sin el campo (`optional()`). | No |
| `siteConfig.contactApi` vacío | Form falla de forma controlada con toast de error. Requiere endpoint real. | No |
| Light theme visual QA | Tokens definidos y calibrados. No verificado en browser. | No |
| Boxicons CDN | Iconos cargados desde CDN externo. Puede afectar `best-practices` en Lighthouse. | No |
| OG image dedicada | `defaultOgImage` usa `/img/profile/tsj.webp`. Una imagen 1200×630 mejoraría OG. | No |
| Lighthouse manual | Requiere `pnpm preview` + Chrome. No ejecutado en entorno actual. | No |
| Markdown content vacío | Todos los `.md` tienen body vacío. Los estilos `:global()` están listos para cuando se agregue. | No |

---

## Pendientes BLOQUEANTES

Ninguno.

---

## Para hacer deploy

1. Confirmar `siteConfig.contactApi` o dejar vacío con comportamiento controlado.
2. Opcionalmente: agregar `year` a los 5 proyectos.
3. Opcionalmente: crear OG image dedicada en `public/img/og-image.png`.
4. Ejecutar `pnpm build` final.
5. Subir `dist/` al hosting (Vercel, Netlify, o similar).

```bash
pnpm build
# → dist/ listo para deploy
```

---

## Instrucciones Lighthouse manual

```bash
# Terminal 1
pnpm preview

# Terminal 2 (con npx disponible sin instalar permanente)
npx lighthouse http://localhost:4321 --output=html --output-path=./lighthouse-report.html --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless"

# Ver reporte
open ./lighthouse-report.html
```

---

## Veredicto final

**`READY_WITH_NON_BLOCKING_PENDING`**

El portafolio está listo para deployment. Todos los pendientes son mejoras opcionales o datos que debe confirmar el usuario. No hay bloqueos técnicos.
