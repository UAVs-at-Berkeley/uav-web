import type { APIRoute } from 'astro';

type CalendarEvent = {
  summary?: string;
  location?: string;
  start?: {
    dateTime?: string;
    date?: string;
  };
};

type CalendarCacheEntry = {
  expiresAt: number;
  items: CalendarEvent[];
};

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const MAX_RESULTS_DEFAULT = 6;
const MAX_RESULTS_LIMIT = 20;
const cache = new Map<string, CalendarCacheEntry>();

const getMaxResults = (rawValue: string | null): number => {
  const parsed = Number.parseInt(rawValue ?? '', 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return MAX_RESULTS_DEFAULT;
  return Math.min(parsed, MAX_RESULTS_LIMIT);
};

export const GET: APIRoute = async ({ url }) => {
  const calendarId = import.meta.env.GOOGLE_CALENDAR_ID ?? import.meta.env.PUBLIC_GOOGLE_CALENDAR_ID;
  const apiKey = import.meta.env.GOOGLE_CALENDAR_API_KEY ?? import.meta.env.PUBLIC_GOOGLE_CALENDAR_API_KEY;

  if (!calendarId || !apiKey) {
    return new Response(
      JSON.stringify({ error: 'Missing GOOGLE_CALENDAR_ID/GOOGLE_CALENDAR_API_KEY env vars' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const maxResults = getMaxResults(url.searchParams.get('maxResults'));
  const cacheKey = `${calendarId}:${maxResults}`;
  const now = Date.now();
  const cached = cache.get(cacheKey);

  if (cached && cached.expiresAt > now) {
    return new Response(
      JSON.stringify({ items: cached.items, source: 'cache' }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60, s-maxage=21600, stale-while-revalidate=60',
        },
      },
    );
  }

  const endpoint = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${encodeURIComponent(apiKey)}&singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(new Date().toISOString())}&maxResults=${encodeURIComponent(String(maxResults))}`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: 'Unable to load calendar events from Google Calendar API' }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const payload = await response.json();
  const items = Array.isArray(payload?.items) ? payload.items : [];

  cache.set(cacheKey, {
    items,
    expiresAt: now + CACHE_TTL_MS,
  });

  return new Response(
    JSON.stringify({ items, source: 'google' }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60, s-maxage=21600, stale-while-revalidate=60',
      },
    },
  );
};