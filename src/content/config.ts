import { defineCollection, z } from "astro:content";

const capabilities = defineCollection({
	type: "content",
	schema: z.object({
		order: z.number().int().positive(),
		title: z.string(),
		summary: z.string().min(20),
		linkHref: z.string().url(),
		linkLabel: z.string(),
		source: z.string(),
	}),
});

const changelog = defineCollection({
	type: "content",
	schema: z.object({
		date: z.coerce.date(),
		version: z.string(),
		title: z.string(),
		summary: z.string().min(20),
		highlights: z.array(z.string()).optional(),
	}),
});

const blog = defineCollection({
	type: "content",
	schema: z.object({
		date: z.coerce.date(),
		title: z.string(),
		summary: z.string().min(20),
		kind: z.enum(["decision", "retrospective", "advisory", "tutorial"]),
		tags: z.array(z.string()).default([]),
		author: z.string().default("Brainstorm team"),
		source: z.string().optional(),
	}),
});

const tutorials = defineCollection({
	type: "content",
	schema: z.object({
		order: z.number().int().positive(),
		title: z.string(),
		summary: z.string().min(20),
		duration: z.string(),
		audience: z.enum(["general", "developer", "power-user"]),
		status: z.enum(["draft", "published"]).default("draft"),
	}),
});

const segments = defineCollection({
	type: "content",
	schema: z.object({
		order: z.number().int().positive(),
		audience: z.string(),
		headline: z.string(),
		summary: z.string().min(20),
		proof: z.string().optional(),
		channels: z.array(z.string()).default([]),
		source: z.string(),
	}),
});

const compare = defineCollection({
	type: "content",
	schema: z.object({
		competitor: z.string(),
		competitorTagline: z.string(),
		status: z.enum(["draft", "published"]).default("draft"),
		competitorURL: z.string().url().optional(),
		summary: z.string().min(20),
		matrix: z.array(
			z.object({
				axis: z.string(),
				brainstorm: z.string(),
				competitor: z.string(),
			}),
		),
		source: z.string(),
	}),
});

export const collections = {
	capabilities,
	changelog,
	blog,
	tutorials,
	segments,
	compare,
};
