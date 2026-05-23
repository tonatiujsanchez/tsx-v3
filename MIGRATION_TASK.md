# MIGRATION_TASK.md

## Tarea actual

Fase 7 — Componentes de home.

## Contexto

Las fases anteriores ya dejaron lista la base del proyecto:

- Fase 1: setup, estructura y assets.
- Fase 2: tipos, datos, íconos y Content Collections.
- Fase 3/3.1: scripts cliente en TypeScript.
- Fase 4: layouts base.
- Fase 5: componentes shared integrados en layouts.
- Fase 6: componentes UI reutilizables.

Ahora se deben implementar únicamente los componentes específicos del home:

- `src/components/home/JobCard.astro`
- `src/components/home/ProjectCard.astro`
- `src/components/home/ContactForm.astro`

Esta fase no debe implementar secciones completas, páginas ni componentes de detalle de proyecto.

## Objetivo

Crear componentes de dominio del home que reciban datos por props y puedan ser usados posteriormente por las secciones del home en Fase 8.

Los componentes deben ser reutilizables, tipados, accesibles y mantener separación clara entre datos, presentación y comportamiento.

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- `src/types/index.ts`
- `src/data/site.ts`
- `src/data/jobs.ts`
- `src/content/projects/*.md`
- `src/components/ui/SocialLink.astro`
- `src/components/ui/ProjectFigure.astro`
- `src/components/ui/TechBadge.astro`
- `src/styles/globals.css`

Archivos legacy solo si hace falta confirmar estructura visual o comportamiento:

- HTML legacy del home.
- JS legacy relacionado con formulario/contacto.
- CSS legacy relacionado con jobs, projects y contact form.

Leer solo fragmentos necesarios usando `rg`. No abrir todo el proyecto legacy completo.

## Comandos baratos permitidos

Usar primero:

    git status --short
    git diff --stat
    find src/components/home -maxdepth 2 -type f 2>/dev/null | sort
    find src/components/ui -maxdepth 2 -type f 2>/dev/null | sort
    rg "interface Job|interface|contactApiUrl|jobs|projects|form|toast|loader|ProjectCard|JobCard|ContactForm" src -n
    rg "job|experience|project|contact|form|toast|loader|submit" .. -n

## Archivos permitidos para edición

- `src/components/home/JobCard.astro`
- `src/components/home/ProjectCard.astro`
- `src/components/home/ContactForm.astro`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Archivos prohibidos

No modificar:

- `src/components/shared/**`
- `src/components/ui/**`
- `src/components/project/**`
- `src/components/sections/**`
- `src/layouts/**`
- `src/pages/**`
- `src/scripts/**`
- `src/content/**`
- `src/data/**`
- `src/icons/**`
- `src/styles/**`
- `public/**`
- `package.json`
- `tsconfig.json`
- `astro.config.mjs`

Si necesitas modificar un archivo prohibido, primero explica por qué y espera confirmación.

## Alcance exacto

### 1. Crear `src/components/home/JobCard.astro`

Debe:

- Recibir un `job` tipado.
- Renderizar información de experiencia laboral.
- Renderizar logo si existe.
- Renderizar título, empresa, periodo y actividades.
- No importar directamente `jobs` desde `src/data/jobs.ts`.
- No hardcodear información laboral.
- Usar HTML semántico cuando aplique.
- Usar estilos scoped.
- Mantener BEM o clases consistentes con el proyecto.

Props esperadas:

    import type { Job } from '@types/index'

    interface Props {
      job: Job
    }

Reglas:

- No usar `any`.
- No mezclar datos con presentación.
- No crear abstracciones innecesarias.
- No implementar la sección completa de experiencia.

### 2. Crear `src/components/home/ProjectCard.astro`

Debe:

- Recibir datos del proyecto por props.
- Renderizar tarjeta de proyecto para el listado del home.
- Enlazar a `/projects/{slug}`.
- Renderizar título, año, summary y thumbnail.
- Usar imágenes WebP existentes.
- Tener `alt` descriptivo.
- Usar estilos scoped.
- No importar directamente Content Collections.

Props esperadas:

    interface Props {
      title: string
      slug: string
      year: number
      summary: string
      thumbnail: {
        full: string
        md: string
        sm: string
      }
    }

Reglas:

- No hardcodear proyectos.
- No implementar ruta dinámica.
- No implementar sección completa de proyectos.
- No usar `any`.

### 3. Crear `src/components/home/ContactForm.astro`

Debe:

- Renderizar formulario de contacto.
- Usar endpoint desde `src/data/site.ts`.
- Encapsular loader/toast de success/error.
- Manejar submit con TypeScript en el propio componente.
- Enviar datos al API externo definido en `siteConfig.contactApiUrl`.
- Manejar errores de red y respuestas no exitosas.
- No usar librerías externas.
- No usar `any`.

Campos esperados del formulario:

- nombre
- email
- mensaje

Reglas:

- El botón debe ser `type="submit"`.
- Los inputs deben tener `label` o `aria-label`.
- Debe validar de forma básica campos requeridos usando HTML.
- Debe mostrar feedback de éxito/error.
- Debe limpiar el formulario solo si el envío fue exitoso.
- No mover esta lógica a `src/scripts` en esta fase.
- No modificar `siteConfig`.

## Fuera de alcance

- No implementar `HeroSection.astro`.
- No implementar `ExperienceSection.astro`.
- No implementar `ProjectsSection.astro`.
- No implementar `SkillsSection.astro`.
- No implementar `ContactSection.astro`.
- No implementar páginas.
- No implementar componentes de detalle de proyecto.
- No modificar layouts.
- No modificar datos.
- No modificar Content Collections.
- No modificar estilos globales.
- No modificar scripts globales.
- No avanzar a Fase 8.

## Criterios de aceptación

- Existe `src/components/home/JobCard.astro`.
- Existe `src/components/home/ProjectCard.astro`.
- Existe `src/components/home/ContactForm.astro`.
- Los componentes reciben props tipadas cuando corresponde.
- `JobCard` recibe `job: Job`.
- `ProjectCard` recibe datos por props y enlaza a `/projects/{slug}`.
- `ContactForm` usa `siteConfig.contactApiUrl`.
- `ContactForm` maneja loading, success y error.
- No hay `any`.
- No se tocaron archivos fuera del alcance.
- No se implementaron secciones ni páginas.
- `pnpm astro check` pasa o documenta errores ajenos.
- `MIGRATION_STATUS.md` queda actualizado.
- `MIGRATION_TASK.md` queda preparado para Fase 8, pero Fase 8 no se ejecuta.

## Validaciones

Ejecutar:

    pnpm astro check
    git diff --stat

No ejecutar `pnpm build` salvo que sea necesario para diagnosticar errores directamente relacionados con Fase 7.

## Respuesta esperada

Responder solo con:

1. Archivos modificados.
2. Qué se implementó.
3. Validaciones ejecutadas.
4. Pendientes.
5. Confirmación de que no se avanzó a Fase 8.