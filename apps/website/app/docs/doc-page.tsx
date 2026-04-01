import type { Route } from 'next'
import Link from 'next/link'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page'
import type { DocEntry, DocLocale } from '../../lib/package-docs'

type PackageDocPageProps = {
  doc: DocEntry
  locale: DocLocale
}

export function PackageDocPage ({
  doc,
  locale
}: PackageDocPageProps) {
  return (
    <DocsPage
      toc={doc.toc}
      footer={{
        items: doc.footer
      }}
      tableOfContent={{
        style: 'clerk'
      }}
    >
      <DocsTitle>{doc.title}</DocsTitle>
      <DocsDescription>{doc.description}</DocsDescription>

      <div className='not-prose mb-8 flex flex-wrap items-center gap-3'>
        <span className='inline-flex min-h-10 items-center rounded-full border border-fd-border bg-fd-secondary px-4 text-sm font-medium text-fd-muted-foreground'>
          @henryge/pipto
        </span>
        <div className='ms-auto flex flex-wrap gap-2'>
          <Link
            href={(locale === 'en' ? doc.url : doc.alternateUrl) as Route}
            className={`inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
              locale === 'en'
                ? 'border-transparent bg-fd-primary text-fd-primary-foreground'
                : 'border-fd-border bg-fd-secondary text-fd-foreground hover:bg-fd-accent hover:text-fd-accent-foreground'
            }`}
          >
            English
          </Link>
          <Link
            href={(locale === 'zh' ? doc.url : doc.alternateUrl) as Route}
            className={`inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
              locale === 'zh'
                ? 'border-transparent bg-fd-primary text-fd-primary-foreground'
                : 'border-fd-border bg-fd-secondary text-fd-foreground hover:bg-fd-accent hover:text-fd-accent-foreground'
            }`}
          >
            中文
          </Link>
        </div>
      </div>

      <DocsBody>{doc.content}</DocsBody>
    </DocsPage>
  )
}
