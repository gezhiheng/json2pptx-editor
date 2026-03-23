import type { Route } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import styles from '../../docs.module.css'
import { MarkdownArticle } from '../../markdown-article'
import { getPackageDoc, getPackageDocList } from '../../../../lib/package-docs'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams () {
  const docs = await getPackageDocList()
  return docs
    .filter((doc) => doc.hasEnglishReadme && doc.hasChineseReadme)
    .map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata ({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = await getPackageDoc(slug, 'en')
  if (!doc) {
    return {
      title: 'Documentation Not Found'
    }
  }

  return {
    title: `${doc.title} Docs`,
    description: doc.summary || `Read the ${doc.packageName} README in English.`
  }
}

export default async function PackageDocEnglishPage ({
  params
}: PageProps) {
  const { slug } = await params
  const [doc, docs] = await Promise.all([
    getPackageDoc(slug, 'en'),
    getPackageDocList()
  ])

  if (!doc || !doc.hasChineseReadme) notFound()

  return (
    <main className={styles.page}>
      <div className={styles.pageGlow} aria-hidden='true' />
      <div className={styles.shell}>
        <div className={styles.articleLayout}>
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Package Docs</h2>
            <p className={styles.sidebarLead}>
              These pages are statically generated from the README files in `packages/*`.
            </p>

            <div className={styles.sidebarList}>
              {docs.map((item) => {
                const href = `/docs/${item.slug}`
                const active = item.slug === doc.slug
                return (
                  <Link
                    key={item.slug}
                    href={href as Route}
                    className={`${styles.sidebarLink} ${active ? styles.sidebarLinkActive : ''}`}
                  >
                    <strong>{item.packageName}</strong>
                    <span>{item.sourceFileName}</span>
                  </Link>
                )
              })}
            </div>
          </aside>

          <article className={styles.article}>
            <header className={styles.articleHeader}>
              <span className={styles.eyebrow}>{doc.packageName}</span>
              <h1>{doc.title}</h1>
              <p>{doc.summary || 'This page is rendered from the package README.'}</p>

              <div className={styles.articleMeta}>
                <span className={styles.chip}>Source: {doc.sourceFileName}</span>
                <a
                  className={styles.chip}
                  href={`https://github.com/gezhiheng/pipto/tree/main/packages/${doc.packageDir}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  Open package directory
                </a>
              </div>

              <div className={styles.localeActions}>
                <Link href={`/docs/${doc.slug}` as Route} className={styles.localeLink}>
                  中文
                </Link>
                <Link
                  href={`/docs/${doc.slug}/en` as Route}
                  className={`${styles.localeLink} ${styles.localeLinkActive}`}
                >
                  English
                </Link>
              </div>
            </header>

            <MarkdownArticle content={doc.markdown} slug={doc.slug} />
          </article>
        </div>
      </div>
    </main>
  )
}
