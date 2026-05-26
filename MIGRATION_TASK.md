# MIGRATION_TASK.md

## Tarea actual

Fase UI-6 — Páginas de detalle de proyecto modernizadas.

## Contexto

La UI ya tiene:

- UI-0: dirección visual "Engineered Darkness".
- UI-1: design tokens premium.
- UI-2: motion system nativo.
- UI-3: Hero premium.
- UI-4: Project cards premium.
- UI-5: Experience, Skills y Contact polish.

Ahora se deben modernizar las páginas de detalle de proyectos para que mantengan coherencia con el home modernizado.

No se debe instalar Magic UI, Aceternity UI, React, Tailwind ni Motion.

## Objetivo

Elevar visualmente `/projects/[slug]` para que tenga la misma calidad premium que el home.

La mejora debe sentirse:

- dark premium.
- técnica.
- editorial.
- coherente con el home.
- con microinteracciones sutiles.

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- `UI_DIRECTION.md`
- `.claude/skills/ui-modernizer/SKILL.md`
- `src/pages/projects/[slug].astro`
- `src/components/project/ProjectLinks.astro`
- `src/components/project/ProjectContact.astro`
- `src/components/ui/ProjectFigure.astro`
- `src/styles/globals.css`

## Comandos baratos permitidos

    git status --short
    git diff --stat
    rg "ProjectLinks|ProjectContact|ProjectFigure|project|slug|detail|header|tech|gallery|markdown" src/pages/projects -n

## Archivos permitidos para edición

- `src/pages/projects/[slug].astro`
- `src/components/project/ProjectLinks.astro`
- `src/components/project/ProjectContact.astro`
- `src/components/ui/ProjectFigure.astro`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Archivos prohibidos

No modificar:

- `src/components/sections/**`
- `src/components/home/**`
- `src/components/shared/**`
- `src/components/ui/TechBadge.astro`
- `src/components/ui/TechIcon.astro`
- `src/layouts/**`
- `src/scripts/**`
- `src/styles/**`
- `src/data/**`
- `src/icons/**`
- `public/**`
- `package.json`
- `tsconfig.json`
- `astro.config.mjs`

## Alcance exacto

### 1. Página de detalle `[slug].astro`

- Header de proyecto más prominente (título grande, año, tech stack).
- Cover con mejor tratamiento visual.
- TechBadge en entrada con stagger.
- ProjectLinks más visibles y refinados.
- Contenido markdown legible y tipográficamente correcto.
- `data-reveal` en secciones clave.

### 2. ProjectLinks

- Botones con borde visible y hover premium.
- Usar tokens globales existentes.

### 3. ProjectContact

- CTA más integrado con el diseño.
- Coherencia con el home.

### 4. ProjectFigure

- Imagen con mejor tratamiento.
- Caption más legible.

### 5. Responsive

- Mobile, tablet, desktop sin overflow.

## Criterios de aceptación

- Detalle de proyecto se siente premium y coherente con el home.
- ProjectLinks visibles y accesibles.
- Markdown content legible.
- Sin overflow horizontal.
- `pnpm astro check` pasa.
- `pnpm build` pasa.

## Validaciones

    pnpm astro check
    pnpm build
    git diff --stat

## Respuesta esperada

1. Cambios visuales aplicados.
2. Archivos modificados.
3. Resultado de `pnpm astro check`.
4. Resultado de `pnpm build`.
5. Pendientes visuales.
6. Confirmación de que no avanzaste a UI-7.
