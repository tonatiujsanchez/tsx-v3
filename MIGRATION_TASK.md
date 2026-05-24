# MIGRATION_TASK.md

## Tarea actual

Fase 11 — Validación final y cierre de pendientes.

## Contexto

La migración Astro compila correctamente, pero el resultado visual del home está gravemente roto frente al proyecto legacy.

Problemas observados:

- La versión Astro no se parece visualmente al home original.
- El layout general no respeta el espaciado, ancho, composición ni estructura visual original.
- Aparecen textos de tecnologías flotando o fuera de contexto.
- Hay iconos tecnológicos rotos o rutas de iconos inexistentes.
- `animations.ts` quedó sin conectar y puede estar causando contenido oculto si el CSS depende de clases como `is-visible`.
- `pnpm astro check` pasa, pero eso no garantiza paridad visual.

Esta fase debe corregir el home visualmente antes de avanzar a Fase 11.

## Objetivo

Reparar el home de Astro para que tenga paridad visual razonable con el proyecto vanilla original, sin romper la arquitectura Astro + TypeScript ya construida.

La prioridad es corregir:

1. Layout general del home.
2. Contenedores, secciones, anchos y espaciados.
3. Navbar, hero, experiencia, proyectos, habilidades, contacto y footer.
4. Iconos tecnológicos rotos.
5. Imágenes rotas.
6. Animaciones o clases que estén dejando contenido invisible.
7. Diferencias CSS causadas por clases no equivalentes entre legacy y Astro.

## Archivos permitidos para lectura

### Contexto de control

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

### Proyecto Astro

- `src/pages/index.astro`
- `src/layouts/BaseLayout.astro`
- `src/layouts/MainLayout.astro`
- `src/components/shared/Navbar.astro`
- `src/components/shared/Footer.astro`
- `src/components/shared/ThemeToggle.astro`
- `src/components/shared/ScrollTop.astro`
- `src/components/sections/HeroSection.astro`
- `src/components/sections/ExperienceSection.astro`
- `src/components/sections/ProjectsSection.astro`
- `src/components/sections/SkillsSection.astro`
- `src/components/sections/ContactSection.astro`
- `src/components/home/JobCard.astro`
- `src/components/home/ProjectCard.astro`
- `src/components/home/ContactForm.astro`
- `src/components/ui/TechBadge.astro`
- `src/components/ui/TechIcon.astro`
- `src/components/ui/SocialLink.astro`
- `src/components/ui/ProjectFigure.astro`
- `src/styles/globals.css`
- `src/styles/animations.css`
- `src/scripts/animations.ts`
- `src/icons/IconMap.ts`
- `src/icons/index.ts`
- `src/data/site.ts`
- `src/data/skills.ts`
- `src/data/jobs.ts`
- `src/content/projects/*.md`
- `public/img/**`
- `public/icons/**`
- `public/fonts/**`

### Proyecto legacy

Leer solo archivos necesarios del proyecto vanilla original:

- HTML del home legacy.
- CSS legacy:
  - `globals.css`
  - `style.css`
  - `animations.css`
  - cualquier CSS relevante del home.
- JS legacy solo si es necesario para animaciones o interacciones.

No leer todo el proyecto legacy completo si basta con `rg`.

## Comandos baratos permitidos

Usar primero:

    git status --short
    git diff --stat
    find src/components -maxdepth 3 -type f | sort
    find src/styles -maxdepth 2 -type f | sort
    find public/img -maxdepth 3 -type f | sort
    find public/icons -maxdepth 3 -type f | sort
    find .. -maxdepth 4 -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" \) | sort
    rg "container|section|hero|experience|projects|skills|contact|footer|tech|icon|data-animate|is-visible|scroll" src public .. -n

## Archivos permitidos para edición

- `src/pages/index.astro`
- `src/layouts/MainLayout.astro`
- `src/components/shared/Navbar.astro`
- `src/components/shared/Footer.astro`
- `src/components/shared/ThemeToggle.astro`
- `src/components/shared/ScrollTop.astro`
- `src/components/sections/HeroSection.astro`
- `src/components/sections/ExperienceSection.astro`
- `src/components/sections/ProjectsSection.astro`
- `src/components/sections/SkillsSection.astro`
- `src/components/sections/ContactSection.astro`
- `src/components/home/JobCard.astro`
- `src/components/home/ProjectCard.astro`
- `src/components/home/ContactForm.astro`
- `src/components/ui/TechBadge.astro`
- `src/components/ui/TechIcon.astro`
- `src/components/ui/SocialLink.astro`
- `src/styles/globals.css`
- `src/styles/animations.css`
- `src/scripts/animations.ts`
- `src/icons/IconMap.ts`
- `src/icons/index.ts`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Archivos prohibidos

No modificar:

- `src/pages/projects/[slug].astro`
- `src/components/project/**`
- `src/content/**`
- `src/data/**`, salvo que primero se justifique por dato incorrecto.
- `public/**`, salvo que primero se justifique por asset faltante y se confirme.
- `package.json`
- `tsconfig.json`
- `astro.config.mjs`

Si necesitas modificar un archivo prohibido, primero explica por qué y espera confirmación.

## Alcance exacto

### 1. Comparar estructura visual del home legacy vs Astro

Comparar el home legacy contra el home Astro.

Identificar diferencias en:

- estructura de secciones.
- clases principales.
- `.container`
- `.section`
- títulos.
- grids/listas.
- cards de experiencia.
- cards de proyectos.
- grid de skills.
- formulario de contacto.
- footer.
- navbar.
- dark theme.

No hacer rediseño nuevo. La referencia visual es el legacy.

### 2. Reparar CSS base

Revisar `src/styles/globals.css`.

Debe contener correctamente:

- reset/base.
- variables CSS.
- tema oscuro sobre `html.dark-theme`.
- estilos base de `body`.
- `.container`.
- `.section`.
- `.section__title`.
- estilos globales realmente compartidos.
- fuentes correctas.
- box sizing.
- comportamiento responsive base.

Si el legacy tenía valores concretos de ancho, espaciado, colores o tipografía, trasladarlos de forma fiel.

### 3. Reparar estilos scoped de secciones y componentes

Ajustar estilos en componentes Astro para que respeten el layout legacy.

Prioridad:

- `HeroSection.astro`
- `ExperienceSection.astro`
- `ProjectsSection.astro`
- `SkillsSection.astro`
- `ContactSection.astro`
- `JobCard.astro`
- `ProjectCard.astro`
- `ContactForm.astro`
- `Navbar.astro`
- `Footer.astro`

Reglas:

- Mantener estilos scoped por componente cuando sean propios del componente.
- No meter todo el CSS legacy completo en `globals.css`.
- Evitar duplicación innecesaria.
- Mantener BEM o clases consistentes.
- No sobreingenierizar.

### 4. Corregir iconos tecnológicos

Revisar `TechBadge.astro`, `TechIcon.astro`, `IconMap.ts` y assets reales en `public/icons`.

Problema a resolver:

- No deben aparecer textos flotando por imágenes rotas.
- No deben apuntar a `/icons/{slug}.svg` si esos SVGs no existen.
- Si `IconMap.ts` contiene SVG inline o HTML de imagen, usar ese contrato.
- Si se usan imágenes, deben existir realmente en `public/icons`.
- Si falta un icono, usar fallback visual controlado dentro del badge, no alt text roto en la página.

Reglas:

- No inventar SVGs falsos.
- No dejar imágenes rotas.
- No dejar tecnologías fuera del flujo visual.
- No usar `any`.

### 5. Corregir animaciones

Revisar `src/styles/animations.css` y `src/scripts/animations.ts`.

Si el CSS oculta elementos por defecto esperando clase `is-visible`, entonces:

- conectar `animations.ts` correctamente en el layout o componente donde aplique, o
- eliminar la ocultación inicial si no es necesaria.

Reglas:

- El contenido nunca debe depender de JS para ser visible.
- Si JS falla, la página debe seguir mostrando contenido.
- Las animaciones no deben romper layout.
- No agregar animaciones nuevas si no existen en legacy.

### 6. Corregir imágenes

Verificar:

- imagen de perfil.
- thumbnails de proyectos.
- logos de experiencia.
- iconos.

Reglas:

- No referenciar rutas inexistentes.
- No generar variantes de imagen con `.replace()` si las rutas reales no existen.
- Usar rutas reales desde `public/img`.
- Mantener `alt` descriptivo.

### 7. Validación visual mínima

Después de corregir:

- correr `pnpm astro check`.
- correr `pnpm build`.
- correr `pnpm preview` si es posible.
- verificar home en navegador.

No avanzar a Fase 11 hasta que el home sea visualmente aceptable.

## Fuera de alcance

- No rediseñar el portafolio.
- No cambiar arquitectura general.
- No implementar nuevas features.
- No modificar páginas de detalle salvo que rompan el build.
- No cambiar datos salvo error evidente.
- No agregar dependencias.
- No avanzar a Fase 11.
- No hacer optimización final SEO/performance todavía.

## Criterios de aceptación

- El home Astro se parece razonablemente al home legacy.
- No hay contenido flotando fuera de secciones.
- No hay iconos rotos visibles.
- No hay imágenes rotas visibles.
- Las secciones aparecen en orden correcto:
  - Hero
  - Experiencia
  - Proyectos
  - Habilidades
  - Contacto
- El contenido es visible sin depender críticamente de JS.
- Navbar y footer se ven integrados.
- Skills se muestran como grid/lista ordenada, no como textos dispersos.
- Proyectos se muestran con thumbnails y textos alineados.
- ContactForm se ve integrado.
- `pnpm astro check` pasa.
- `pnpm build` pasa.
- `MIGRATION_STATUS.md` queda actualizado.
- `MIGRATION_TASK.md` queda preparado para Fase 11, pero Fase 11 no se ejecuta.

## Validaciones

Ejecutar:

    pnpm astro check
    pnpm build
    git diff --stat

Si `pnpm preview` está disponible, ejecutarlo y verificar visualmente el home.

## Respuesta esperada

Responder solo con:

1. Causas encontradas.
2. Archivos modificados.
3. Qué se corrigió.
4. Validaciones ejecutadas.
5. Pendientes visuales.
6. Confirmación de que no se avanzó a Fase 11.