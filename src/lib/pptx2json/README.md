# ppt2json

Convert `.pptx` files into presentation JSON structures normalized by the `json2pptx-schema` pipeline.

## Install

```bash
npm i ppt2json
```

## Usage

```ts
import { parsePptxToJson } from 'ppt2json'

const file = new File([arrayBuffer], 'presentation.pptx', {
  type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
})

const { presentationJSON, warnings } = await parsePptxToJson(file)
```

`presentationJSON` is normalized `PresentationData`, and `warnings` contains non-fatal conversion warnings.

## Notes

- Parsing is based on Office XML.
- Returned output is normalized through `json2pptx-schema`, whose parse layer returns `PresentationDocument`.
- Visual round-trip is optimized for the built-in templates in this repo and shared primitives such as fills, text, paths, lines, images, and image clipping.
- Arbitrary third-party PPTX files are best-effort conversions.
