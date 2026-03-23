# Pipto

[中文](./README.zh-CN.md)

## Introduction

Pipto is a JSON-native presentation workspace for JSON to PPTX, PPTX to JSON, authoring, transforming, previewing, importing, and exporting slide decks.
It is designed for teams that want to generate PowerPoint files from structured JSON, inspect existing PPTX files as data, and keep presentation workflows inside versioned code.
It combines a SEO-friendly website, an interactive playground, and a set of publishable packages that turn presentation workflows into reusable engineering assets.

At runtime, the repo is split into two apps:

- `apps/website` for the public-facing brand and landing pages
- `apps/playground` for the editor, live preview, template exploration, and PPTX round-trip workflow

Underneath those apps, `packages/*` provides the reusable core:

- `json2pptx-schema` for migration, validation, and normalization
- `json2pptx` for PPTX generation
- `ppt2json` for PPTX parsing
- `pptx-previewer` for browser rendering
- `pptx-custom` for theme and custom-content transforms

## Project Description

Pipto is a JSON-native presentation platform that separates brand website, playground, and reusable document-processing packages into one workspace. It helps teams define deck content as structured data, preview it in the browser, transform templates systematically, and round-trip between JSON and PPTX without locking the workflow into manual slide editing. If you are looking for open source tooling around `json2pptx`, `json to pptx`, `json to ppt`, `pptx to json`, or `ppt to json`, this repository is the main workspace behind those apps and packages.

## Search Keywords

Common ways people discover this project include `json to pptx`, `json2pptx`, `json to ppt`, `pptx to json`, `ppt to json`, and `JSON to PowerPoint`.

## Features

- Inspired by [PPTist](https://github.com/pipipi-pikachu/PPTist)
- Marketing website for product positioning and SEO
- Live JSON editing for PowerPoint deck authoring with Monaco Editor and folding
- Real-time slide preview
- Export JSON to PPTX / PowerPoint via PptxGenJS
- Import PPTX back into editable JSON with PPT-native visual mapping
- Export current JSON to file
- Template selector powered by `apps/playground/template/*.json`

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS + shadcn-style components
- PptxGenJS
- Monaco Editor

## Core dependencies

- Related npm packages:
  - [`json2pptx`](https://www.npmjs.com/package/json2pptx)
  - [`json2pptx-schema`](https://www.npmjs.com/package/json2pptx-schema)
  - [`ppt2json`](https://www.npmjs.com/package/ppt2json)
  - [`pptx-custom`](https://www.npmjs.com/package/pptx-custom)
  - [`pptx-previewer`](https://www.npmjs.com/package/pptx-previewer)
- Runtime app: `react`, `react-dom`, `vite`
- Editor/UI: `monaco-editor`, `@monaco-editor/react`, `lucide-react`, `@radix-ui/react-select`
- Styling utilities: `tailwindcss`, `tailwind-merge`, `class-variance-authority`, `clsx`

## Project Structure

- `apps/website/` public-facing website
- `apps/playground/` editor application source and templates
- `packages/` publishable npm packages and supporting tests

## Getting Started

### 1) Install dependencies

```bash
pnpm i
```

### 2) Start the dev server

```bash
pnpm dev
```

## Common Commands

```bash
# App dev server (Vite HMR for app code)
pnpm dev

# Watch all workspace libs + app together (recommended for lib development + HMR)
pnpm dev:workspace

# Watch workspace libs only (json2pptx, schema, pptx-previewer, pptx-custom, pptx2json)
pnpm dev:libs

# Run tests
pnpm test

# Build production app bundle
pnpm build

# Preview production build locally
pnpm preview

# Build specific workspace packages
pnpm build:schema
pnpm build:json2pptx
pnpm build:ppt2json
pnpm build:pptx-previewer
pnpm build:pptx-custom
```

## Usage

### Choose a template

Add JSON templates to `apps/playground/template/` (e.g. `apps/playground/template/template_2.json`). Restart the dev server to refresh the template list.
Templates in this repo are sourced from [PPTist](https://github.com/pipipi-pikachu/PPTist).

### Export / Import

- **Export JSON**: downloads the current editor content.
- **Export PPTX**: generates a `.pptx` file via PptxGenJS.
- **Import PPTX**: upload a `.pptx` to convert into JSON through Office XML parsing.
  Visual round-trip is optimized for the built-in templates and shared primitives
  such as solid/gradient/image fills, images, text, paths, lines, and image clipping.
  No custom JSON payload is embedded in or read from `.pptx` files.

## Notes

- The preview uses the `width` and `height` from the JSON to maintain aspect ratio.
- The PPTX export is a best-effort mapping of shapes, text, images, and lines.
- Remote images in templates must be publicly accessible for PPTX export.
