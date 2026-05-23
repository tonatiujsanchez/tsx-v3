import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { TECH_NAMES } from './types/index';

const projects = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        order: z.number(),
        cover: z.string(),
        tech: z.array(z.enum(TECH_NAMES)),
        demo: z.string().url().optional(),
        github: z.string().url().optional(),
        githubFrontend: z.string().url().optional(),
        githubBackend: z.string().url().optional(),
        gallery: z.array(z.string()).optional(),
    }),
});

export const collections = { projects };
