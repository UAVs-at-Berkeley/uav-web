export const GET = () =>
  new Response(
    JSON.stringify({
      archived: true,
      message: 'The custom Google Calendar API implementation has been moved to src/archive/calendar-events.json.ts for future restoration.',
    }),
    {
      status: 410,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
