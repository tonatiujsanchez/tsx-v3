import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { TECH_NAMES } from './types/index';

const projects = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        summary: z.string(),
        order: z.number(),
        cover: z.string(),
        year: z.number().optional(),
        tech: z.array(z.enum(TECH_NAMES)),
        coverCaption: z.string().optional(),
        demo: z.string().url().optional(),
        github: z.string().url().optional(),
        githubFrontend: z.string().url().optional(),
        githubBackend: z.string().url().optional(),
        gallery: z.array(z.object({ src: z.string(), caption: z.string() })).optional(),
    }),
});

export const collections = { projects };
