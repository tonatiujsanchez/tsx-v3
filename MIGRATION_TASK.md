# MIGRATION_TASK.md

## Tarea actual

Fase 5 — Componentes shared.

## Contexto

Fase 4 completada. Layouts base listos en `src/layouts/`. Scripts cliente en `src/scripts/` sin conectar aún.

Pendiente antes de conectar scripts: reconciliar key de localStorage entre `theme.ts` (`theme-tsx`) y anti-FOUC de `BaseLayout` (`selected-theme-tsx`).

## Objetivo

Crear los componentes globales reutilizables en `src/components/shared/`:

- `Navbar.astro`
- `Footer.astro`
- `ThemeToggle.astro`
- `ScrollTop.astro`

Conectar scripts cliente desde estos componentes. Integrarlos en `MainLayout.astro` y `ProjectLayout.astro`.

## Archivos permitidos para lectura

### Contexto de control

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

### Proyecto destino

- `src/components/shared/` (directorio completo)
- `src/layouts/BaseLayout.astro`
- `src/layouts/MainLayout.astro`
- `src/layouts/ProjectLayout.astro`
- `src/scripts/theme.ts`
- `src/scripts/navbar.ts`
- `src/scripts/scroll.ts`
- `src/data/navigation.ts`
- `src/data/site.ts`
- `tsconfig.json`

### Proyecto legacy

Solo si hace falta extraer estructura HTML:

- `../tsx-v2-vanilla/assets/css/` — rg para clases BEM de navbar/footer
- `../tsx-v2-vanilla/index.html` — rg para estructura de navbar/footer

No leer archivos legacy completos si basta con `rg`.

## Comandos baratos permitidos

```bash
find src/components/shared -type f 2>/dev/null | sort
rg "nav__|footer__|scroll-top|theme-toggle" ../tsx-v2-vanilla/assets/css/ -n -l
rg "class=\"nav|class=\"footer|scroll-top|theme" ../tsx-v2-vanilla/index.html -n
```

## Archivos permitidos para edición

- `src/components/shared/**`
- `src/layouts/MainLayout.astro`
- `src/layouts/ProjectLayout.astro`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Reglas

- Reconciliar key localStorage entre `theme.ts` y anti-FOUC de `BaseLayout` antes de conectar.
- Cero `any`.
- No importar frameworks.
- No tocar `src/pages/`, `src/data/`, `src/scripts/`, `src/styles/`.
- No avanzar a Fase 6.

## Al terminar

- Actualizar `MIGRATION_STATUS.md`.
- Actualizar `MIGRATION_TASK.md` con Fase 6 preparada.
- Resumen breve de cambios.
