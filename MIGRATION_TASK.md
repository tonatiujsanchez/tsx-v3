# MIGRATION_TASK.md

## Tarea actual

Fase UI-4 — Project cards modernizadas.

## Contexto

La UI ya tiene:

- UI-0: dirección visual "Engineered Darkness".
- UI-1: design tokens premium en `globals.css`.
- UI-2: motion system nativo con scroll reveal, stagger y scroll progress.
- UI-3: Hero premium — dot pattern, gradient text, CTA buttons, social icons boxed, ring de perfil.

Ahora se deben modernizar las Project Cards sin rediseñar el resto del sitio.

## Objetivo

Modernizar `ProjectCard.astro` y `ProjectsSection.astro` para que las tarjetas sean más premium en hover, con shine border y elevación sutil.

Debe conservar el estilo actual:

- dark
- minimal
- técnico
- sobrio
- lista vertical (no cambiar a grid 2col)

Y mejorarlo con:

- hover con `translateY(-2px)` + border glow.
- shine border: CSS `::after` sweep en hover.
- eliminar `scale(1.1)` en imagen.
- stagger reveal al scroll (ya tiene `data-reveal`).
- spotlight hover opcional (TS mousemove, solo desktop con `@media (pointer: fine)`).

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- `UI_DIRECTION.md`
- `.claude/skills/ui-modernizer/SKILL.md`
- `.claude/skills/astro-effects-engineer/SKILL.md`
- `src/components/sections/HeroSection.astro`
- `src/components/ui/SocialLink.astro`
- `src/data/site.ts`
- `src/types/index.ts`
- `src/styles/globals.css`
- `src/styles/animations.css`
- `src/scripts/animations.ts`
- `public/img/profile/**`
- `public/img/**`

## Comandos baratos permitidos

Usar primero:

    git status --short
    git diff --stat
    rg "HeroSection|hero|profile|author|role|description|cvPath|socialLinks|data-reveal|gradient|badge|cta" src -n
    find public/img -maxdepth 3 -type f | sort

## Archivos permitidos para edición

- `src/components/sections/HeroSection.astro`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Edición excepcional permitida solo si es necesaria

Solo si `HeroSection.astro` necesita datos ya existentes pero no tipados o no expuestos correctamente, se permite editar de forma mínima:

- `src/data/site.ts`
- `src/types/index.ts`

Reglas de excepción:

- No inventar datos.
- No cambiar estructura general de `siteConfig` sin necesidad.
- No tocar otros datos.
- Justificar el cambio.

## Archivos prohibidos

No modificar:

- `src/components/shared/**`
- `src/components/home/**`
- `src/components/project/**`
- `src/components/ui/**`, salvo lectura.
- `src/components/sections/**`, excepto `HeroSection.astro`.
- `src/layouts/**`
- `src/pages/**`
- `src/scripts/**`
- `src/styles/**`
- `src/content/**`
- `src/icons/**`
- `public/**`
- `package.json`
- `tsconfig.json`
- `astro.config.mjs`

Si necesitas modificar un archivo prohibido, primero explica por qué y espera confirmación.

## Alcance exacto

### 1. Mejorar composición del Hero

Actualizar únicamente `HeroSection.astro`.

El Hero debe tener una estructura más premium y editorial:

- bloque de presentación más fuerte.
- jerarquía clara: eyebrow opcional, nombre, rol, descripción, acciones.
- imagen de perfil integrada con mejor composición.
- social links bien ubicados.
- CTAs visibles y profesionales.
- mejor balance entre texto, imagen y espacio.

Reglas:

- No cambiar todo el layout del sitio.
- No crear secciones nuevas.
- No cambiar copy principal salvo ajustes mínimos de claridad.
- No hacerlo parecer landing SaaS genérica.

### 2. Agregar acentos visuales sutiles

Inspirarse en Magic UI / Aceternity UI, pero implementado con CSS local del componente.

Ideas permitidas:

- subtle spotlight radial.
- soft grid/dot pattern.
- gradient text discreto.
- border glow controlado en imagen.
- card-like surface sutil.
- background accent muy suave.
- hover refinado en CTAs.

Reglas:

- No usar gradientes arcoíris.
- No usar blobs exagerados.
- No usar partículas.
- No meter canvas.
- No instalar dependencias.
- No usar React.
- No usar Tailwind.
- No duplicar tokens globales si ya existen en `globals.css`.

### 3. Usar motion system existente

Aplicar atributos del motion system ya creado:

- `data-reveal`
- `data-reveal-delay`
- `data-reveal-stagger`

Reglas:

- No modificar `animations.ts`.
- No modificar `animations.css`.
- No hacer que el contenido dependa de JS para verse.
- No usar delays excesivos.

### 4. Mejorar CTAs

Los CTAs del hero deben ser más claros y modernos:

- CV.
- Contacto.
- links sociales.

Reglas:

- Usar `<a>` para navegación o descarga.
- Usar `aria-label` cuando aplique.
- No usar botones para navegación.
- Mantener accesibilidad.
- Mantener `target="_blank"` y `rel="noopener noreferrer"` en externos.

### 5. Responsive

El Hero debe verse bien en:

- mobile.
- tablet.
- desktop.

Reglas:

- No romper el ancho del container.
- No crear overflow horizontal.
- No ocultar contenido importante.
- No usar tamaños excesivos.

## Fuera de alcance

- No modernizar Navbar.
- No modernizar ProjectCard.
- No modernizar Experience.
- No modernizar Skills.
- No modernizar Contact.
- No modificar páginas.
- No modificar layouts.
- No modificar tokens globales.
- No modificar motion system.
- No instalar dependencias.
- No avanzar a UI-4.

## Criterios de aceptación

- `HeroSection.astro` se ve más moderno y premium.
- El estilo sigue siendo dark, técnico, sobrio y editorial.
- No parece plantilla genérica de IA.
- No se instalaron dependencias.
- No se usó React.
- No se usó Tailwind.
- No hay `any`.
- No hay overflow horizontal.
- El contenido sigue visible sin JS.
- Se usan atributos de reveal existentes.
- `pnpm astro check` pasa.
- `pnpm build` pasa.
- `MIGRATION_STATUS.md` queda actualizado.
- `MIGRATION_TASK.md` queda preparado para UI-4, pero UI-4 no se ejecuta.

## Validaciones

Ejecutar:

    pnpm astro check
    pnpm build
    git diff --stat

Si el entorno permite preview:

    pnpm preview

Revisar visualmente:

- home desktop.
- home mobile.
- dark theme.
- light theme si existe.
- que el Hero no rompa el layout.

## Respuesta esperada

Responder solo con:

1. Cambios visuales aplicados al Hero.
2. Archivos modificados.
3. Resultado de `pnpm astro check`.
4. Resultado de `pnpm build`.
5. Pendientes visuales.
6. Confirmación de que no se avanzó a UI-4.