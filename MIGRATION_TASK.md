# MIGRATION_TASK.md

## Tarea actual

Fase UI-1 — Design tokens y base visual premium.

## Contexto

La dirección visual está definida en `UI_DIRECTION.md`. Esta fase solo toca `src/styles/globals.css`. No se modifican componentes, páginas ni scripts.

El objetivo es enriquecer el sistema de tokens CSS para soportar profundidad, jerarquía de superficies, bordes visibles y transitions consistentes. Los tokens se definen ahora y se consumen en fases siguientes (UI-2 en adelante).

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- `UI_DIRECTION.md`
- `src/styles/globals.css`

## Archivos permitidos para edición

- `src/styles/globals.css`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Archivos prohibidos

Todo lo demás. Si necesitas leer otro archivo, detente y pide confirmación.

## Alcance exacto

### 1. Añadir tokens de superficie (dark theme y light theme)

En `:root` (light):
- `--surface-0: var(--body-color)` — fondo base
- `--surface-1: #F1F1F1` — superficie elevada leve
- `--surface-2: #E8E8E8` — superficie elevada media

En `html.dark-theme`:
- `--surface-0: #18181B` — fondo base (igual a `--body-color` dark)
- `--surface-1: #1F1F23` — superficie elevada leve
- `--surface-2: #27272A` — superficie elevada media

### 2. Añadir tokens de borde

En `:root`:
- `--border-subtle: 0.1rem solid rgba(0, 0, 0, 0.06)`
- `--border-normal: 0.1rem solid rgba(0, 0, 0, 0.12)`
- `--border-glow: 0 0 0 1px rgba(211, 115, 78, 0.35)` — para hover states

En `html.dark-theme`:
- `--border-subtle: 0.1rem solid rgba(255, 255, 255, 0.05)`
- `--border-normal: 0.1rem solid rgba(255, 255, 255, 0.10)`
- `--border-glow: 0 0 0 1px rgba(211, 115, 78, 0.40)`

### 3. Añadir tokens de border-radius

En `:root` (global, no varían por tema):
- `--radius-sm: 0.4rem`
- `--radius-md: 0.8rem`
- `--radius-lg: 1.2rem`

### 4. Añadir tokens de transición

En `:root`:
- `--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)`
- `--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1)`
- `--transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1)`

### 5. Añadir token de color primario con transparencia

En `:root`:
- `--primary-color-alpha: rgba(211, 115, 78, 0.15)`

En `html.dark-theme`:
- `--primary-color-alpha: rgba(211, 115, 78, 0.20)`

### 6. Añadir base `prefers-reduced-motion`

Al final de `globals.css`, antes de los media queries existentes o al final:

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

### 7. Opcional — ajustar container max-width

Si se decide: cambiar `max-width: 76rem` a `max-width: 82rem`. Evaluar si tiene impacto visual positivo. Solo aplicar si la decisión es clara.

## Criterios de aceptación

- Nuevas variables en `:root` y `html.dark-theme`.
- `pnpm astro check` sin errores.
- `pnpm build` sin errores.
- No hay cambio visual perceptible (tokens definidos pero no usados aún).
- `git diff --stat` muestra solo `globals.css`.

## Validaciones

```
pnpm astro check
git diff --stat
```

No ejecutar `pnpm build` salvo necesidad.

## Respuesta esperada

1. Tokens añadidos.
2. `git diff --stat` output.
3. Confirmación de que no se modificaron otros archivos.
