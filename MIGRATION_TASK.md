# MIGRATION_TASK.md

## Tarea actual

Fase UI-7/UI-8 — Visual QA + Lighthouse audit.

## Contexto

La UI ya tiene:

- UI-0: dirección visual "Engineered Darkness".
- UI-1: design tokens premium.
- UI-2: motion system nativo.
- UI-3: Hero premium.
- UI-4: Project cards premium.
- UI-5: Experience, Skills y Contact polish.
- UI-6: Páginas de detalle premium.

El home y las páginas de detalle están modernizadas. Toca hacer QA visual + auditoría Lighthouse final.

## Objetivo

Verificar que el portafolio completo funcione correctamente, sin regresiones, accesible y con buen performance.

## Tareas

### 1. Visual QA con skill `visual-qa`

Ejecutar el skill `visual-qa` sobre:
- Home desktop
- Home mobile
- Páginas de detalle

Detectar:
- Overflow horizontal
- Inconsistencias visuales entre secciones
- Exceso de efectos
- Problemas de contraste
- Focus visible en interactivos
- Contenido visible sin JS
- Comportamiento en light theme

### 2. Lighthouse audit

Ejecutar `pnpm preview` + Lighthouse:
- Performance ≥ 90
- SEO = 100
- Accesibilidad ≥ 95
- Best Practices ≥ 90

### 3. Fixes de regresión

Solo fixes puntuales detectados en QA. No rediseñar.

## Archivos probables para edición

Depende de los hallazgos del QA. Cualquier archivo de componente permitido anteriormente.

## Criterios de aceptación

- Visual QA sin hallazgos críticos.
- Lighthouse mínimos alcanzados.
- `pnpm astro check` pasa.
- `pnpm build` pasa.
- MIGRATION_STATUS.md actualizado.

## Validaciones

    pnpm astro check
    pnpm build
    pnpm preview  # luego Lighthouse manual
