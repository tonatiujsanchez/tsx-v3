# MIGRATION_TASK.md

## Tarea actual

Fase UI-2 — Motion system nativo.

## Contexto

UI-1 completada. `src/styles/globals.css` tiene sistema completo de tokens: superficies, bordes visibles en dark, radius, shadows, transitions y tokens de card/backdrop para fases posteriores.

`animations.ts` existe pero no está conectado. `animations.css` tiene keyframes base. No hay scroll reveal activo. Contenido aparece sin transición.

## Objetivo

Conectar el motion system: scroll reveal blur-fade en secciones, stagger en listas, scroll progress bar. Sin dependencias. Respetar `prefers-reduced-motion`.

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- `UI_DIRECTION.md`
- `.claude/skills/ui-modernizer/SKILL.md`
- `src/scripts/animations.ts`
- `src/styles/animations.css`
- `src/styles/globals.css`
- `src/layouts/MainLayout.astro`
- `src/components/sections/HeroSection.astro`
- `src/components/sections/ExperienceSection.astro`
- `src/components/sections/ProjectsSection.astro`
- `src/components/sections/SkillsSection.astro`
- `src/components/sections/ContactSection.astro`

## Archivos permitidos para edición

- `src/scripts/animations.ts`
- `src/styles/animations.css`
- `src/layouts/MainLayout.astro`
- `src/components/sections/HeroSection.astro`
- `src/components/sections/ExperienceSection.astro`
- `src/components/sections/ProjectsSection.astro`
- `src/components/sections/SkillsSection.astro`
- `src/components/sections/ContactSection.astro`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

Se puede crear:
- `src/components/shared/ScrollProgress.astro`

## Alcance exacto

1. Extender `animations.ts` con blur-fade reveal y stagger por item.
2. Añadir keyframes `blur-fade-in` y `stagger-reveal` a `animations.css`.
3. Añadir `[data-animate]` a secciones en sus respectivos `.astro`. CSS no oculta por defecto — JS añade clase `.is-visible`.
4. Crear `ScrollProgress.astro` (barra de progreso en top del viewport, TS inline, sin React).
5. Integrar `ScrollProgress` en `MainLayout.astro`.
6. `prefers-reduced-motion` respetado: opacity puro, sin translate.
7. No conectar en `ProjectLayout` todavía.

## Fuera de alcance

- No modificar componentes de home/ui/project.
- No modificar páginas.
- No instalar dependencias.
- No avanzar a UI-3.

## Criterios de aceptación

- Secciones revelan al entrar al viewport.
- Sin contenido invisible si JS falla (no hay CSS que oculte).
- Scroll progress bar visible en desktop.
- `pnpm astro check` sin errores.
- `pnpm build` sin errores.

## Validaciones

    pnpm astro check
    pnpm build
    git diff --stat