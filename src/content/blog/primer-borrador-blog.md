---
title: "Borrador de prueba — BLOG-1"
description: "Artículo de prueba para validar el schema de la colección blog. No publicar."
excerpt: "Validación del schema de Content Collection. Borrador técnico, no artículo real."
publishedAt: 2026-01-01
category: desarrollo
tags:
  - astro
  - typescript
cover:
  src: /img/blog/primer-borrador-blog/cover.webp
  alt: Portada de prueba del blog
draft: true
---

## Introducción

Este artículo es un borrador técnico creado para validar el schema de la colección `blog` en BLOG-1.

No es un artículo real. Se reemplaza o elimina en BLOG-6.

## Ejemplo de sección

Una sección de contenido con lista:

- Punto uno
- Punto dos
- Punto tres

## Ejemplo de código

```typescript
const posts = await getCollection('blog', ({ data }) => !data.draft);
```

## Ejemplo de callout

> **Nota:** los callouts se escriben como blockquotes con marcador en negrita. El estilo CSS se aplica en BLOG-4.

> **⚠ Advertencia:** esta es la sintaxis para advertencias.

> **💡 Tip:** y esta para tips.
