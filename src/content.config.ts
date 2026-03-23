import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const seasonalDatePattern = /^(spring|fall)\s+(\d{4})$/i;
const normalizeProjectDate = (rawDate: string) => {
  const trimmed = rawDate.trim();
  if (/^ongoing$/i.test(trimmed)) return 'Ongoing';

  const match = seasonalDatePattern.exec(trimmed);
  if (!match) return trimmed;

  const [, term, year] = match;
  const normalizedTerm = term[0].toUpperCase() + term.slice(1).toLowerCase();
  return `${normalizedTerm} ${year}`;
};

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z
      .string()
      .min(1)
      .transform((value) => value.trim())
      .refine((value) => /^ongoing$/i.test(value) || seasonalDatePattern.test(value), {
        message: 'date must be Ongoing, Spring YYYY, or Fall YYYY',
      })
      .transform(normalizeProjectDate),
    image: z.string(),
    imageAlt: z.string(),
    description: z.string(),
    tag: z.enum(['Competition', 'Research', 'Videography', 'Fun']),
  }),
});

const sponsorLogos = defineCollection({
  loader: glob({ pattern: 'sponsor-logos.json', base: './src/content' }),
  schema: z.object({
    logos: z.array(
      z.object({
        name: z.string(),
        image: z.string(),
        link: z.string().url(),
      }),
    ),
  }),
});

const donors = defineCollection({
  loader: glob({ pattern: 'donors.json', base: './src/content' }),
  schema: z.object({
    tiers: z.array(
      z.object({
        tier: z.string(),
        names: z.array(z.string()),
      }),
    ),
  }),
});

const leadership = defineCollection({
  loader: glob({ pattern: 'leadership.json', base: './src/content' }),
  schema: z.object({
    members: z.array(
      z.object({
        name: z.string(),
        title: z.string(),
        image: z.string(),
      }),
    ),
  }),
});

export const collections = {
  projects,
  sponsorLogos,
  donors,
  leadership,
};