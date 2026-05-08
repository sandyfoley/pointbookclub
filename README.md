# Get to the Point Book Club

Astro app for a book club calendar with:

- A monthly calendar view
- A list of upcoming events
- Public event submission
- Book tracking with one current selection
- Member sign-up and member invite request forms

## Run locally

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run check`

## Storage

Runtime data is stored in local JSON files under [`data/`](./data):

- `events.json`
- `books.json`
- `memberSignups.json`
- `memberInvites.json`

This keeps v1 simple while preserving a clean seam for a future database or auth layer.
