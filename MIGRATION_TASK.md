# MIGRATION_TASK.md

## Tarea actual

Fase 6 — Componentes UI.

## Contexto

Fase 5 completada. Componentes shared listos. Layouts conectados con Navbar, Footer, ScrollTop, ThemeToggle. Scripts cliente activos.

## Objetivo

Crear los componentes base reutilizables en `src/components/ui/`:

- `Button.astro` — botón primario/secundario/outline con variantes y tamaños
- `Tag.astro` — etiqueta de tecnología (usada en ProjectCard y detalle)
- `TechIcon.astro` — ícono de tecnología usando `iconMap` de `src/icons/`
- `SectionTitle.astro` — título de sección con estructura semántica consistente

No implementar secciones del home ni páginas.

## Archivos permitidos para lectura

### Contexto de control

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

### Proyecto destino

- `src/components/ui/` (directorio completo)
- `src/icons/IconMap.ts`
- `src/icons/index.ts`
- `src/types/index.ts`
- `tsconfig.json`

### Proyecto legacy

Solo si hace falta confirmar variantes o nombres de clases BEM:

- `rg` sobre `../tsx-v2-vanilla/assets/css/` para clases `.button`, `.tag`, `.section__title`

## Comandos baratos permitidos

```bash
find src/components/ui -type f 2>/dev/null | sort
find src/icons -type f | sort
rg "\.button|\.tag|section__title|tech-icon" ../tsx-v2-vanilla/assets/css/ -n -l
```

## Archivos permitidos para edición

- `src/components/ui/**`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Archivos prohibidos

No modificar ningún archivo fuera de `src/components/ui/`, `MIGRATION_STATUS.md` y `MIGRATION_TASK.md`.

## Reglas

- Cero `any`.
- No importar frameworks.
- No implementar secciones del home ni páginas.
- No avanzar a Fase 7.

## Al terminar

- Actualizar `MIGRATION_STATUS.md`.
- Actualizar `MIGRATION_TASK.md` con Fase 7 preparada.
- Resumen breve de cambios.
