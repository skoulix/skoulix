import { defineContentConfig, defineCollection, z } from '@nuxt/content';

const pageSchema = z.object({
    locale: z.string().nonempty(),
    title: z.string().nonempty(),
    description: z.string().optional(),
    rawbody: z.string(),
    navigation: z
        .object({
            title: z.string().nonempty(),
            visible: z.boolean(),
            order: z.number().optional(),
            type: z.string().optional(),
        })
        .optional(), // optional if not all pages use it
});

const articleSchema = z.object({
    locale: z.string().nonempty(),
    title: z.string().nonempty(),
    slug: z.string().nonempty(),
    description: z.string().optional(),
    rawbody: z.string(),
    date: z.string().optional(),
    image: z.string().url().optional(),
    readingTime: z.string().optional(),
    icon: z.string().optional(),
    category: z.string().nonempty(),
    tags: z.array(z.string()).default([]),
});

// Schema for blog categories
const blogCategorySchema = z.object({
    locale: z.string().nonempty(),
    name: z.string().nonempty(),
    slug: z.string().nonempty(),
    description: z.string().optional(),
    navigation: z
        .object({
            title: z.string().nonempty(),
            visible: z.boolean(),
            order: z.number().optional(),
        })
        .optional(), // optional if not all categories use it
});

const pages = defineCollection({
    type: 'page',
    source: {
        include: '**/*.md',
        exclude: ['**/blog/*', '**/blog/categories/*'],
    },
    schema: pageSchema,
});

const blog = defineCollection({
    type: 'page',
    source: {
        include: '**/blog/*',
    },
    schema: articleSchema,
});

const blogCategories = defineCollection({
    type: 'data', // Use 'data' for non-page content like categories
    source: {
        include: '**/blog/categories/*',
    },
    schema: blogCategorySchema,
});

export default defineContentConfig({
    collections: { pages, blog, blogCategories },
});
