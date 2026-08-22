# UAVs@Berkeley Website

Source code for Astro-based replacement of WordPress site.

## Deployment

The site is hosted by the OCF. Pushing a commit to the GitHub repository will trigger the `build-and-deploy` action that builds the site and `rsync`'s the files to the `~/public_html/` directory of the OCF group account.

## Development

Requies Node.js version 22 or newer. Run `npm install` to install dependencies and `npm run dev` to start the development server. A Nix flake is included if you are a nerd and use NixOS.

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
