# @henryge/pipto

`@henryge/pipto` is the umbrella package for the Pipto npm toolchain. It re-exports the workspace packages for schema parsing, PPTX export/import, browser previewing, and content/theme customization.

## Install

```bash
npm i @henryge/pipto
```

If you use the previewer entrypoint, install `react` as well:

```bash
npm i react
```

## Root Imports

The root entrypoint exposes the main APIs directly:

```ts
import {
  parseDocument,
  createPPTX,
  parsePptxToJson,
  applyCustomTheme,
  PPTXPreviewer,
  type Presentation,
  type Slide
} from '@henryge/pipto'

import type { SchemaTypes, Json2pptxTypes } from '@henryge/pipto'

type SchemaDoc = SchemaTypes.PresentationDocument
type ExportSlide = Json2pptxTypes.Slide
```

If you do not want to pull React into the root entrypoint, use the previewer subpath or the lazy loader below.

## Subpath Imports

Use subpaths when you want the full original package surface:

```ts
import { parseDocument } from '@henryge/pipto/json2pptx-schema'
import { createPPTX } from '@henryge/pipto/json2pptx'
import { parsePptxToJson } from '@henryge/pipto/ppt2json'
import { applyCustomTheme } from '@henryge/pipto/pptx-custom'
import { PPTXPreviewer } from '@henryge/pipto/pptx-previewer'
```

## Previewer From The Root Package

The root package also exposes a lazy loader if you want the previewer in a split chunk:

```ts
import type { PPTXPreviewerProps } from '@henryge/pipto'
import { importPPTXPreviewer } from '@henryge/pipto'

const { PPTXPreviewer } = await importPPTXPreviewer()
```
