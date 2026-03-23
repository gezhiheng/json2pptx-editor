import type { Route } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import styles from '../docs.module.css'
import { MarkdownArticle } from '../markdown-article'
import { getPackageDoc, getPackageDocList } from '../../../lib/package-docs'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams () {
  const docs = await getPackageDocList()
  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata ({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = await getPackageDoc(slug)
  if (!doc) {
    return {
      title: '文档不存在'
    }
  }

  return {
    title: `${doc.title} 文档`,
    description: doc.summary || `查看 ${doc.packageName} 的 README 文档。`
  }
}

export default async function PackageDocPage ({
  params
}: PageProps) {
  const { slug } = await params
  const [doc, docs] = await Promise.all([
    getPackageDoc(slug),
    getPackageDocList()
  ])

  if (!doc) notFound()

  return (
    <main className={styles.page}>
      <div className={styles.pageGlow} aria-hidden='true' />
      <div className={styles.shell}>
        <div className={styles.articleLayout}>
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Packages 文档</h2>
            <p className={styles.sidebarLead}>
              Pipto toolchain 的文档
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
              <p>{doc.summary || '当前页面内容直接来自仓库中的 README 文件。'}</p>

              <div className={styles.articleMeta}>
                <span className={styles.chip}>来源：{doc.sourceFileName}</span>
                <a
                  className={styles.chip}
                  href={`https://github.com/gezhiheng/pipto/tree/main/packages/${doc.packageDir}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  打开 package 目录
                </a>
              </div>

              {doc.hasEnglishReadme && doc.hasChineseReadme && (
                <div className={styles.localeActions}>
                  <Link
                    href={`/docs/${doc.slug}` as Route}
                    className={`${styles.localeLink} ${styles.localeLinkActive}`}
                  >
                    中文
                  </Link>
                  <Link href={`/docs/${doc.slug}/en` as Route} className={styles.localeLink}>
                    English
                  </Link>
                </div>
              )}
            </header>

            <MarkdownArticle content={doc.markdown} slug={doc.slug} />
          </article>
        </div>
      </div>
    </main>
  )
}
