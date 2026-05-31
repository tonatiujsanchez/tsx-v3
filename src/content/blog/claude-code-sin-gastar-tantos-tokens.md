---
title: "Cómo usar Claude Code sin gastar tantos tokens"
description: "Estrategia práctica para trabajar con Claude Code en proyectos largos: contexto persistente con CLAUDE.md, MIGRATION_TASK.md y skills locales para reducir lecturas repetidas, mantener control de alcance y evitar compactaciones innecesarias."
excerpt: "Si le pides a Claude Code que analice todo tu proyecto al inicio de cada sesión, estás gastando tokens sin necesidad. Aquí está la estrategia que usé para migrar un portafolio completo usando contexto persistente y prompts cortos."
publishedAt: 2026-05-31
updatedAt: 2026-05-31
draft: true
category: tutoriales
tags:
  - claude-code
  - ia-generativa
  - productividad
  - frontend
  - workflow
featured: true
author: Tonatiuj Sánchez
cover:
  src: /img/blog/claude-code-sin-gastar-tantos-tokens/cover.webp
  alt: Terminal mostrando Claude Code con un flujo de trabajo organizado por fases, archivos de contexto y commits por etapas
  caption: Flujo de trabajo con Claude Code usando contexto persistente en archivos
ogImage: /img/blog/claude-code-sin-gastar-tantos-tokens/cover.webp
---

Claude Code es una herramienta poderosa para trabajar en proyectos reales. Pero tiene una característica que te va a costar tokens si no la entiendes desde el inicio: **cada sesión empieza sin memoria**.

No recuerda qué hiciste ayer. No sabe qué archivos modificaste la semana pasada. No tiene idea de qué convenciones sigue tu proyecto a menos que se las expliques en ese mismo turno. Y si no tienes una estrategia para entregar contexto de forma eficiente, vas a terminar repitiendo las mismas instrucciones en cada sesión, o peor: pidiéndole que "analice todo el proyecto" antes de empezar.

Este artículo documenta el flujo que usé para migrar un portafolio completo de vanilla JS/HTML a Astro + TypeScript, distribuido en más de 20 fases, sin perder contexto entre sesiones y sin que Claude leyera archivos que no necesitaba.

---

## El problema: sin contexto persistente, Claude lee de más

Cuando inicias una sesión con Claude Code y le dices "continúa la migración del proyecto", la pregunta natural que sigue es: ¿cuál es el estado del proyecto? ¿Qué se hizo? ¿Qué sigue?

Si no tienes una respuesta lista en texto, Claude tiene dos opciones: preguntarte o explorar el repositorio por su cuenta. Ambas consumen tokens. La exploración puede ser costosa si el proyecto tiene muchos archivos, dependencias y ramas.

El patrón más común y más caro es este:

```
"Analiza el proyecto completo y dime qué falta por hacer."
```

Ese prompt puede disparar lecturas de decenas de archivos antes de que Claude te dé una respuesta útil.

---

## El error más común: analizar todo en cada fase

Muchos desarrolladores que empiezan con Claude Code asumen que el modelo necesita leer todo para entender algo. Esto es parcialmente cierto: Claude necesita contexto. Pero contexto no es lo mismo que *el repo entero*.

La diferencia está en **quién define el contexto**.

Si no lo defines tú, Claude lo construye leyendo archivos. Si lo defines tú en texto, Claude trabaja con eso directamente y solo lee los archivos que realmente necesita.

> **Advertencia:** pedirle a Claude que "revise todo el proyecto para ver si algo está mal" en cada sesión no solo gasta tokens: también distrae. El modelo puede encontrar patrones que no son relevantes para la tarea actual y empezar a proponer cambios fuera de alcance.

---

## La solución: tres archivos de contexto persistente

La estrategia central es simple: mantener tres archivos de texto que Claude lee al inicio de cada sesión. Cada uno tiene un rol específico.

### `CLAUDE.md` — reglas del proyecto

Este archivo le dice a Claude cómo debe trabajar en este repositorio específico. Claude Code lo lee automáticamente al iniciar una sesión si está en la raíz del proyecto.

Incluye:

- Stack tecnológico y versiones.
- Convenciones del proyecto (BEM, cero `any`, sin React, etc.).
- Arquitectura de carpetas esperada.
- Reglas de trabajo: qué leer antes de empezar, qué no modificar sin confirmación.
- Comandos útiles del proyecto.

Un ejemplo mínimo:

```markdown
## Stack
- Astro + TypeScript
- CSS scoped por componente
- Sin React ni frameworks adicionales

## Reglas
- Cero `any`
- No hardcodear datos en componentes
- Mantener BEM donde aplique

## Antes de cada tarea
1. Leer `MIGRATION_STATUS.md`
2. Leer `MIGRATION_TASK.md`
```

> **Tip:** mantén `CLAUDE.md` enfocado en reglas que cambian poco. No pongas estado del proyecto aquí: ese va en `MIGRATION_STATUS.md`.

### `MIGRATION_STATUS.md` — estado actual del proyecto

Este archivo es el historial vivo de la migración. Cada fase que se completa deja una entrada: qué archivos se crearon, qué se modificó, qué decisiones técnicas se tomaron y qué quedó pendiente.

Estructura básica por fase:

```markdown
### Fase BLOG-3

**Creados:**
- `src/pages/blog/index.astro` — índice del blog, filtra drafts en producción
- `src/pages/blog/[slug].astro` — detalle de artículo

**Modificados:**
- `src/data/navigation.ts` — añadido item Blog

**Decisiones:**
- `getStaticPaths` filtra drafts en build pero los incluye en dev

**Validaciones:**
- `pnpm astro check`: 0 errores
- `pnpm build`: 7 páginas
```

Este archivo no es documentación para humanos: es el historial que le permite a Claude entrar en contexto sin explorar el repo. Un `MIGRATION_STATUS.md` bien mantenido es la diferencia entre una sesión de 5 mensajes y una de 15.

### `MIGRATION_TASK.md` — tarea actual

Este es el archivo más importante para controlar el alcance. Define exactamente qué debe hacer Claude en la sesión actual, qué archivos puede leer, qué archivos puede editar y qué está explícitamente fuera de alcance.

Estructura mínima:

```markdown
## Tarea actual

Fase BLOG-5 — Categorías, tags y RSS

## Archivos permitidos para lectura

- `src/content.config.ts`
- `src/utils/blog.ts` (si existe)

## Archivos permitidos para edición

- `src/utils/blog.ts`
- `src/pages/blog/categoria/[category].astro`
- `src/pages/rss.xml.ts`

## Fuera de alcance

- No modificar páginas existentes de blog
- No modificar componentes
- No instalar dependencias
```

La lista de archivos permitidos para edición es clave. Sin ella, Claude puede proponer "mientras estoy aquí, también mejoraría este componente..." y antes de que te des cuenta tienes cambios en 12 archivos que no querías tocar.

---

## Cómo ejecutar una fase con un prompt corto

Con los tres archivos en lugar, el prompt para iniciar una sesión puede ser muy conciso:

```
Lee únicamente:
1. `CLAUDE.md`
2. `MIGRATION_STATUS.md`
3. `MIGRATION_TASK.md`

Ejecuta solo la tarea actual definida en `MIGRATION_TASK.md`.
No avances a la siguiente fase.
```

Claude lee los tres archivos, entiende el estado del proyecto, ejecuta solo lo que está en scope y actualiza los archivos de estado al terminar. No necesita explorar el repo. No necesita que le expliques la arquitectura desde cero.

---

## Cuándo usar `/clear`

`/clear` limpia el historial de la conversación actual. Úsalo:

- Entre fases sin relación directa (pasar de migrar componentes a configurar SEO).
- Cuando el contexto acumuló muchas lecturas de archivos que ya no son relevantes.
- Al inicio de una sesión nueva con una tarea distinta.

No lo uses en medio de una tarea en progreso. Si Claude ya tiene contexto útil del trabajo actual, limpiarlo te obliga a rehidratar ese contexto desde cero.

> **Nota:** `/clear` no borra los archivos `CLAUDE.md`, `MIGRATION_STATUS.md` ni `MIGRATION_TASK.md`. Solo limpia la conversación. Claude los vuelve a leer en la siguiente sesión.

## Cuándo usar `/compact`

`/compact` comprime el historial de la conversación para reducir el contexto activo sin perderlo completamente. Úsalo:

- Cuando la sesión lleva muchos turnos y el contexto está lleno de respuestas largas que ya procesaste.
- Cuando quieres continuar la misma tarea pero el modelo empieza a responder más lento.
- Antes de pedir una revisión o cambio que requiere contexto fresco.

La diferencia con `/clear`: `/compact` conserva un resumen de lo que pasó, `/clear` borra todo. Para tareas largas dentro de una misma fase, `/compact` es mejor opción.

---

## Skills locales en `.claude/skills/`

Claude Code permite definir skills: fragmentos de instrucciones que se invocan con un comando `/nombre-del-skill`. Se guardan en `.claude/skills/` como archivos Markdown.

Un skill útil para este flujo es un "caveman mode" que reduce verbosidad en las respuestas:

```markdown
<!-- .claude/skills/caveman.md -->
Responde de forma muy concisa.
Elimina artículos, frases de relleno y saludos.
Mantén toda la sustancia técnica.
Código sin cambios.
```

Otros skills útiles para proyectos de migración:

- **`/phase-commit`**: crea un commit con el formato estándar del proyecto.
- **`/status-update`**: actualiza `MIGRATION_STATUS.md` con el formato correcto de la fase.
- **`/scope-check`**: revisa que los cambios propuestos estén dentro del alcance de `MIGRATION_TASK.md`.

Los skills no reemplazan los archivos de contexto, pero reducen prompts repetitivos.

---

## Flujo recomendado paso a paso

```
1. Definir la fase en MIGRATION_TASK.md
   — Tarea, archivos permitidos, fuera de alcance

2. Iniciar sesión con prompt corto
   — "Lee CLAUDE.md, MIGRATION_STATUS.md, MIGRATION_TASK.md.
      Ejecuta solo la tarea actual."

3. Revisar diff antes de aceptar
   — git diff --stat
   — git diff src/

4. Ejecutar validaciones
   — pnpm astro check
   — pnpm build

5. Actualizar MIGRATION_STATUS.md
   — Claude lo hace como parte de la tarea, pero confirmarlo

6. Actualizar MIGRATION_TASK.md con la siguiente fase
   — Sin ejecutarla todavía

7. Commit por fase
   — Un commit por fase completada, no uno al final de todo

8. /clear antes de empezar la siguiente fase
   — Sesión nueva, contexto limpio
```

---

## Checklist de buenas prácticas

| Práctica | Por qué importa |
|---|---|
| `CLAUDE.md` en la raíz | Claude lo lee automáticamente al iniciar |
| `MIGRATION_TASK.md` con archivos permitidos explícitos | Evita cambios fuera de alcance |
| Prompt corto para iniciar fase | Menos tokens, menos exploración innecesaria |
| `/clear` entre fases distintas | Evita que contexto viejo interfiera |
| Commit por fase | Fácil revertir si algo sale mal |
| Validaciones al final de cada fase | Detecta errores antes de acumularlos |
| Actualizar `MIGRATION_STATUS.md` siempre | Hace la siguiente sesión más barata |

---

## Conclusión

Claude Code no necesita leer todo tu proyecto para hacer su trabajo. Necesita el contexto correcto, en el momento correcto, con el alcance correcto.

Los tres archivos (`CLAUDE.md`, `MIGRATION_STATUS.md`, `MIGRATION_TASK.md`) son ese sistema. No son documentación: son el mecanismo que convierte sesiones caras y dispersas en sesiones cortas y enfocadas.

El flujo descrito aquí se usó para completar más de 20 fases de migración en este portafolio, desde el setup inicial hasta el sistema de blog completo con RSS, categorías y feeds por taxonomía. Cada fase tomó entre uno y tres prompts. La mayoría de las sesiones terminaron con el diff exacto esperado, sin cambios no solicitados.

El token más barato es el que no se gasta.
