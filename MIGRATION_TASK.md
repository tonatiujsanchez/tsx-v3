# MIGRATION_TASK.md

## Tarea actual

Fase 9 — Componentes de detalle de proyecto.

## Contexto

Fase 8 y 8.1 completadas. Secciones del home listas y corregidas.

Pendientes conocidos:
- SVGs tecnológicos en `public/icons/{slug}.svg` — `TechIcon` los referencia pero no existen.
- `siteConfig.contactApi` vacío.
- Años de proyectos en markdown usando `year` opcional del schema.

## Objetivo

Crear los componentes específicos de la página de detalle de proyecto en `src/components/project/`:

- `ProjectHeader.astro` — título, año, descripción, links (demo, github/githubFrontend/githubBackend)
- `ProjectGallery.astro` — galería de imágenes usando `ProjectFigure`
- `ProjectTechList.astro` — lista de tecnologías usando `TechBadge`

No implementar páginas ni secciones del home.

## Archivos permitidos para lectura

### Contexto de control

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

### Proyecto destino

- `src/components/project/` (directorio completo)
- `src/components/ui/TechBadge.astro`
- `src/components/ui/ProjectFigure.astro`
- `src/types/index.ts`
- `src/content.config.ts`

## Comandos baratos permitidos

```bash
find src/components/project -type f 2>/dev/null | sort
rg "cover|gallery|demo|github|year|tech" src/content.config.ts -n
```

## Archivos permitidos para edición

- `src/components/project/**`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Archivos prohibidos

No modificar nada fuera de `src/components/project/`, `MIGRATION_STATUS.md` y `MIGRATION_TASK.md`.

## Reglas

- Cero `any`.
- No importar frameworks.
- Componentes reciben props, no leen Content Collections directamente.
- No implementar páginas.
- No avanzar a Fase 10.

## Al terminar

- Actualizar `MIGRATION_STATUS.md`.
- Actualizar `MIGRATION_TASK.md` con Fase 10 preparada.
- Resumen breve de cambios.
