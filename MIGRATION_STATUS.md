# MIGRATION_STATUS.md

## Estado actual

Fase actual: Fase 11.1 completada — Optimización SEO para Lighthouse 100.

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

## Próximo paso

Ejecutar Lighthouse SEO manualmente:
```
pnpm preview
npx lighthouse http://localhost:4321 --only-categories=seo --chrome-flags="--headless"
npx lighthouse http://localhost:4321/projects/admin-sites --only-categories=seo --chrome-flags="--headless"
```
