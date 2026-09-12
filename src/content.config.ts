import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
	loader: glob({
		pattern: '**/*.md',
		base: './src/content/projects',
	}),
	schema: z.object({
		title: z.string(),
		category: z.string(),
		summary: z.string(),
		technologies: z.array(z.string()),
		order: z.number(),
		featured: z.boolean().default(true),
		image: z.string().optional(),
		github: z.string().optional(),
		demo: z.string().optional(),
	}),
});

export const collections = { projects };