# UAVs@Berkeley Website

Source code for Astro-based replacement of WordPress site.

## Site Structure

```text
/
├── public/
│   └── images
│       ├── gallery
|       |   ├── home    # homepage carousel photos
|       |   └── join    # join page carousel photos
|       ├── leadership  # leads headshots
|       ├── projects    # project page photos
|       ├── sponsors    # sponsor logos
│       └── banner4.png # homepage banner
├── src
│   └── content
│       ├── projects    # project page markdown files
│       ├── donors.json # donor wall for crowdfunding
|       ├── leadership.json     # lead profiles
│       └── sponsor-logos.json  # sponsor links
├── components.json     # schema definitions
└── .env                # API keys for calendar updates
```

[Astro project structure documentation](https://docs.astro.build/en/basics/project-structure/).

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
