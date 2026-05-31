# MIGRATION_STATUS.md

## Estado actual

Fase actual: BLOG-3 completada — Páginas `/blog` y `/blog/[slug]` creadas y funcionando.

## Fases completadas

- [x] Fase 1 — Setup del proyecto
- [x] Fase 2 — Tipos y datos
- [x] Fase 3 — Scripts del cliente
- [x] Fase 4 — Layouts
- [x] Fase 5 — Componentes shared
- [x] Fase 6 — Componentes UI
- [x] Fase 7 — Componentes de home
- [x] Fase 8 — Secciones del home
- [x] Fase 9 — Componentes de detalle de proyecto
- [x] Fase 10 — Páginas
- [x] Fase 10.1 — Reparación de paridad visual del home
- [x] Fase 11.1 — Optimización SEO para Lighthouse 100
- [x] Fase BLOG-0 — Arquitectura editorial y estrategia del blog
- [x] Fase BLOG-1 — Content Collection schema + estructura base
- [x] Fase BLOG-2 — Componentes base del blog
- [x] Fase BLOG-3 — Páginas /blog y /blog/[slug]
- [x] Fase BLOG-4 — Estilos avanzados de contenido de artículo
- [ ] Fase 12 — Lighthouse audit completo (performance, accesibilidad)

## Archivos creados o modificados

### Fase 2

**Creados:**
- `src/content.config.ts` — Content Collection schema para proyectos (Astro 6, glob loader)
- `src/icons/IconMap.ts` — Mapa `Record<TechName, string>` de nombre de tech a slug de ícono
- `src/icons/index.ts` — Re-export de IconMap
- `src/content/projects/legado-de-tlapa.md` — Datos del proyecto, order: 1
- `src/content/projects/contextos-guerrero.md` — Datos del proyecto, order: 2
- `src/content/projects/devmanager.md` — Datos del proyecto, order: 3
- `src/content/projects/share-groups.md` — Datos del proyecto, order: 4
- `src/content/projects/admin-sites.md` — Datos del proyecto, order: 5

**Modificados:**
- `tsconfig.json` — Alias `@types/*` renombrado a `@ptypes/*` (conflicto con namespace reservado de TypeScript)
- `src/data/jobs.ts` — Import actualizado a ruta relativa `'../types/index'`
- `src/data/navigation.ts` — Import actualizado a ruta relativa
- `src/data/site.ts` — Import actualizado a ruta relativa
- `src/data/skills.ts` — Import actualizado a ruta relativa

**Ya existían y correctos (sin cambios):**
- `src/types/index.ts`
- `src/data/site.ts`
- `src/data/navigation.ts`
- `src/data/jobs.ts`
- `src/data/skills.ts`

## Decisiones técnicas tomadas

- Astro + TypeScript como stack destino.
- No usar React.
- Content Collections para proyectos (Astro 6 Content Layer con `glob` loader, config en `src/content.config.ts`).
- Datos estáticos en `src/data`.
- Scripts cliente en `src/scripts`.
- Tema aplicado sobre `html`, no `body`.
- Alias `@types/*` renombrado a `@ptypes/*` por conflicto con TypeScript interno (ts6137). Los archivos de datos usan rutas relativas `'../types/index'`.
- `iconMap` en `src/icons/IconMap.ts` mapea `TechName → slug` (string). Los SVG files en `src/icons/svgs/` se añaden conforme se necesiten en fases de componentes.
- Proyectos con repo privado (Legado de Tlapa, Contextos Guerrero) no tienen campo `github` en frontmatter.
- DevManager tiene `githubFrontend` + `githubBackend` separados.

### Fase 3

**Creados:**
- `src/scripts/theme.ts` — toggle dark/light, persistencia en localStorage, clase `dark-theme` sobre `<html>`
- `src/scripts/navbar.ts` — IntersectionObserver sobre `section[id]`, activa BEM `nav__link--active` / `nav__item--active`
- `src/scripts/scroll.ts` — muestra/oculta `#scroll-top` con clase `scroll-top__show` cuando `scrollY >= 350`
- `src/scripts/animations.ts` — IntersectionObserver para `[data-animate]`, añade `is-visible` (pendiente Fase 5/6)

## Decisiones técnicas tomadas (Fase 3)

- Tema aplica clase `dark-theme` sobre `document.documentElement` (html), confirmando decisión de Fase 2.
- Toggle button usa selector `[data-theme-toggle]` (data attribute).
- `navbar.ts` usa `IntersectionObserver` con `rootMargin: '-40% 0px -55% 0px'` — activa la sección visible en zona central del viewport. Sin offset hardcodeado ni scroll listener manual. Exporta `initNavObserver()`.
- `scroll.ts` usa scroll listener pasivo en `window`. Exporta `initScrollTop()`.
- `animations.ts` mantenido (útil para animaciones de entrada), pero no conectado aún. Se integrará en Fase 5/6.

### Fase 4

**Creados:**
- `src/layouts/BaseLayout.astro` — HTML base, head completo (meta, OG, favicons, fonts, Boxicons CDN, anti-FOUC), slot
- `src/layouts/MainLayout.astro` — wraps BaseLayout, slot, TODO Fase 5 para shared components
- `src/layouts/ProjectLayout.astro` — wraps BaseLayout, slot, TODO Fase 5 para navbar variant, scroll-top, footer

## Decisiones técnicas tomadas (Fase 4)

- `BaseLayout` carga `/fonts/poppins/poppins.css` y `/fonts/paralucent/paralucent.css` desde `public/`.
- Anti-FOUC usa key `selected-theme-tsx` con clases `dark-theme` / `light-theme`. **Discrepancia pendiente**: `theme.ts` usa key `theme-tsx`. Reconciliar al conectar scripts en Fase 5.
- Scripts `initTheme`, `initNavObserver`, `initScrollTop` NO conectados aún. Se integran en Fase 5 desde componentes shared.
- `MainLayout` y `ProjectLayout` son thin wrappers — solo propagan props a `BaseLayout`.

## Pendientes conocidos

- `src/icons/svgs/` solo tiene `zustand.svg`. Faltan SVG files para el resto de tecnologías. Se agregan en Fase 5/6.
- `siteConfig.contactApi` en `src/data/site.ts` tiene TODO pendiente (API de contacto).
- ~~Key de localStorage del anti-FOUC (`selected-theme-tsx`) difiere de `theme.ts` (`theme-tsx`).~~ Reconciliado en Fase 5.
- ~~Scripts cliente no conectados a layouts.~~ Conectados en Fase 5 via componentes shared.

## Riesgos

- Consumo excesivo de tokens si se reanaliza el repo completo en cada fase.
- Duplicación de CSS si se copia demasiado del proyecto legacy.
- Hardcodeo accidental de datos en componentes.

### Fase 5

**Creados:**
- `src/components/shared/ThemeToggle.astro` — botón `[data-theme-toggle]`, llama `initTheme()` vía `<script>`
- `src/components/shared/ScrollTop.astro` — botón `#scroll-top`, llama `initScrollTop()` vía `<script>`
- `src/components/shared/Navbar.astro` — props `variant` + `backHref`, nav home con `navItems`, nav project con link de regreso, incluye `ThemeToggle`, llama `initNavObserver()` condicionalmente por `data-variant`
- `src/components/shared/Footer.astro` — copyright dinámico con `siteConfig.author`

**Modificados:**
- `src/scripts/theme.ts` — key reconciliada a `selected-theme-tsx`, almacena `dark-theme` / `light-theme` (consistente con anti-FOUC de BaseLayout)
- `src/layouts/MainLayout.astro` — integra Navbar (home), ScrollTop, Footer
- `src/layouts/ProjectLayout.astro` — integra Navbar (project, backHref `/#proyectos`), ScrollTop, Footer

## Decisiones técnicas tomadas (Fase 5)

- `theme.ts` ahora almacena `'dark-theme'` / `'light-theme'` (en lugar de `'dark'`/`'light'`), alineado con anti-FOUC de `BaseLayout`.
- `Navbar` usa `data-variant` attribute para que el script cliente decida si llama `initNavObserver()` — evita import condicional de módulos en Astro.
- Scripts conectados desde componentes con `<script>` bundleable (no `is:inline`) — Astro deduplicará automáticamente si hay múltiples instancias.

## Pendientes conocidos

- `src/icons/svgs/` solo tiene `zustand.svg`. Faltan SVG files para el resto de tecnologías. Se agregan en Fase 6.
- `siteConfig.contactApi` en `src/data/site.ts` tiene TODO pendiente (API de contacto).
- `animations.ts` no conectado — pendiente Fase 7/8.

### Fase 6

**Creados:**
- `src/components/ui/TechIcon.astro` — renderiza `<img src="/icons/{slug}.svg">` usando `getIcon(techKey)`. SVGs deben existir en `public/icons/` (pendiente).
- `src/components/ui/TechBadge.astro` — props `name`, `techKey`, `colorVar?`. Usa `TechIcon` internamente.
- `src/components/ui/SocialLink.astro` — props `href`, `label`, `icon`, `ariaLabel?`. `target="_blank" rel="noopener noreferrer"`.
- `src/components/ui/ProjectFigure.astro` — props `src`, `alt`, `caption`. HTML semántico `<figure>/<figcaption>`, `loading="lazy"`.

**Modificados:**
- `src/icons/index.ts` — añadida función `getIcon(techKey: TechName): string`

## Decisiones técnicas tomadas (Fase 6)

- `TechIcon` usa `<img src="/icons/{slug}.svg">` apuntando a `public/icons/`. Los SVGs actuales en `src/icons/svgs/` deben moverse/copiarse a `public/icons/` en fases de secciones.
- `TechIcon` creado por separación de responsabilidades: permite usar solo el ícono sin el badge completo.
- `SocialLink` expone `label` como texto visible — el componente es accesible por defecto sin depender de `ariaLabel`.

## Pendientes conocidos

- SVGs de íconos tecnológicos deben existir en `public/icons/{slug}.svg` — actualmente solo existe `zustand.svg` en `src/icons/svgs/`. Se completan al implementar secciones.
- `siteConfig.contactApi` tiene TODO pendiente.
- `animations.ts` no conectado.

### Fase 7

**Creados:**
- `src/components/home/JobCard.astro` — recibe `job: Job`, renderiza logo, título, empresa, periodo
- `src/components/home/ProjectCard.astro` — recibe props `title/slug/year/summary/thumbnail{full,md,sm}`, enlaza a `/projects/{slug}`
- `src/components/home/ContactForm.astro` — form con nombre/email/mensaje, loader + toast éxito/error, submit a `siteConfig.contactApi`

## Decisiones técnicas tomadas (Fase 7)

- `ProjectCard` usa props `thumbnail{full,md,sm}` según el task. El content collection usa `cover` (único). Fase 8 adapta el mapeo (`cover` → `thumbnail.full` para los tres tamaños).
- `ContactForm` usa `siteConfig.contactApi` (el campo real en `SiteConfig`). El task decía `contactApiUrl` — discrepancia ignorada a favor del tipo existente.
- Script del form usa `is:inline define:vars` para pasar `contactApi` desde servidor al cliente sin bundleable import.

## Pendientes conocidos

- SVGs tecnológicos deben existir en `public/icons/{slug}.svg`.
- `siteConfig.contactApi` es cadena vacía — se completa cuando exista el endpoint.
- ~~`ProjectCard.thumbnail` → `cover` mapping.~~ Resuelto en Fase 8: `cover` → `thumbnail.full/md/sm`.
- `animations.ts` no conectado.

### Fase 8

**Creados:**
- `src/components/sections/HeroSection.astro` — `#hola`, usa `siteConfig` + `socialLinks`, TODO perfil y campo `role`
- `src/components/sections/ExperienceSection.astro` — `#experiencia`, itera `jobs[]` con `JobCard`
- `src/components/sections/ProjectsSection.astro` — `#proyectos`, `getCollection('projects')` ordenado por `order`, mapea `cover` → `thumbnail`
- `src/components/sections/SkillsSection.astro` — `#habilidades`, itera `skills[]` con `TechBadge`
- `src/components/sections/ContactSection.astro` — `#contacto`, usa `ContactForm` + `socialLinks`

## Decisiones técnicas tomadas (Fase 8)

- `ProjectsSection` pasa `year={0}` — campo `year` no existe en el schema. Requiere agregar `year: z.number()` al schema y actualizar cada `.md`.
- `HeroSection` usa `/img/profile.webp` con TODO — imagen de perfil no existe en `public/img/` aún.
- `HeroSection` hardcodea rol "Desarrollador FullStack" con TODO — campo `role` no existe en `SiteConfig`.

## Pendientes conocidos

- ~~`year` falta en schema.~~ Agregado como `z.number().optional()`. Fallback: año actual (`new Date().getFullYear()`). Cada `.md` puede recibir `year` cuando se confirme el dato real.
- ~~`/img/profile.webp` no existía.~~ HeroSection usa `/img/profile/ton.webp` (archivo real existente).
- ~~Campo `role` faltaba en `SiteConfig`.~~ Agregado a tipo + dato (`'Desarrollador FullStack'`). HeroSection usa `siteConfig.role`.
- ~~`ProjectsSection` usaba `cover` para `thumbnail.md/sm`.~~ Ahora deriva `-543.webp` y `-380.webp` con `.replace()`.
- SVGs tecnológicos en `public/icons/{slug}.svg` — pendiente.
- `siteConfig.contactApi` vacío — pendiente.
- `animations.ts` no conectado — pendiente.

### Fase 8.1

**Modificados:**
- `src/content.config.ts` — añadido `year: z.number().optional()`
- `src/types/index.ts` — añadido `role: string` a `SiteConfig`
- `src/data/site.ts` — añadido `role: 'Desarrollador FullStack'` a `siteConfig`
- `src/components/sections/HeroSection.astro` — usa `siteConfig.role`, imagen real `/img/profile/ton.webp`
- `src/components/sections/ProjectsSection.astro` — `year={project.data.year ?? new Date().getFullYear()}`, thumbnail md/sm derivados con `.replace()`

### Fase 9

**Creados:**
- `src/components/project/ProjectLinks.astro` — props `github?`, `live?`. Renderiza solo links existentes. `target="_blank"` + `rel="noopener noreferrer"`. Sin contenedor si no hay links. Usa `--github-color` / `--black-primary-color`.
- `src/components/project/ProjectContact.astro` — CTA de contacto. Props `title?`, `description?`, `href?`, `label?` con defaults. Enlaza a `/#contacto` por defecto. HTML semántico `<section>`.

## Decisiones técnicas tomadas (Fase 9)

- `ProjectLinks` no renderiza wrapper vacío — usa expresión `{(github || live) && ...}`.
- CSS vars alineados con globals: `--github-color`, `--black-primary-color`, `--border-primary`, `--title-color`, `--text-color`.
- `ProjectContact` no importa `siteConfig` — datos por props con defaults razonables.
- `pnpm astro check`: 0 errores, 0 warnings (19 hints preexistentes).

## Pendientes conocidos

- SVGs tecnológicos en `public/icons/{slug}.svg` — pendiente.
- `siteConfig.contactApi` vacío — pendiente.
- `animations.ts` no conectado — pendiente.
- `ProjectLinks` solo soporta `github`/`live`. DevManager tiene `githubFrontend`+`githubBackend` — Fase 10 maneja el fork en la página.

### Fase 10

**Creados:**
- `src/pages/index.astro` — home compuesto con `MainLayout` + 5 secciones. SEO básico desde `siteConfig`.
- `src/pages/projects/[slug].astro` — página dinámica. `getStaticPaths` desde `getCollection('projects')`. Renderiza: header, `ProjectFigure` (cover), `TechBadge[]`, `ProjectLinks`, gallery, `Content`, `ProjectContact`.

**Modificados:**
- `src/pages/index.astro` — reemplazado boilerplate de Astro por composición real.

## Decisiones técnicas tomadas (Fase 10)

- `render(project)` en lugar de `project.render()` — API correcta de Content Layer en Astro 5/6.
- DevManager no tiene `github` sino `githubFrontend` + `githubBackend`. La página pasa `github={project.data.github ?? project.data.githubFrontend}`. `githubBackend` no se muestra — pendiente Fase 11.
- `project.id` como slug — glob loader usa filename sin extensión como ID.

## Pendientes conocidos

- SVGs tecnológicos en `public/icons/{slug}.svg` — pendiente.
- `siteConfig.contactApi` vacío — pendiente.
- `animations.ts` no conectado — pendiente.
- DevManager `githubBackend` no enlazado — pendiente Fase 11.

## Rutas generadas

- `/` (home)
- `/projects/admin-sites`
- `/projects/contextos-guerrero`
- `/projects/devmanager`
- `/projects/legado-de-tlapa`
- `/projects/share-groups`

### Fase 10.1

**Modificados (CSS + estructura):**
- `src/components/shared/Navbar.astro` — añadido `<header>` wrapper con logo `{TSX}`, sticky desktop, fixed-bottom mobile, CSS completo.
- `src/components/sections/HeroSection.astro` — estructura alineada con legacy (figure + body flex row), CSS completo. Social links usan `<a>` directos (icono only).
- `src/components/sections/ExperienceSection.astro` — usa clases `.section` + `.container` de globals, CSS para `.jobs`.
- `src/components/home/JobCard.astro` — estructura corregida (period como columna derecha separada), CSS completo alineado con legacy.
- `src/components/sections/ProjectsSection.astro` — usa `.section` + `.container`, CSS para `.projects` grid.
- `src/components/home/ProjectCard.astro` — estructura alineada con legacy (figure + description, flex row desktop), CSS completo.
- `src/components/sections/SkillsSection.astro` — usa `.section` + `.container`, CSS para grid de skills (2col mobile, 3col desktop).
- `src/components/ui/TechBadge.astro` — usa clases `.skill` / `.skill__icon` alineadas con legacy, CSS completo.
- `src/components/ui/TechIcon.astro` — añadido `onerror="this.style.display='none'"` para evitar broken images.
- `src/components/sections/ContactSection.astro` — usa `.section` + `.container`, CSS para `.contact` y social cards via `:global()`.
- `src/components/home/ContactForm.astro` — estructura y CSS alineados con legacy (floating label, submit button, toast).
- `src/components/ui/SocialLink.astro` — reescrito con `.social-link__name` + `.social-link__arrow` para uso en contact cards.
- `src/components/shared/Footer.astro` — usa `.container` para centrado.

## Decisiones técnicas tomadas (Fase 10.1)

- `Navbar` usa `:global(.nav__link--active)` para que el JS de `navbar.ts` pueda aplicar la clase activa con scoping correcto.
- `ExperienceSection/ProjectsSection/SkillsSection/ContactSection` usan `.section` y `.container` de globals.css en lugar de `__container` propios — más limpio y consistente.
- `ContactForm` alineado con estructura legacy (floating labels, toast global).
- `TechIcon` no muestra broken images gracias a `onerror` — la tech badge muestra solo nombre si falta el SVG.
- `SocialLink` en hero usa `<a>` directo sin el componente (icono solo). En contacto usa `SocialLink` con `:global()` overrides.

## Pendientes conocidos

- SVGs de íconos tecnológicos en `public/icons/{slug}.svg` — solo existen 3 webps (emotion, mongoose, styled-components). TechIcon oculta la imagen rota pero no muestra nada. La tech badge muestra nombre solo.
- `siteConfig.contactApi` vacío — form no puede enviar.
- `animations.ts` no conectado — no causa contenido invisible (no hay CSS que oculte `[data-animate]`).
- DevManager `githubBackend` no enlazado — pendiente Fase 11.

### Fase 11.1

**Creados:**
- `src/pages/robots.txt.ts` — endpoint `/robots.txt` con `User-agent: *`, `Allow: /`, `Sitemap: https://tonatiujsanchez.dev/sitemap.xml`
- `src/pages/sitemap.xml.ts` — endpoint `/sitemap.xml` con home + todas las rutas de proyectos dinámicas desde Content Collections

**Modificados:**
- `astro.config.mjs` — añadido `site: 'https://tonatiujsanchez.dev'`
- `src/data/site.ts` — añadidos: `url`, `siteName`, `locale`, `defaultOgImage`, `twitterHandle`, `keywords`
- `src/types/index.ts` — añadidos a `SiteConfig`: `url`, `siteName`, `locale`, `defaultOgImage`, `twitterHandle`, `keywords`
- `src/layouts/BaseLayout.astro` — reescrito con props SEO completas (`canonical`, `ogType`, `noindex`, `jsonLd`), OG completo (`og:url`, `og:site_name`, `og:locale`), Twitter Cards completo, `<meta name="robots">`, `<link rel="canonical">`, JSON-LD support
- `src/layouts/MainLayout.astro` — props SEO propagadas a BaseLayout
- `src/layouts/ProjectLayout.astro` — props SEO propagadas a BaseLayout
- `src/pages/index.astro` — añadido JSON-LD con `Person` + `WebSite`
- `src/pages/projects/[slug].astro` — añadido canonical único, `ogType="article"`, JSON-LD `SoftwareApplication` por proyecto, import `siteConfig`

## Decisiones técnicas tomadas (Fase 11.1)

- `defaultOgImage` apunta a `/img/profile/tsj.webp` — imagen real existente. TODO: crear og-image dedicada.
- `canonicalURL` se computa de `Astro.site + Astro.url.pathname` si no se pasa canonical explícito. Requiere `site` en `astro.config.mjs`.
- `ogImageURL` se convierte a URL absoluta usando `Astro.site` para OG/Twitter.
- JSON-LD del home: array `[Person, WebSite]`. JSON-LD de proyectos: `SoftwareApplication` individual.
- Sin dependencias adicionales — robots/sitemap son endpoints Astro nativos.
- `pnpm astro check`: 0 errores. `pnpm build`: 6 páginas + robots.txt + sitemap.xml generados.

## Pendientes conocidos

- Lighthouse SEO: no ejecutado en este entorno — requiere `pnpm preview` + Chrome headless.
- `og-image.png` no existe — `defaultOgImage` usa `/img/profile/tsj.webp` como fallback.
- `siteConfig.contactApi` vacío — form no puede enviar.
- `animations.ts` no conectado.

### Fase BLOG-1

**Creados:**
- `src/content/blog/` — carpeta de la colección blog
- `src/content/blog/primer-borrador-blog.md` — artículo draft de prueba (draft: true, no publicar)
- `public/img/blog/.gitkeep` — placeholder para estructura de imágenes

**Modificados:**
- `src/content.config.ts` — colección `blog` registrada con schema Zod completo. `BLOG_CATEGORIES` como const array para enum controlado.
- `src/types/index.ts` — añadidos `BlogCategory` (union type) e interfaz `BlogCover`

**Schema `blog`:**
- Required: `title`, `description`, `excerpt`, `publishedAt`, `category` (enum), `cover` (src/alt/caption?), `draft` (default: true), `tags` (default: [])
- Optional: `updatedAt`, `author`, `featured` (default: false), `series`, `canonical`, `ogImage`

**Decisiones:**
- `BLOG_CATEGORIES` const en `content.config.ts` — source of truth para el enum Zod. `BlogCategory` en `types/index.ts` es el tipo TS paralelo para componentes.
- `draft` default `true` — seguro por defecto, publicar requiere `draft: false` explícito.
- `tags` default `[]` — no obligatorio pero no undefined, simplifica filtros.
- `pnpm astro check`: 0 errores, 0 warnings, 45 hints preexistentes.
- `pnpm build`: 6 páginas (sin páginas de blog — correcto). 875ms.

### Fase BLOG-0

**Creados:**
- `BLOG_STRATEGY.md` — estrategia editorial y técnica completa del blog.

**Decisiones tomadas:**
- Formato: Markdown `.md` como principal. MDX reservado para fase futura si hay componentes interactivos.
- Colección: `src/content/blog/` con schema completo (required: title, description, excerpt, publishedAt, category, cover, draft).
- Categorías: enum de 5 (`ia`, `tutoriales`, `desarrollo`, `herramientas`, `novedades`).
- Tags: libre, `string[]`, no enum.
- Rutas MVP: `/blog` + `/blog/[slug]`. Filtros por categoría/tag y RSS en BLOG-5.
- RSS: `/rss.xml` a nivel raíz (no `/blog/rss.xml`).
- Callouts en Markdown puro: blockquote con `**Nota:**`/`**Advertencia:**`/`**Tip:**` — CSS global los estiliza.
- Ancho de lectura: `max-width: 70rem` (más estrecho que container para lectura cómoda).
- Sin `BlogCallout.astro` — los callouts son CSS `:global()` en `PostContent`.
- JSON-LD `BlogPosting` por artículo. `Blog` en el índice.
- Sitemap existente se extiende en BLOG-5 para incluir artículos.
- Layout nuevo: `BlogLayout.astro` wrapping `BaseLayout`.
- No se modificó código de producción.

### Fase UI-0

**Creados:**
- `UI_DIRECTION.md` — dirección visual completa, sistema de efectos por niveles, evaluación de Magic UI / Aceternity, fases UI-1 a UI-8 definidas.

### Fase UI-1

**Modificados:**
- `src/styles/globals.css` — sistema completo de tokens modernos

**Tokens agregados en `:root` (light):**
- `--surface-0/1/2`, `--surface-elevated` — jerarquía de superficies
- `--border-subtle`, `--border-normal` — bordes semánticos con rgba
- `--primary-color-alpha: rgba(211,115,78,0.2)` — acento para glows
- `--text-muted: #A1A1AA`
- `--radius-xs/sm/md/lg/xl/pill` — sistema de radius completo
- `--shadow-soft/medium/strong/glow/inner` — sistema de sombras light
- `--transition-fast/base/slow` — duraciones: 150ms / 250ms / 400ms
- `--ease-standard`, `--ease-emphasized` — cubic-bezier estandarizados
- `--backdrop-surface`, `--backdrop-blur: blur(12px)` — preparación navbar
- `--card-border/surface/surface-hover/shadow/shadow-hover` — preparación cards premium

**Tokens modificados:**
- `--border-primary` dark: `#2B2B2B` → `#3F3F46` (Zinc-700, visible en dark)

**Tokens dark sobreescritos:**
- Todas las variantes anteriores (superficies, bordes, sombras, cards, alpha) con valores calibrados para `#18181B`

**Base global mejorada:**
- `body` — añadido `line-height: 1.5`, `transition` usa `--transition-base`
- `::selection` — `background: --primary-color-alpha`, `color: --title-color`
- `:focus-visible` — `outline: 2px solid --primary-color`, `border-radius: --radius-xs`
- `input` — añadido `font-family: inherit`
- `@media (prefers-reduced-motion: reduce)` — desactiva animaciones/transiciones globalmente

### Fase UI-2

**Modificados:**
- `src/scripts/animations.ts` — reescrito: sistema `data-reveal` + stagger + scroll progress
- `src/styles/animations.css` — añadido reveal system CSS (motion-ready pattern)
- `src/layouts/BaseLayout.astro` — conectado `initAnimations` via `astro:page-load`
- `src/components/shared/Navbar.astro` — añadido `.header__progress` (scroll progress bar, desktop only)
- `src/components/sections/HeroSection.astro` — `data-reveal` en content/about/actions
- `src/components/sections/ExperienceSection.astro` — `data-reveal` en título/descripción, `data-reveal-stagger` en `.jobs`
- `src/components/sections/ProjectsSection.astro` — `data-reveal` en título, `data-reveal-stagger` en `.projects`
- `src/components/sections/SkillsSection.astro` — `data-reveal` en título, `data-reveal-stagger` en `.skills`
- `src/components/sections/ContactSection.astro` — `data-reveal` en título/descripción/contact
- `src/components/home/JobCard.astro` — `data-reveal` en `<article>`
- `src/components/home/ProjectCard.astro` — `data-reveal` en `<article>`
- `src/components/ui/TechBadge.astro` — `data-reveal` en `<div class="skill">`

**Arquitectura del motion system:**
- Sin JS: todo el contenido visible (no hay CSS que oculte por defecto).
- Con JS: `html.motion-ready` activa CSS de reveal. Elementos en viewport pre-marcados como `is-visible` antes de agregar `motion-ready` — sin flash de invisibilidad.
- `data-reveal-stagger` en contenedor → JS asigna `data-reveal-delay="0..9"` a hijos → delays 0ms, 60ms, 120ms … 540ms.
- Scroll progress: CSS variable `--scroll-progress` en `:root`, barra sutil en navbar desktop (0.1rem, opacity 0.5).
- `progressListenerSet` module-level flag evita duplicar scroll listeners en view transitions.
- Compatible con `@media (prefers-reduced-motion: reduce)` de globals.css (transitions colapsadas a 0.01ms).

### Fase UI-3

**Modificados:**
- `src/components/sections/HeroSection.astro` — rediseño completo del Hero premium

**Cambios visuales:**
- Estructura: figura + body en fila (desktop), columna (mobile). Description y actions ahora dentro del body para composición coherente.
- Dot pattern: `radial-gradient` CSS en pseudo-capa absoluta, adaptada a dark/light con CSS variable local `--dot-color`.
- Nombre: `3.4rem` mobile / `5rem` desktop, gradient text `title-color → primary-color` (sutil), `letter-spacing: -0.02em`.
- Rol: `1.7rem` mobile / `2.1rem` desktop, `font-weight: 500`, `--primary-color`.
- Figura: `11rem` mobile / `14rem` desktop, ring de `box-shadow` con `--primary-color-alpha`, hover intensifica el ring, sin rotación en la imagen.
- CTA primario (CV): borde con `--border-normal`, hover fill `--primary-color`, `translateY(-1px)`, estilo de botón real.
- CTA secundario (Contacto): texto link, flecha con `translateX(4px)` en hover.
- Social links: iconos en caja `3.6rem`, borde `--card-border`, background `--surface-1`, hover `translateY(-2px)` + primary color border.
- Eliminadas animaciones `float-up`/`float-down` en hover (eran continuas/ruidosas).
- Stagger con `data-reveal-delay` 1–4 sobre figura → intro → descripción → acciones → social.
- `loading="eager" fetchpriority="high"` en imagen de perfil (LCP crítico).

**Decisiones técnicas:**
- `hero__pattern` usa `:global(html.dark-theme)` para override de `--dot-color` sin tocar globals.css.
- `background-clip: text` + `-webkit-text-fill-color: transparent` para gradient en nombre. Adapta automáticamente a ambos temas vía `var(--title-color)`.
- `var(--border-normal)` en CTA primario — shorthand shorthand ya definido con variantes light/dark.
- `var(--card-border)` en social icons — misma estrategia.
- `astro check`: 0 errores, 0 warnings. `build`: 6 páginas + robots + sitemap.

### Fase UI-4

**Modificados:**
- `src/components/home/ProjectCard.astro` — rediseño premium completo
- `src/components/sections/ProjectsSection.astro` — header editorial + gap reducido

**Cambios visuales:**
- Card: background `--card-surface`, borde `--card-border`, `--radius-lg`, `--card-shadow`
- Hover: `translateY(-2px)`, `--card-shadow-hover`, border-color primary alpha
- Shine border: `::before` pseudo sweep 135deg en hover (CSS nativo, sin JS)
- Imagen: `scale(1.03)` en hover (reemplaza `scale(1.1)` agresivo anterior), `object-fit: cover`
- Eliminado `padding-inline` en figura, `overflow: hidden` en card maneja corners
- `float-up` infinito eliminado del icono flecha
- Flecha: `translateX(4px)` en hover (`.project:hover .project__arrow`)
- Año: badge pill con `--surface-2` + `--border-subtle` + `--text-muted`
- Título: `font-weight: 600`, `display: inline-flex` con flecha alineada
- Summary: `font-size: 1.5rem`, `line-height: 1.6`, `text-wrap: pretty`
- Focus: `:focus-within` dispara hover styles → accesible con teclado
- Alt descriptivo: `"Captura de pantalla de ${title}"`
- Desktop: `flex-direction: row`, figura `width: 30rem` se estira al alto del card
- Mobile: flex column, `aspect-ratio: 543/326` en figura
- Section: `header.projects-section__header` + descripción editorial breve
- Gap entre cards: `8rem/5rem` → `2rem` (cards son unidades visuales con surface)

**Validaciones:**
- `pnpm astro check`: 0 errores, 0 warnings, 25 hints preexistentes
- `pnpm build`: 6 páginas + robots + sitemap generados

### Fase UI-5

**Modificados:**
- `src/icons/IconMap.ts` — slugs corregidos: `emotion` → `emotion_logo`, `mongoose` → `mongoose_logo`
- `src/components/ui/TechBadge.astro` — premium badge con surface + hover
- `src/components/sections/SkillsSection.astro` — lead editorial + gap reducido
- `src/components/home/JobCard.astro` — card con surface + jerarquía mejorada
- `src/components/sections/ExperienceSection.astro` — gap reducido (`3rem` → `1.2rem`)
- `src/components/ui/SocialLink.astro` — base styles para layout
- `src/components/sections/ContactSection.astro` — social links con surface + hover glow + arrow
- `src/components/home/ContactForm.astro` — wrapper surface, inputs mejorados, submit primary-color

**Cambios visuales:**
- TechBadge: `background: --surface-1`, `border: --card-border`, `--radius-md`, hover `translateY(-1px)` + `--shadow-glow`
- TechIcon: slugs corregidos via iconMap → emotion_logo/mongoose_logo resuelven a .webp correcto
- JobCard: eliminada estructura `job__header-company` anidada; nueva jerarquía `job__title` (600) + `job__company` (muted) + `job__period` (badge pill)
- JobCard: `background: --surface-1`, `border: --card-border`, `--radius-lg`, hover sutil
- Logo empresa: `border-radius: --radius-md` (cuadrado redondeado vs círculo), `--surface-2` bg
- ExperienceSection: gap jobs `3rem` → `1.2rem` (tarjetas con surface no necesitan aire extra)
- SocialLink: `.social-link__label` explícito en `<span>` para styling preciso
- ContactSection: social cards con `--surface-1` + `--card-border` + `--shadow-soft`, hover con `--shadow-glow` + arrow `translateX(3px)`
- ContactForm: wrapper con `--surface-1` + `--card-border` + `--radius-lg`, inputs con `--border-normal` + `--surface-2` bg, focus `--primary-color` border, submit `--primary-color` fill → hover transparente
- Floating label bg: `--surface-1` (matchea wrapper surface), color activo `--primary-color`

**Validaciones:**
- `pnpm astro check`: 0 errores, 0 warnings, 25 hints preexistentes
- `pnpm build`: 6 páginas + robots + sitemap. Completado en 872ms

### Fase UI-6

**Modificados:**
- `src/pages/projects/[slug].astro` — redesign editorial completo
- `src/components/ui/ProjectFigure.astro` — frame premium con hover
- `src/components/project/ProjectLinks.astro` — props extendidas + botones premium
- `src/components/project/ProjectContact.astro` — callout card con CTA

**Cambios visuales:**

`[slug].astro`:
- Hero: título `3rem` mobile / `4.8rem` desktop, `font-weight: 700`, `letter-spacing: -0.02em`
- Descripción largo en hero, `line-height: 1.7`, `max-width: 68rem`
- Meta row: year + Desktop/Mobile como pills `--surface-2` + `--border-subtle`
- Links en hero como action buttons: outline (`--surface-1` + `--card-border`) + demo fill `--primary-color`
- `project-info` section eliminada (absorbida en hero)
- Tech stack: pills inline con `--surface-1` + `--card-border` + `--radius-pill`, hover glow sutil
- `project-subtitle` estilo ALL-CAPS small-label (`1.4rem`, `text-transform: uppercase`, `letter-spacing: 0.08em`)
- Gallery: título + espaciado mejorado
- Markdown content: `:global()` con h2/h3/p/ul/li/strong/a/code styled
- `year` añadido al destructuring de `project.data`
- `data-reveal` en hero + subtitle, `data-reveal-stagger` en tech stack

`ProjectFigure.astro`:
- `--card-border` + `--radius-lg` + `--card-shadow` (reemplaza `--border-primary` + `0.5rem` + ninguno)
- `--surface-1` bg (reemplaza `--content-color` no definida en UI-1)
- Hover `translateY(-2px)` en figura + `--shadow-strong` en frame
- Caption: `1.4rem`, `--text-muted`, `line-height: 1.5`

`ProjectLinks.astro`:
- Props extendidas: añadidos `githubFrontend?` + `githubBackend?`
- DevManager `githubBackend` ahora renderizable
- Estilos premium: misma familia que hero actions
- Demo fill `--primary-color` → hover transparente

`ProjectContact.astro`:
- Card con `--surface-1` + `--card-border` + `--radius-lg`
- Accent gradient line en top (pseudo `::before`)
- Ícono mail `--primary-color`, `3.2rem`
- CTA: fill `--primary-color` → hover outline
- `float-up` infinito eliminado, flecha `translateX(3px)` en hover

**Validaciones:**
- `pnpm astro check`: 0 errores, 0 warnings, 25 hints preexistentes
- `pnpm build`: 6 páginas + robots + sitemap. 902ms

### Fase UI-7

**Creados:**
- `UI_QA_REPORT.md` — reporte completo de QA visual, accesibilidad y decisión Magic UI/Aceternity

**Auditoría:**
- 0 regresiones críticas
- Home: PASS todas las secciones
- Detail pages: PASS con 3 issues menores
- Accesibilidad: PASS checklist completo
- `pnpm astro check`: 0 errores, `pnpm build`: clean

**Issues menores para UI-7.1:**
1. `.section__title` sin `font-size` explícito en globals
2. Toast `background: --white-primary-color` inconsistente en dark theme
3. Gallery `<ProjectFigure>` sin `data-reveal` en `[slug].astro`
4. `year` ausente en los 5 frontmatters de proyectos

**Decisión Magic UI / Aceternity:** No necesario. Implementación nativa alcanza nivel premium.

### Fase UI-7.1

**Modificados:**
- `src/styles/globals.css` — fix 1 + fix 2
- `src/components/ui/ProjectFigure.astro` — fix 3

**Fix 1 — `section__title` font-size:**
Añadido `font-size: 2.4rem; font-weight: 700; letter-spacing: -0.01em;` a `.section__title` en globals. Ya no depende del browser default de `<h2>`.

**Fix 2 — Toast dark theme:**
`.toast` cambiado de `background: --white-primary-color; color: --black-primary-color` a `background: --surface-elevated; color: --title-color; box-shadow: --shadow-strong; border: --border-normal`. Toast ahora es coherente en dark y light theme.

**Fix 3 — Gallery data-reveal:**
`data-reveal` añadido al root `<figure class="project-figure">` de `ProjectFigure.astro`. Aplica a galería Y a la cover del hero (la cover es pre-marcada `is-visible` al estar en viewport — sin flash).

**Fix 4 — year en frontmatters:**
**PENDIENTE — sin datos confiables.** Los 5 proyectos (Legado de Tlapa, Contextos Guerrero, DevManager, Share Groups, Admin Sites) no tienen año en frontmatter ni en contenido del `.md`. No se inventaron años. Requiere confirmación del usuario con fechas reales de entrega/lanzamiento. El campo `year` es `optional()` en el schema — las páginas de detalle muestran solo Desktop/Mobile hasta que se agregue.

**Validaciones:**
- `pnpm astro check`: 0 errores, 0 warnings, 25 hints preexistentes
- `pnpm build`: 6 páginas + robots + sitemap. 909ms

### Fase UI-8

**Modificados:**
- `src/components/home/ContactForm.astro` — toast `aria-live="polite" role="status" aria-atomic="true"` + `aria-hidden` en ícono

**Creados:**
- `FINAL_RELEASE_CHECKLIST.md` — checklist completo de readiness para deploy

**Validaciones:**
- `pnpm astro check`: 0 errores, 0 warnings, 25 hints preexistentes
- `pnpm build`: 6 páginas + robots.txt + sitemap.xml — 936ms
- Todas las rutas presentes en `dist/`

**Veredicto:** `READY_WITH_NON_BLOCKING_PENDING`

## Estado final del proyecto

Portafolio completamente modernizado. Todas las fases UI-0 → UI-8 completadas.

**Pendientes no bloqueantes:**
- `year` en 5 frontmatters de proyectos (requiere confirmación de fechas reales)
- `siteConfig.contactApi` — endpoint pendiente (form falla de forma controlada)
- Light theme no verificado visualmente en browser
- Lighthouse manual requiere `pnpm preview` + Chrome

**Para deploy:** `pnpm build` → subir `dist/`. Ver `FINAL_RELEASE_CHECKLIST.md`.

### Fase BLOG-3

**Creados:**
- `src/pages/blog/index.astro` — índice del blog. Filtra drafts en producción, ordena por `publishedAt` desc, separa `featured`, renderiza `FeaturedPostCard` + grid de `BlogCard`. Empty state si no hay posts publicados. `ogType="website"`. JSON-LD `Blog`.
- `src/pages/blog/[slug].astro` — detalle de artículo. `getStaticPaths` con filtro de drafts. `render()` para Markdown. `PostHeader`. `.post-content` con estilos mínimos de legibilidad. `ogType="article"`. JSON-LD `BlogPosting`.

**Modificados:**
- `src/layouts/BlogLayout.astro` — añadido prop `ogType?: 'website' | 'article'` (default `'article'`). Elimina el `ogType="article"` hardcodeado anterior.
- `src/data/navigation.ts` — añadido item Blog (`href: '/blog'`, icon `bx-book-open`) al final de `navItems`.
- `src/pages/sitemap.xml.ts` — añadido `/blog` + posts publicados (filtro `!data.draft`). Drafts excluidos del sitemap.

**Rutas generadas en build de producción:**
- `/blog` (índice con empty state — solo post existente es draft)
- No genera `/blog/primer-borrador-blog` en build (correcto — es draft)

**Comportamiento de drafts:**
- `import.meta.env.DEV` controla visibilidad de drafts.
- En dev (`pnpm dev`): drafts visibles, `/blog/primer-borrador-blog` accesible.
- En build (`pnpm build`): drafts filtrados. Empty state en `/blog`. No genera páginas de draft.
- Sitemap excluye siempre drafts (filter `!data.draft` sin condición DEV).

**Validaciones:**
- `pnpm astro check`: 0 errores, 0 warnings, 45 hints preexistentes.
- `pnpm build`: 7 páginas + robots.txt + sitemap.xml. 883ms.

### Fase BLOG-4

**Modificados:**
- `src/pages/blog/[slug].astro` — estilos editoriales completos en `.post-content` vía `:global()`
- `src/content/blog/primer-borrador-blog.md` — ejemplos mínimos añadidos para validar todos los estilos

**Estilos aplicados en `.post-content`:**
- `h2` — `border-block-end` editorial, margen superior generoso (`5.2rem`)
- `h3`, `h4` — jerarquía clara, peso y tamaño diferenciados
- `h2/h3/h4:first-child` — sin margen superior al inicio del artículo
- `p` — `line-height: 1.85`, `text-wrap: pretty`, `font-size: 1.7rem`
- `strong` — `--title-color`, `font-weight: 600`
- `em` — `--text-muted`, `font-style: italic`
- `ul/ol/li` — espaciado cómodo, `padding-inline-start: 2.4rem`
- `li > ul/ol` — nested lists sin margen extra al fondo
- `a` — `--primary-color`, `text-decoration-thickness: 1px`, `transition`
- `code` — `--surface-2` bg, `--border-subtle` border, `--primary-color`, font stack monospace
- `pre` — `--surface-2` bg, `--border-normal` border, `--radius-md`, scroll horizontal, `-webkit-overflow-scrolling: touch`
- `pre code` — reset estilos inline, font stack monospace, `tab-size: 2`, `line-height: 1.75`
- `blockquote` — `border-inline-start` accent + `border` completo, `--surface-1` bg, `--radius-md`
- `blockquote p` — `color: --text-color` (no muted)
- `blockquote p strong:first-child` — `--primary-color` (resalta etiqueta Nota/Tip/Advertencia)
- `hr` — `border-subtle`, margen `4.8rem`
- `table` — `display: block; overflow-x: auto` (mobile safe), `border-collapse: collapse`
- `th` — `--surface-2` bg, `--border-normal`, `white-space: nowrap`
- `td` — `--border-subtle`, zebra stripes en pares
- `img` (markdown nativo) — `max-width: 100%`, `--radius-lg`, `--card-border`, centrada
- `figure/figcaption` — márgenes y tipografía muted

**Draft actualizado con:**
- `h2`, `h3`, `h4`
- párrafo con inline, bold e itálica
- listas ordenada y desordenada con anidación
- código inline en párrafo
- bloque TypeScript + bloque bash
- callout Nota, Tip, Advertencia
- tabla de 4 columnas
- imagen Markdown nativa (ruta de cover como placeholder)

**Validaciones:**
- `pnpm astro check`: 0 errores, 0 warnings, 45 hints preexistentes.
- `pnpm build`: 7 páginas + robots.txt + sitemap.xml. 914ms.

### Fase BLOG-2

**Creados:**
- `src/components/blog/TagPill.astro` — pill para tag. Renderiza `<a>` o `<span>` según `href`. Tokens: `--surface-2`, `--border-subtle`, `--radius-pill`.
- `src/components/blog/CategoryPill.astro` — pill para categoría. `Record<BlogCategory, string>` para labels legibles. Accent `--primary-color`. Renderiza `<a>` o `<span>`.
- `src/components/blog/PostMeta.astro` — fecha formateada en `es-MX`, categoría via `CategoryPill`, readingTime, updatedAt condicionales.
- `src/components/blog/BlogCard.astro` — card de artículo: `--surface-1` + `--card-border` + `--radius-lg`. Hover `translateY(-2px)` + `--shadow-soft`. Cover `16/9` con scale `1.02`. Fallback visual si no hay cover. `data-reveal`. Sin shine border.
- `src/components/blog/FeaturedPostCard.astro` — card destacada: grid 1col mobile / 2col desktop. Cover prominente. Título `2.4rem` → `3rem`. Badge "Destacado". `data-reveal`.
- `src/components/blog/PostHeader.astro` — encabezado de artículo: título `3.2rem` → `4.2rem`, description muted, cover con frame premium. `data-reveal` + `data-reveal-delay` 1–3. `max-width: 70rem`.
- `src/components/blog/BlogImage.astro` — figura con caption para imágenes en artículos. `loading="lazy"`, frame coherente con `ProjectFigure`. Renderiza nada si `src` está vacío.
- `src/layouts/BlogLayout.astro` — wrapper de `BaseLayout`. Integra `Navbar(variant="home")`, `ScrollTop`, `Footer`. Props SEO: `title`, `description`, `canonical`, `ogImage`, `jsonLd`. `ogType="article"` fijo.

**Decisiones técnicas:**
- Imports de tipos usan rutas relativas `../../types/index` — alias `@types/*` no disponible (renombrado a `@ptypes/*`).
- Ningún componente importa Content Collections.
- `BlogCard` usa `--surface-1` (no `--card-surface`) — alineado con `BLOG_STRATEGY.md`.
- `FeaturedPostCard` muestra `description` con fallback a `excerpt`.
- `data-reveal` sin dependencia de JS para visibilidad — motion system es aditivo.
- `pnpm astro check`: 0 errores, 0 warnings, 45 hints preexistentes.
- `pnpm build`: 6 páginas + robots.txt + sitemap.xml. 846ms.
