# CLAUDE.md

## Proyecto

Migración del portafolio personal `tsx-v2-vanilla` hacia `tsx-v3` usando Astro + TypeScript.

El objetivo no es copiar HTML/CSS/JS legacy, sino construir un proyecto moderno, limpio y mantenible que parezca diseñado desde cero por un desarrollador senior.

## Stack

- Astro
- TypeScript
- HTML estático por defecto
- CSS scoped por componente
- CSS global solo para tokens, reset, utilidades reales y estilos base
- JavaScript/TypeScript solo para interactividad necesaria

## Principios obligatorios

- Separación clara entre datos, presentación y comportamiento.
- Componentes reutilizables, pero sin sobrefragmentar.
- TypeScript solo donde aporta valor real.
- Cero `any`.
- No usar React, Vue, Svelte ni frameworks adicionales.
- No mezclar datos hardcodeados dentro de componentes.
- No copiar estructura legacy si no tiene sentido en Astro.
- No migrar código muerto.
- No duplicar CSS innecesariamente.
- Mantener BEM donde aplique.
- Mantener accesibilidad, SEO técnico y performance.

## Arquitectura esperada

- `src/content/projects/` para proyectos usando Astro Content Collections.
- `src/data/` para datos estáticos tipados.
- `src/types/` para tipos compartidos.
- `src/icons/` para iconos tecnológicos centralizados.
- `src/layouts/` para layouts base.
- `src/components/shared/` para componentes globales.
- `src/components/sections/` para secciones del home.
- `src/components/ui/` para componentes base reutilizables.
- `src/components/home/` para componentes específicos del home.
- `src/components/project/` para componentes específicos de detalle.
- `src/scripts/` para lógica cliente en TypeScript.
- `src/styles/` para CSS global y animaciones.

## Reglas de trabajo para Claude Code

Antes de trabajar:
1. Leer `CLAUDE.md`.
2. Leer `MIGRATION_STATUS.md`.
3. Leer `MIGRATION_TASK.md`.
4. No hacer análisis general del repo salvo que la tarea lo pida explícitamente.

Durante la tarea:
- Leer solo los archivos permitidos en `MIGRATION_TASK.md`.
- Editar solo los archivos permitidos.
- No avanzar a otra fase.
- No hacer refactors fuera del alcance.
- No ejecutar búsquedas amplias si ya existen archivos guía.
- Si falta contexto, revisar primero `MIGRATION_STATUS.md`.
- Si sigue faltando contexto, pedir confirmación antes de escanear más archivos.

Después de la tarea:
- Actualizar `MIGRATION_STATUS.md`.
- Actualizar `MIGRATION_TASK.md` con la siguiente tarea sugerida.
- Entregar resumen breve de cambios.
- Indicar validaciones ejecutadas.
- No explicar de más.

## Comandos útiles

- `pnpm astro check`
- `pnpm build`
- `pnpm preview`
- `git diff --stat`
- `git status --short`

## Límites de consumo

- Evitar leer archivos grandes completos si basta con `rg`, `tree`, `find` o fragmentos específicos.
- No volver a leer todo el proyecto en cada fase.
- No repetir el plan completo en cada respuesta.
- Responder con diffs/resumen, no con archivos completos salvo que se solicite.