# MIGRATION_TASK.md

## Tarea actual

Fase 4 — Layouts.

## Contexto

Fase 3 completada. Scripts de cliente listos en `src/scripts/` (`theme.ts`, `navbar.ts`, `animations.ts`). Exportan funciones `initTheme`, `initNavbar`, `initAnimations`.

## Objetivo

Implementar los layouts base en `src/layouts/`. Como mínimo:

- `BaseLayout.astro` — layout raíz con `<html>`, `<head>` (meta, SEO, fonts), `<body>`, slot principal. Debe conectar `initTheme()` e `initAnimations()` vía `<script>`.

No implementar componentes, secciones ni páginas.

## Archivos permitidos para lectura

### Contexto de control

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

### Proyecto destino

- `src/layouts/` (directorio completo)
- `src/data/site.ts`
- `src/scripts/theme.ts`
- `src/scripts/animations.ts`
- `tsconfig.json`
- `package.json`

### Proyecto legacy

Solo si hace falta para extraer estructura HTML del `<head>`:

- `../tsx-v2-vanilla/index.html` — leer parcial con offset/limit, solo el `<head>`

No leer archivos legacy completos si basta con `rg`.

## Comandos baratos permitidos

```bash
find src/layouts -type f 2>/dev/null | sort
rg "charset|viewport|og:|font|favicon|lang" ../tsx-v2-vanilla/index.html -n
```

## Layouts esperados en `src/layouts/`

- `BaseLayout.astro` — HTML base, head con SEO, fonts, favicon. Conecta `initTheme` + `initAnimations`. Slot `<slot />`.

## Reglas

- Cero `any`.
- No importar frameworks.
- No implementar componentes, secciones ni páginas.
- No tocar archivos fuera de `src/layouts/`.
- No avanzar a Fase 5.

## Al terminar

- Actualizar `MIGRATION_STATUS.md`.
- Actualizar `MIGRATION_TASK.md` con Fase 5 preparada.
- Resumen breve de cambios.
