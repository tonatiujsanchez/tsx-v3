# MIGRATION_TASK.md

## Tarea actual

Fase 11 — Validación final.

## Contexto

Todas las fases de implementación están completas:

- Fase 1: setup, estructura y assets.
- Fase 2: tipos, datos, íconos y Content Collections.
- Fase 3/3.1: scripts cliente en TypeScript.
- Fase 4: layouts base.
- Fase 5: componentes shared integrados en layouts.
- Fase 6: componentes UI reutilizables.
- Fase 7: componentes específicos del home.
- Fase 8/8.1: secciones completas del home y correcciones mínimas.
- Fase 9: componentes de detalle de proyecto.
- Fase 10: páginas (`index.astro` y `[slug].astro`).

Fase 11 es la validación final y cierre de pendientes conocidos.

## Objetivo

Resolver pendientes conocidos, validar el sitio completo y asegurar que el build esté limpio y listo para deploy.

## Pendientes conocidos a resolver

1. **SVGs de íconos tecnológicos** — los archivos `public/icons/{slug}.svg` no existen. `TechBadge` renderiza `<img>` que resultará en broken image. Agregar SVGs para todas las techs usadas, o adaptar el componente para degradación aceptable.

2. **DevManager `githubBackend`** — `ProjectLinks` solo muestra `githubFrontend` (vía fallback `github ?? githubFrontend`). `githubBackend` no se enlaza. Evaluar si se agrega un segundo link al componente o se documenta como fuera de scope.

3. **`siteConfig.contactApi`** — cadena vacía. El form de contacto no puede enviar. Requiere endpoint real o documentar como pendiente de deploy.

4. **`animations.ts`** — script de animaciones de entrada no conectado a ningún componente. Conectar si aplica, o documentar como postergado.

5. **`/img/profile/ton.webp`** — verificar que exista en `public/`.

6. **SVGs en `src/icons/svgs/`** — solo existe `zustand.svg`. Confirmar que todos los slugs en `iconMap` tienen su SVG en `public/icons/`.

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- Todo `src/` para diagnóstico
- `public/icons/` para verificar SVGs
- `dist/` para verificar build

## Comandos baratos permitidos

    pnpm astro check
    pnpm build
    pnpm preview
    find public/icons -type f | sort
    find public/img -type f | sort
    git diff --stat
    git status --short

## Archivos permitidos para edición

Solo los necesarios para resolver los pendientes listados arriba. Justificar antes de editar cualquier archivo no listado explícitamente.

## Criterios de aceptación

- `pnpm astro check` pasa sin errores.
- `pnpm build` pasa sin errores.
- Íconos tecnológicos visibles o degradación documentada.
- DevManager muestra al menos un link de GitHub válido.
- No se avanzó a ninguna fase fuera de la lista.
- `MIGRATION_STATUS.md` queda actualizado con estado final.

## Validaciones

    pnpm astro check
    pnpm build
    git diff --stat

## Respuesta esperada

1. Pendientes resueltos (lista).
2. Pendientes no resueltos y razón.
3. Validaciones ejecutadas.
4. Estado final del proyecto.
