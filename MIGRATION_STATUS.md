# MIGRATION_STATUS.md

## Estado actual

Fase actual: Fase 6 completada — Componentes UI.

## Fases completadas

- [x] Fase 1 — Setup del proyecto
- [x] Fase 2 — Tipos y datos
- [x] Fase 3 — Scripts del cliente
- [x] Fase 4 — Layouts
- [x] Fase 5 — Componentes shared
- [x] Fase 6 — Componentes UI
- [ ] Fase 7 — Componentes de home
- [ ] Fase 8 — Secciones del home
- [ ] Fase 9 — Componentes de detalle de proyecto
- [ ] Fase 10 — Páginas
- [ ] Fase 11 — Validación final

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

## Próximo paso

Ejecutar la tarea definida en `MIGRATION_TASK.md` (Fase 7 — Componentes de home).
