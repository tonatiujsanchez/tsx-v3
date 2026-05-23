# MIGRATION_STATUS.md

## Estado actual

Fase actual: Fase 3 completada — Scripts del cliente.

## Fases completadas

- [x] Fase 1 — Setup del proyecto
- [x] Fase 2 — Tipos y datos
- [x] Fase 3 — Scripts del cliente
- [ ] Fase 4 — Layouts
- [ ] Fase 5 — Componentes shared
- [ ] Fase 6 — Componentes UI
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
- `src/scripts/navbar.ts` — scroll spy con `section[id]`, activa clases BEM `nav__link--active` / `nav__item--active`
- `src/scripts/animations.ts` — IntersectionObserver para elementos `[data-animate]`, añade `is-visible`

## Decisiones técnicas tomadas (Fase 3)

- Tema aplica clase `dark-theme` sobre `document.documentElement` (html), confirmando decisión de Fase 2.
- Toggle button usa selector `[data-theme-toggle]` (data attribute, compatible con cualquier elemento HTML).
- Navbar usa BEM classes heredadas del legacy para compatibilidad con futuros componentes.
- `animations.ts` usa `[data-animate]` attribute en lugar de clases, desacopla animación de presentación.
- Scroll listener en navbar usa `{ passive: true }` para performance.
- Scripts exportan funciones `init*` — se invocan desde layouts/componentes Astro en Fases 4+.

## Pendientes conocidos

- `src/icons/svgs/` solo tiene `zustand.svg`. Faltan SVG files para el resto de tecnologías. Se agregan en Fase 5/6 al implementar el componente de íconos.
- `siteConfig.contactApi` en `src/data/site.ts` tiene TODO pendiente (API de contacto).
- Los `init*` scripts no están conectados a ningún layout/componente aún — se conectan en Fase 4 (layouts).

## Riesgos

- Consumo excesivo de tokens si se reanaliza el repo completo en cada fase.
- Duplicación de CSS si se copia demasiado del proyecto legacy.
- Hardcodeo accidental de datos en componentes.

## Próximo paso

Ejecutar la tarea definida en `MIGRATION_TASK.md` (Fase 4 — Layouts).
