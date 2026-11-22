// Tells Astro where the site's content lives and what shape it should have.
// If a field is misspelled or missing, `npm run build` stops with a clear error.
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const order = z.number();
const asset = z.string().regex(/^assets\//, 'should be a path inside assets/');

const writeups = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/writeups' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    tag: z.string(),
    excerpt: z.string(),
    coverColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    order,
  }),
});

const degrees = defineCollection({
  loader: file('src/data/degrees.yaml'),
  schema: z.object({
    order,
    degree: z.string(),
    school: z.string(),
    years: z.string(),
    line: z.string(),
    postcard: asset.optional(),
    stamp: asset.optional(),
  }),
});

const papers = defineCollection({
  loader: file('src/data/papers.yaml'),
  schema: z.object({
    order,
    title: z.string(),
    venue: z.string().optional(),
    date: z.string().optional(),
    status: z.enum(['Published', 'In review', 'Submitted']),
    award: z.string().optional(),
    markers: z.array(z.enum(['seal', 'ribbon', 'inkblot'])),
    line: z.string(),
    certificate: asset.optional(),
    writeup: z.string().optional(),
  }),
});

const interests = defineCollection({
  loader: file('src/data/interests.yaml'),
  schema: z.object({ order, name: z.string() }),
});

const experience = defineCollection({
  loader: file('src/data/experience.yaml'),
  schema: z.object({
    order,
    role: z.string(),
    org: z.string(),
    location: z.string().optional(),
    dates: z.string(),
    line: z.string(),
    certificate: asset.optional(),
  }),
});

const community = defineCollection({
  loader: file('src/data/community.yaml'),
  schema: z.object({
    order,
    role: z.string(),
    where: z.string(),
    dates: z.string(),
    line: z.string(),
  }),
});

const certifications = defineCollection({
  loader: file('src/data/certifications.yaml'),
  schema: z.object({
    order,
    name: z.string(),
    issuer: z.string(),
    issued: z.string(),
    validUntil: z.string().optional(),
    credentialId: z.string().optional(),
    verifyUrl: z.string().url().optional(),
    verifyNote: z.string().optional(),
    badge: asset.optional(),
    certificate: asset.optional(),
  }),
});

const cves = defineCollection({
  loader: file('src/data/cves.yaml'),
  schema: z.object({
    order,
    product: z.string(),
    ghsa: z.string(),
    severity: z.string(),
    date: z.string(),
    url: z.string().url(),
    description: z.string(),
  }),
});

const projects = defineCollection({
  loader: file('src/data/projects.yaml'),
  schema: z.object({
    order,
    shelf: z.enum(['finished', 'workbench']),
    name: z.string(),
    featured: z.boolean().optional(),
    stack: z.string().optional(),
    date: z.string().optional(),
    version: z.string().optional(),
    lastUpdated: z.string().optional(),
    status: z.string().optional(),
    line: z.string().optional(),
    link: z.string().url().optional(),
    color: z.string().optional(),
    hidden: z.boolean().optional(),
  }),
});

const skills = defineCollection({
  loader: file('src/data/skills.yaml'),
  schema: z.object({
    order,
    title: z.string(),
    subtitle: z.string(),
    icon: z.enum(['shield', 'document', 'book', 'wrench']),
    color: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  writeups, degrees, papers, interests, experience, community,
  certifications, cves, projects, skills,
};
