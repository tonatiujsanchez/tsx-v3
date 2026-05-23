# MIGRATION_TASK.md

## Tarea actual

Fase 10 — Páginas.

## Contexto

Las fases anteriores dejaron lista toda la base:

- Fase 1: setup, estructura y assets.
- Fase 2: tipos, datos, íconos y Content Collections.
- Fase 3/3.1: scripts cliente en TypeScript.
- Fase 4: layouts base.
- Fase 5: componentes shared integrados en layouts.
- Fase 6: componentes UI reutilizables.
- Fase 7: componentes específicos del home.
- Fase 8/8.1: secciones del home y correcciones mínimas de datos.
- Fase 9: componentes de detalle de proyecto.

Ahora se deben implementar las páginas del sitio:

- `src/pages/index.astro` — home con todas las secciones.
- `src/pages/projects/[slug].astro` — detalle de proyecto (ruta dinámica).

## Objetivo

Conectar todos los componentes y layouts ya creados en páginas funcionales.
Las páginas solo deben orquestar componentes existentes — no implementar lógica ni UI nueva.

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- `src/types/index.ts`
- `src/data/site.ts`
- `src/data/navigation.ts`
- `src/content.config.ts`
- `src/content/projects/*.md`
- `src/layouts/MainLayout.astro`
- `src/layouts/ProjectLayout.astro`
- `src/components/sections/*.astro`
- `src/components/project/ProjectLinks.astro`
- `src/components/project/ProjectContact.astro`
- `src/components/ui/TechBadge.astro`
- `src/components/ui/ProjectFigure.astro`
- `src/pages/index.astro` (si ya existe)
- `src/pages/projects/[slug].astro` (si ya existe)

Archivos legacy solo si hace falta confirmar estructura visual:

- HTML legacy de home.
- HTML legacy de detalle de proyecto.

Leer solo fragmentos necesarios con `rg`.

## Comandos baratos permitidos

    git status --short
    git diff --stat
    find src/pages -maxdepth 3 -type f 2>/dev/null | sort
    find src/components/sections -maxdepth 1 -type f | sort
    find src/components/project -maxdepth 1 -type f | sort
    rg "getCollection|getEntry|slug" src -n

## Archivos permitidos para edición

- `src/pages/index.astro`
- `src/pages/projects/[slug].astro`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Archivos prohibidos

No modificar:

- `src/components/**`
- `src/layouts/**`
- `src/scripts/**`
- `src/content/**`
- `src/data/**`
- `src/icons/**`
- `src/styles/**`
- `public/**`
- `package.json`
- `tsconfig.json`
- `astro.config.mjs`

Si necesitas modificar un archivo prohibido, primero explica por qué y espera confirmación.

## Alcance exacto

### 1. Crear `src/pages/index.astro`

Debe usar `MainLayout` e incluir todas las secciones en orden:

1. `HeroSection`
2. `ExperienceSection`
3. `ProjectsSection`
4. `SkillsSection`
5. `ContactSection`

Props mínimas: pasar `title` y `description` desde `siteConfig`.

### 2. Crear `src/pages/projects/[slug].astro`

Ruta dinámica. Debe:

- Exportar `getStaticPaths()` usando `getCollection('projects')`.
- Recibir el proyecto en `Astro.props`.
- Usar `ProjectLayout`.
- Renderizar: título, descripción, año, tech stack con `TechBadge`, galería con `ProjectFigure`, `ProjectLinks`, contenido markdown (`<Content />`), `ProjectContact`.
- Manejar el caso `githubFrontend` + `githubBackend` de DevManager (renderizar ambos links o combinar en `ProjectLinks`).
- No renderizar secciones vacías si no hay datos.

## Fuera de alcance

- No crear rutas adicionales.
- No modificar layouts.
- No modificar componentes.
- No modificar Content Collections ni datos.
- No avanzar a Fase 11.

## Criterios de aceptación

- Existe `src/pages/index.astro`.
- Existe `src/pages/projects/[slug].astro`.
- `pnpm astro check` pasa sin errores.
- `pnpm build` completa sin errores.
- `MIGRATION_STATUS.md` queda actualizado.
- `MIGRATION_TASK.md` queda preparado para Fase 11, pero Fase 11 no se ejecuta.

## Validaciones

Ejecutar:

    pnpm astro check
    pnpm build
    git diff --stat

## Respuesta esperada

Responder solo con:

1. Archivos modificados.
2. Qué se implementó.
3. Validaciones ejecutadas.
4. Pendientes.
5. Confirmación de que no se avanzó a Fase 11.
