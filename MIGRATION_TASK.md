# MIGRATION_TASK.md

## Tarea actual

Fase 8 — Secciones del home.

## Contexto

Fase 7 completada. Componentes de home listos: `JobCard`, `ProjectCard`, `ContactForm`.

Pendiente de mapeo: `ProjectCard` usa `thumbnail{full,md,sm}` pero Content Collection tiene `cover` (único). Fase 8 debe adaptar este mapeo al construir las secciones.

## Objetivo

Crear las secciones del home en `src/components/sections/`:

- `HeroSection.astro`
- `ExperienceSection.astro`
- `ProjectsSection.astro`
- `SkillsSection.astro`
- `ContactSection.astro`

No implementar páginas ni layouts.

## Archivos permitidos para lectura

### Contexto de control

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

### Proyecto destino

- `src/components/sections/` (directorio completo)
- `src/components/home/JobCard.astro`
- `src/components/home/ProjectCard.astro`
- `src/components/home/ContactForm.astro`
- `src/components/ui/TechBadge.astro`
- `src/components/ui/SocialLink.astro`
- `src/data/jobs.ts`
- `src/data/skills.ts`
- `src/data/site.ts`
- `src/data/navigation.ts`
- `src/types/index.ts`
- `src/content.config.ts`
- `tsconfig.json`

### Nota sobre proyectos

Para `ProjectsSection`, usar `getCollection('projects')` de `astro:content`. Mapear `cover` del frontmatter a `thumbnail.full` (y `md`/`sm`) al pasar props a `ProjectCard`.

## Comandos baratos permitidos

```bash
find src/components/sections -type f 2>/dev/null | sort
rg "interface Skill|interface Job" src/types -n
```

## Archivos permitidos para edición

- `src/components/sections/**`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Archivos prohibidos

No modificar nada fuera de `src/components/sections/`, `MIGRATION_STATUS.md` y `MIGRATION_TASK.md`.

## Reglas

- Cero `any`.
- No importar frameworks.
- Los datos se leen desde `src/data/` y `getCollection()` en el frontmatter de la sección.
- No hardcodear datos en las secciones.
- No implementar páginas.
- No avanzar a Fase 9.

## Al terminar

- Actualizar `MIGRATION_STATUS.md`.
- Actualizar `MIGRATION_TASK.md` con Fase 9 preparada.
- Resumen breve de cambios.
