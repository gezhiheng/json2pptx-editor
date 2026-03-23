import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      'json2pptx-schema': fileURLToPath(
        new URL('./packages/json2pptx-schema/index.ts', import.meta.url)
      ),
      'json2pptx': fileURLToPath(
        new URL('./packages/json2pptx/src/index.ts', import.meta.url)
      ),
      'pptx-custom': fileURLToPath(
        new URL('./packages/pptx-custom/src/index.ts', import.meta.url)
      ),
      'pptx-previewer': fileURLToPath(
        new URL('./packages/pptx-previewer/index.ts', import.meta.url)
      ),
      'ppt2json': fileURLToPath(
        new URL('./packages/pptx2json/index.ts', import.meta.url)
      )
    }
  },
  test: {
    environment: 'node',
    include: [
      'test/**/*.test.ts',
      'packages/**/test/**/*.test.ts',
      'packages/**/tests/**/*.test.ts'
    ]
  }
})
