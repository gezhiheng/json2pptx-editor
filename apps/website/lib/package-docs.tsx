import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { MDXComponents } from 'mdx/types'
import type { ReactNode } from 'react'
import { Fragment, cache, createElement } from 'react'
import { createCompiler } from '@fumadocs/mdx-remote'
import type { PageTree, TableOfContents } from 'fumadocs-core/server'
import Link from 'fumadocs-core/link'
import defaultMdxComponents from 'fumadocs-ui/mdx'

export type DocLocale = 'en' | 'zh'
export type DocSlug = 'overview' | 'json-to-ppt' | 'ppt-to-json' | 'browser-preview'

type DocDefinition = {
  slug: DocSlug
  pathSlug: '' | 'json-to-ppt' | 'ppt-to-json' | 'browser-preview'
  navLabel: Record<DocLocale, string>
  title: Record<DocLocale, string>
  description: Record<DocLocale, string>
  sourceRepoPath: Record<DocLocale, string>
}

export type DocListEntry = {
  slug: DocSlug
  pathSlug: DocDefinition['pathSlug']
  locale: DocLocale
  navLabel: string
  title: string
  description: string
  url: string
  alternateUrl: string
  sourcePath: string
  sourceRepoPath: string
}

export type DocFooterItem = Pick<PageTree.Item, 'name' | 'description' | 'url'>

export type DocEntry = DocListEntry & {
  markdown: string
  toc: TableOfContents
  content: ReactNode
  footer: {
    previous?: DocFooterItem
    next?: DocFooterItem
  }
}

// Keep docs metadata in one place so nav, routing, edit links, and page copy stay aligned.
const DOCS: DocDefinition[] = [
  {
    slug: 'overview',
    pathSlug: '',
    navLabel: {
      en: 'Overview',
      zh: '总览'
    },
    title: {
      en: '@henryge/pipto',
      zh: '@henryge/pipto'
    },
    description: {
      en: 'Install one package and cover export, import, and browser preview workflows.',
      zh: '安装一个包，覆盖导出、解析和浏览器预览三条核心工作流。'
    },
    sourceRepoPath: {
      en: 'apps/website/content/docs/en/overview.mdx',
      zh: 'apps/website/content/docs/zh/overview.mdx'
    }
  },
  {
    slug: 'json-to-ppt',
    pathSlug: 'json-to-ppt',
    navLabel: {
      en: 'JSON to PPT',
      zh: 'JSON 转 PPT'
    },
    title: {
      en: 'JSON to PPT',
      zh: 'JSON 转 PPT'
    },
    description: {
      en: 'Use createPPTX() to export a Pipto presentation object to a .pptx file.',
      zh: '使用 createPPTX() 把 Pipto 的演示对象导出为 .pptx 文件。'
    },
    sourceRepoPath: {
      en: 'apps/website/content/docs/en/json-to-ppt.mdx',
      zh: 'apps/website/content/docs/zh/json-to-ppt.mdx'
    }
  },
  {
    slug: 'ppt-to-json',
    pathSlug: 'ppt-to-json',
    navLabel: {
      en: 'PPT to JSON',
      zh: 'PPT 转 JSON'
    },
    title: {
      en: 'PPT to JSON',
      zh: 'PPT 转 JSON'
    },
    description: {
      en: 'Use parsePptxToJson() to turn a .pptx File into Pipto presentation data.',
      zh: '使用 parsePptxToJson() 把 .pptx File 解析为 Pipto 的演示数据。'
    },
    sourceRepoPath: {
      en: 'apps/website/content/docs/en/ppt-to-json.mdx',
      zh: 'apps/website/content/docs/zh/ppt-to-json.mdx'
    }
  },
  {
    slug: 'browser-preview',
    pathSlug: 'browser-preview',
    navLabel: {
      en: 'Browser Preview',
      zh: '浏览器预览'
    },
    title: {
      en: 'Browser Preview',
      zh: '浏览器预览'
    },
    description: {
      en: 'Render a single slide in React with PPTXPreviewer.',
      zh: '使用 PPTXPreviewer 在 React 中渲染单页幻灯片。'
    },
    sourceRepoPath: {
      en: 'apps/website/content/docs/en/browser-preview.mdx',
      zh: 'apps/website/content/docs/zh/browser-preview.mdx'
    }
  }
]

const compiler = createCompiler({
  preset: 'fumadocs',
  remarkImageOptions: {
    useImport: false,
    external: false
  }
})

const REPO_ROOT = process.cwd().endsWith(path.join('apps', 'website'))
  ? path.resolve(process.cwd(), '..', '..')
  : process.cwd()

function getDocUrl (pathSlug: DocDefinition['pathSlug'], locale: DocLocale) {
  if (locale === 'en') {
    return pathSlug ? `/docs/${pathSlug}` : '/docs'
  }

  return pathSlug ? `/docs/zh/${pathSlug}` : '/docs/zh'
}

function getAlternateLocale (locale: DocLocale): DocLocale {
  return locale === 'en' ? 'zh' : 'en'
}

function toAbsoluteSourcePath (sourceRepoPath: string) {
  return path.join(REPO_ROOT, sourceRepoPath)
}

function localizeDoc (doc: DocDefinition, locale: DocLocale): DocListEntry {
  const sourceRepoPath = doc.sourceRepoPath[locale]

  return {
    slug: doc.slug,
    pathSlug: doc.pathSlug,
    locale,
    navLabel: doc.navLabel[locale],
    title: doc.title[locale],
    description: doc.description[locale],
    url: getDocUrl(doc.pathSlug, locale),
    alternateUrl: getDocUrl(doc.pathSlug, getAlternateLocale(locale)),
    sourcePath: toAbsoluteSourcePath(sourceRepoPath),
    sourceRepoPath
  }
}

function getDocSequence (locale: DocLocale): DocFooterItem[] {
  return DOCS.map((doc) => {
    const localizedDoc = localizeDoc(doc, locale)

    return {
      name: localizedDoc.navLabel,
      description: localizedDoc.description,
      url: localizedDoc.url
    }
  })
}

function getDocFooter (
  slug: DocSlug,
  locale: DocLocale
) {
  const sequence = getDocSequence(locale)
  const doc = localizeDoc(DOCS.find((item) => item.slug === slug)!, locale)
  const index = sequence.findIndex((item) => item.url === doc.url)

  return {
    previous: index > 0 ? sequence[index - 1] : undefined,
    next: index >= 0 && index < sequence.length - 1 ? sequence[index + 1] : undefined
  }
}

function createMdxComponents (): MDXComponents {
  return {
    ...defaultMdxComponents,
    a ({ href, children, ...props }) {
      if (!href) return createElement(Fragment, null, children)

      if (href.startsWith('/')) {
        return createElement(Link, { href, ...props }, children)
      }

      return createElement(
        'a',
        {
          href,
          rel: 'noreferrer',
          target: href.startsWith('#') ? undefined : '_blank',
          ...props
        },
        children
      )
    }
  }
}

export const getPackageDocList = cache(async (locale: DocLocale = 'en'): Promise<DocListEntry[]> => {
  return DOCS.map((doc) => localizeDoc(doc, locale))
})

export const getDocsTree = cache(async (locale: DocLocale = 'en'): Promise<PageTree.Root> => {
  const docs = await getPackageDocList(locale)

  return {
    name: locale === 'en' ? 'Pipto Docs' : 'Pipto 文档',
    children: docs.map((doc) => ({
      type: 'page' as const,
      name: doc.navLabel,
      description: doc.description,
      url: doc.url
    }))
  }
})

export const getPackageDoc = cache(async (
  slug: DocSlug,
  locale: DocLocale = 'en'
): Promise<DocEntry | null> => {
  const definition = DOCS.find((item) => item.slug === slug)
  if (!definition) return null

  const doc = localizeDoc(definition, locale)
  const markdown = await readFile(doc.sourcePath, 'utf8')
  const components = createMdxComponents()
  const compiled = await compiler.compile({
    source: markdown,
    filePath: doc.sourcePath,
    components
  })

  return {
    ...doc,
    markdown,
    toc: compiled.toc,
    content: await compiled.body({ components }),
    footer: getDocFooter(slug, locale)
  }
})

export async function getPackageDocByPathSlug (
  pathSlug: string,
  locale: DocLocale = 'en'
): Promise<DocEntry | null> {
  const definition = DOCS.find((item) => item.pathSlug === pathSlug)
  if (!definition) return null

  return getPackageDoc(definition.slug, locale)
}
