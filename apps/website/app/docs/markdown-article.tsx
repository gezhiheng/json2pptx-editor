import type { Route } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './docs.module.css'

function resolveMarkdownHref (slug: string, href?: string): string | undefined {
  if (!href) return href
  if (href === './README.zh-CN.md') return `/docs/${slug}`
  if (href === './README.md') return `/docs/${slug}/en`
  return href
}

export function MarkdownArticle ({
  content,
  slug
}: {
  content: string
  slug: string
}) {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a ({ href, children }) {
            const resolvedHref = resolveMarkdownHref(slug, href)
            if (!resolvedHref) return <>{children}</>
            if (resolvedHref.startsWith('/')) {
              return <Link href={resolvedHref as Route}>{children}</Link>
            }
            return (
              <a href={resolvedHref} target='_blank' rel='noreferrer'>
                {children}
              </a>
            )
          },
          code ({ className, children, ...props }) {
            const isBlock = Boolean(className) || String(children).includes('\n')
            if (!isBlock) {
              return (
                <code className={styles.inlineCode} {...props}>
                  {children}
                </code>
              )
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          pre ({ children }) {
            return <pre className={styles.codeBlock}>{children}</pre>
          },
          table ({ children }) {
            return (
              <div className={styles.tableWrap}>
                <table>{children}</table>
              </div>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
