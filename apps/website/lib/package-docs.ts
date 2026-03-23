import { access, readFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'
import { cache } from 'react'

export type PackageDocItem = {
  slug: string
  packageDir: string
  packageName: string
}

export type PackageDocEntry = PackageDocItem & {
  title: string
  summary: string
  markdown: string
  sourceFileName: string
  hasChineseReadme: boolean
  hasEnglishReadme: boolean
}

const PACKAGE_DOCS: PackageDocItem[] = [
  {
    slug: 'json2pptx-schema',
    packageDir: 'json2pptx-schema',
    packageName: 'json2pptx-schema'
  },
  {
    slug: 'json2pptx',
    packageDir: 'json2pptx',
    packageName: 'json2pptx'
  },
  {
    slug: 'pptx2json',
    packageDir: 'pptx2json',
    packageName: 'ppt2json'
  },
  {
    slug: 'pptx-previewer',
    packageDir: 'pptx-previewer',
    packageName: 'pptx-previewer'
  },
  {
    slug: 'pptx-custom',
    packageDir: 'pptx-custom',
    packageName: 'pptx-custom'
  }
]

const REPO_ROOT = path.resolve(process.cwd(), '..', '..')

async function fileExists (filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.F_OK)
    return true
  } catch {
    return false
  }
}

function stripMarkdown (value: string): string {
  return value
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractTitle (markdown: string, fallback: string): string {
  const match = markdown.match(/^#\s+(.+)$/m)
  return match ? stripMarkdown(match[1]) : fallback
}

function extractSummary (markdown: string): string {
  const lines = markdown.split('\n')
  let inCodeBlock = false

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock || line.length === 0) continue
    if (
      line.startsWith('#') ||
      line.startsWith('- ') ||
      line.startsWith('* ') ||
      /^\d+\.\s/.test(line)
    ) {
      continue
    }
    return stripMarkdown(line)
  }

  return ''
}

async function resolveReadmePaths (packageDir: string) {
  const baseDir = path.join(REPO_ROOT, 'packages', packageDir)
  const zhPath = path.join(baseDir, 'README.zh-CN.md')
  const defaultPath = path.join(baseDir, 'README.md')
  const hasChineseReadme = await fileExists(zhPath)
  const hasEnglishReadme = await fileExists(defaultPath)

  return {
    baseDir,
    zhPath,
    defaultPath,
    hasChineseReadme,
    hasEnglishReadme
  }
}

export const getPackageDocList = cache(async () => {
  const docs = await Promise.all(
    PACKAGE_DOCS.map(async (item) => {
      const { zhPath, defaultPath, hasChineseReadme, hasEnglishReadme } =
        await resolveReadmePaths(item.packageDir)
      const selectedPath = hasChineseReadme ? zhPath : defaultPath
      const markdown = await readFile(selectedPath, 'utf8')

      return {
        ...item,
        title: extractTitle(markdown, item.packageName),
        summary: extractSummary(markdown),
        sourceFileName: path.basename(selectedPath),
        hasChineseReadme,
        hasEnglishReadme
      }
    })
  )

  return docs
})

export const getPackageDoc = cache(async (
  slug: string,
  language: 'default' | 'en' = 'default'
): Promise<PackageDocEntry | null> => {
  const item = PACKAGE_DOCS.find((entry) => entry.slug === slug)
  if (!item) return null

  const { zhPath, defaultPath, hasChineseReadme, hasEnglishReadme } =
    await resolveReadmePaths(item.packageDir)

  const selectedPath = language === 'en' || !hasChineseReadme ? defaultPath : zhPath
  if (!(await fileExists(selectedPath))) return null

  const markdown = await readFile(selectedPath, 'utf8')

  return {
    ...item,
    title: extractTitle(markdown, item.packageName),
    summary: extractSummary(markdown),
    markdown,
    sourceFileName: path.basename(selectedPath),
    hasChineseReadme,
    hasEnglishReadme
  }
})
