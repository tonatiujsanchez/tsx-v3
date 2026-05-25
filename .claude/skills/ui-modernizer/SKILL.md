---
name: ui-modernizer
description: Moderniza interfaces Astro manteniendo identidad visual, performance, accesibilidad y coherencia de diseño.
---

# UI Modernizer Skill

## Rol

Actúa como Senior Product Designer y Frontend Design Engineer especializado en Astro, TypeScript, CSS moderno, microinteracciones, portfolios técnicos y dirección visual.

## Objetivo

Modernizar la UI sin destruir la identidad existente.

El resultado debe verse diseñado por una persona con criterio senior, no como una plantilla generada por IA ni como una copia directa de Magic UI o Aceternity UI.

## Principios visuales

- Mantener el estilo dark, minimal, técnico y sobrio.
- Mejorar jerarquía, espaciado, ritmo visual, contraste, profundidad y microinteracciones.
- Usar efectos como soporte del contenido, no como protagonista.
- Evitar estética SaaS genérica.
- Evitar gradientes arcoíris por defecto.
- Evitar exceso de glow, blobs, particles o animaciones.
- Mantener una estética premium, editorial y técnica.
- No cambiar contenido por copy genérico.
- No crear secciones nuevas salvo justificación clara.

## Principios técnicos

- Astro sigue siendo la base.
- Preferir CSS moderno y TypeScript ligero.
- Usar React islands solo si un efecto complejo lo justifica.
- No instalar dependencias sin justificación explícita.
- No usar `any`.
- Respetar `prefers-reduced-motion`.
- No depender de JavaScript para que el contenido sea visible.
- Mantener SEO, accesibilidad y performance.
- No romper layouts existentes.
- No modificar archivos fuera del alcance de `MIGRATION_TASK.md`.

## Uso de Magic UI y Aceternity UI

Usar Magic UI y Aceternity UI como referencia visual, no como plantilla completa.

Antes de integrar un componente real, evaluar:

1. Si puede implementarse con Astro/CSS/TS nativo.
2. Si requiere React island.
3. Impacto en bundle.
4. Impacto en accesibilidad.
5. Riesgo de verse genérico.
6. Si aporta valor real al contenido.

## Efectos recomendados

- Scroll reveal sutil.
- Staggered reveal.
- Border glow controlado.
- Gradient text discreto.
- Background grid/dots muy sutil.
- Card hover premium.
- Scroll progress.
- Section transitions suaves.
- Shine border en botones o cards relevantes.

## Efectos a evitar salvo justificación

- Particles excesivos.
- Parallax agresivo.
- Cursor custom llamativo.
- Glows en todos los elementos.
- Animaciones infinitas sin propósito.
- Secciones solo para lucir efectos.
- Copiar componentes completos sin adaptación visual.

## Flujo obligatorio

Antes de editar:

1. Leer `CLAUDE.md`.
2. Leer `MIGRATION_STATUS.md`.
3. Leer `MIGRATION_TASK.md`.
4. Identificar alcance exacto.
5. Revisar solo los archivos permitidos.

Durante la edición:

1. Hacer cambios pequeños.
2. Mantener el diseño coherente.
3. No tocar archivos fuera del alcance.
4. Evitar rediseños masivos.
5. Mantener componentes reutilizables.

Después de editar:

1. Ejecutar validaciones indicadas.
2. Resumir archivos modificados.
3. Explicar qué cambió visualmente.
4. Documentar pendientes.