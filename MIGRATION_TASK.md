# MIGRATION_TASK.md

## Tarea actual

Fase UI-3 — Hero premium.

## Contexto

UI-2 completada. Motion system activo: scroll reveal con IntersectionObserver, stagger 60ms por item, scroll progress bar en navbar desktop. Contenido visible sin JS.

Ahora el Hero debe sentirse editorial y premium. Es el primer contacto con el visitante — impacto máximo, sin exceso.

## Objetivo

Elevar HeroSection a nivel editorial. Nombre más grande, rol con peso visual, foto con presencia, dot pattern sutil, CTAs visibles, social links refinados. Sin exceso. Máximo 2 efectos simultáneos.

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- `UI_DIRECTION.md`
- `.claude/skills/ui-modernizer/SKILL.md`
- `.claude/skills/astro-effects-engineer/SKILL.md`
- `src/styles/globals.css`
- `src/styles/animations.css`
- `src/data/site.ts`
- `src/components/sections/HeroSection.astro`

## Archivos permitidos para edición

- `src/components/sections/HeroSection.astro`
- `src/styles/animations.css`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Archivos prohibidos

No modificar nada fuera de la lista anterior. En particular:

- `src/styles/globals.css`
- `src/scripts/**`
- `src/layouts/**`
- `src/pages/**`
- `src/data/**`
- `public/**`
- `package.json`
- `tsconfig.json`
- `astro.config.mjs`

## Alcance exacto

### 1. Tipografía hero

- `hero__name` (p con el nombre): `font-size` a `3.8rem` desktop. Mantener mobile.
- `hero__title` (h1 con el rol): `font-size: 1.8rem` desktop, `color: --primary-color`, peso visual.
- No cambiar copy.

### 2. Foto de perfil

- Mantener `border-radius: 100%`.
- Aumentar tamaño ligeramente en desktop: `12rem x 12rem`.
- Border sutil con `--border-normal` (token de UI-1).

### 3. Dot pattern en fondo del hero

- CSS nativo via `background` con `radial-gradient`.
- Muy sutil: `opacity` baja, solo en el section hero.
- Sin JavaScript.
- Solo `--primary-color` o gris.

### 4. CTAs refinados

- Usar `--border-normal` o `--border-primary` para un borde en el CTA primario.
- Hover con `background-color: --primary-color` o similar.
- No crear botón genérico SaaS.
- Mantener los dos links actuales, solo mejorar su apariencia.

### 5. Social links

- Hover con `translateY(-2px)` en lugar de `scale(1.2)`.

### 6. No implementar

- No gradient text todavía (reservado para evaluar en UI-7).
- No spotlight hover (requiere JS complejo).
- No moving border (reservado para UI-7).
- No cambiar la estructura del markup.
- No crear secciones nuevas.

## Criterios de aceptación

- Hero se ve premium, editorial, técnico.
- No rompe layout mobile.
- No hay exceso de efectos.
- `pnpm astro check` pasa.
- `pnpm build` pasa.
- `MIGRATION_STATUS.md` actualizado.
- `MIGRATION_TASK.md` preparado para UI-4, sin ejecutarla.

## Validaciones

    pnpm astro check
    pnpm build
    git diff --stat