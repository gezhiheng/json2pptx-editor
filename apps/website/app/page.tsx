import { heroCoverJsonSnippet } from '../lib/hero-cover-slide'
import type { ReactNode } from 'react'
import { HeroCoverPreview } from './hero-cover-preview'
import styles from './page.module.css'

const repositoryHref = 'https://github.com/gezhiheng/pipto'
const docsHref = '/docs/json2pptx'

const navLinks = [
  { label: 'Feature', href: '#features', external: false },
  { label: 'Workflow', href: '#workflow', external: false },
  { label: 'Docs', href: docsHref, external: true },
  { label: 'GitHub', href: repositoryHref, icon: 'github', ariaLabel: 'GitHub 仓库', external: true }
] as const

const packagePills = [
  {
    name: 'json2pptx-schema',
    href: '/docs/json2pptx-schema'
  },
  {
    name: 'json2pptx',
    href: '/docs/json2pptx'
  },
  {
    name: 'pptx2json',
    href: '/docs/pptx2json'
  },
  {
    name: 'pptx-previewer',
    href: '/docs/pptx-previewer'
  },
  {
    name: 'pptx-custom',
    href: '/docs/pptx-custom'
  }
] as const

const heroMetrics = [
  { label: '核心能力包', value: '5 个引擎房' },
  { label: '链路形态', value: 'JSON -> PPTX -> JSON' },
  { label: '当前入口', value: 'Website + Playground' }
] as const

const workflowSteps = [
  {
    step: '1',
    title: '先定义结构',
    body: '用 schema 描述页面、布局、内容与主题输入，让整套演示数据先稳定、可校验、可迁移。'
  },
  {
    step: '2',
    title: '再预览与变换',
    body: '在浏览器里直接渲染 presentation JSON，替换主题资产并调整模板驱动内容，再决定是否导出。'
  },
  {
    step: '3',
    title: '最后交付文件',
    body: '导出真实可用的 PPTX，或者把现有 deck 反向解析回结构化 JSON，继续进入下一轮编辑。'
  }
] as const

type IconName = 'terminal' | 'shield' | 'preview' | 'layers'
const jsonTokenPattern = /("(?:\\.|[^"\\])*")(?=\s*:)|("(?:\\.|[^"\\])*")|(-?\d+(?:\.\d+)?)|(\.\.\.)|\b(true|false|null)\b/g

function HighlightedJsonSnippet ({
  code
}: {
  code: string
}) {
  const lines = code.split('\n')

  return (
    <pre className={styles.codeBlock}>
      {lines.map((line, lineIndex) => {
        const tokens: ReactNode[] = []
        let cursor = 0

        for (const match of line.matchAll(jsonTokenPattern)) {
          const [token, keyToken, stringToken, numberToken, ellipsisToken, literalToken] = match
          const start = match.index ?? 0

          if (start > cursor) {
            tokens.push(
              <span key={`${lineIndex}-${cursor}-plain`}>
                {line.slice(cursor, start)}
              </span>
            )
          }

          let className = styles.codeToken

          if (keyToken) className = styles.codeKey
          else if (stringToken) className = styles.codeString
          else if (numberToken) className = styles.codeNumber
          else if (ellipsisToken) className = styles.codeEllipsis
          else if (literalToken) className = styles.codeLiteral

          tokens.push(
            <span key={`${lineIndex}-${start}-${token}`} className={className}>
              {token}
            </span>
          )

          cursor = start + token.length
        }

        if (cursor < line.length) {
          tokens.push(
            <span key={`${lineIndex}-${cursor}-tail`}>
              {line.slice(cursor)}
            </span>
          )
        }

        return (
          <span key={lineIndex} className={styles.codeLine}>
            {tokens.length > 0 ? tokens : '\u00A0'}
          </span>
        )
      })}
    </pre>
  )
}

function FeatureIcon ({
  name
}: {
  name: IconName
}) {
  if (name === 'terminal') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6.5h16v11H4z" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="m7 10 3 2.5L7 15" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
        <path d="M12.5 15h4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      </svg>
    )
  }

  if (name === 'shield') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 4.5 6.2 6.8v5.4c0 4.1 2.3 6.8 5.8 8.3 3.5-1.5 5.8-4.2 5.8-8.3V6.8z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
        <path d="m9.7 12 1.6 1.7 3.2-3.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    )
  }

  if (name === 'preview') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.5" y="6.5" width="15" height="11" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 10h8M8 13h5M15.5 15.2h.01" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 7.5h15M4.5 12h15M4.5 16.5h15" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M8.5 4.5v15M15.5 4.5v15" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  )
}

function GitHubIcon () {
  return (
    <svg className={styles.githubIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.28-.36 6.73-1.6 6.73-7.2A5.6 5.6 0 0 0 19.2 3.77 5.07 5.07 0 0 0 19.09 1S17.73.65 15 2.48a13.38 13.38 0 0 0-6 0C6.27.65 4.91 1 4.91 1A5.07 5.07 0 0 0 4.8 3.77 5.6 5.6 0 0 0 3.27 7.6c0 5.56 3.45 6.84 6.73 7.2a4.8 4.8 0 0 0-1 3.2v4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M9 18c-4.51 2-5-2-7-2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  )
}

function TransformArrowIcon () {
  return (
    <span className={styles.heroTitleSwap} aria-hidden="true">
      <svg viewBox="0 0 72 36" aria-hidden="true">
        <path
          d="M4 11h47"
          fill="none"
          stroke="var(--ember-500)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path
          d="m42 4 9 7-9 7"
          fill="none"
          stroke="var(--ember-500)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path
          d="M68 25H21"
          fill="none"
          stroke="var(--slateblue-500)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path
          d="m30 18-9 7 9 7"
          fill="none"
          stroke="var(--slateblue-500)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
      </svg>
    </span>
  )
}

export default function HomePage () {
  const playgroundHref = process.env.NEXT_PUBLIC_PLAYGROUND_URL ?? '/playground'
  const footerLinks = [
    { label: 'GitHub', href: repositoryHref, icon: 'github', ariaLabel: 'GitHub 仓库', external: true },
    { label: '文档', href: docsHref, external: true },
    { label: '在线演示', href: playgroundHref, external: false },
    { label: '问题反馈', href: `${repositoryHref}/issues`, external: true }
  ]

  return (
    <main className={styles.page}>
      <div className={styles.pageGlow} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="/">
            <img className={styles.brandMark} src='/favicon.svg' alt='' aria-hidden='true' />
            <span className={styles.brandWord}>Pipto</span>
          </a>

          <nav className={styles.nav} aria-label="主导航">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>
              结构优先
              <br />
              <span className={styles.heroTitleFlow}>
                <span>JSON</span>
                <TransformArrowIcon />
                <span>PPTX</span>
              </span>
              <br />
              转换工具链 
            </h1>
            <p className={styles.heroLead}>
              Pipto 以 JSON 驱动内容生成，支持浏览器预览、模板化转换PPTX
            </p>

            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href={playgroundHref}>
                在线演示
              </a>
              <a
                className={styles.secondaryButton}
                href={docsHref}
                target="_blank"
                rel="noreferrer"
              >
                查看文档
              </a>
            </div>
          </div>

          <div className={styles.heroVisual} aria-label="封面 JSON 与预览">
            <div className={styles.codePanel}>
              <div className={styles.panelBar}>
                <span className={styles.panelLabel}>presentation.json</span>
                <div className={styles.windowDots} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <HighlightedJsonSnippet code={heroCoverJsonSnippet} />
            </div>

            <div className={styles.previewPanel}>
              <div className={styles.previewStage}>
                <HeroCoverPreview />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="features">
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle}>为工程团队而设计的演示文稿工具链。</h2>
            <p className={styles.sectionLead}>
              这不是单个 editor 的包装页，而是把 schema、renderer、parser、
              previewer 和 theme transform 组织成一条可交付、可验证、可复用的链路。
            </p>
          </div>

          <div className={styles.featureGrid}>
            <article className={styles.featureCard} data-span="wide" data-accent="violet">
              <div className={styles.featureIcon}>
                <FeatureIcon name="terminal" />
              </div>
              <p className={styles.featureLabel}>工程分层</p>
              <h3 className={styles.featureTitle}>核心能力做成明确的包，而不是藏在 app 里。</h3>
              <p className={styles.featureBody}>
                把 schema 校验、PPTX 渲染、浏览器预览、回读解析和主题变换拆成清晰模块，
                方便独立测试、版本管理和对外发布。
              </p>

              <ul className={styles.packageList} aria-label="核心能力包">
                {packagePills.map((item) => (
                  <li key={item.name}>
                    <a
                      className={styles.packageLink}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>

              <p className={styles.packageHint}>
                每个 package 目录下的 README 会在构建期读入，并静态打包到 website 的 docs 页面。
              </p>

              <div className={styles.commandCard}>
                <span className={styles.commandLabel}>工作区命令</span>
                <code>pnpm --filter pipto-website dev</code>
              </div>
            </article>

            <article className={styles.featureCard} data-span="narrow" data-accent="lavender">
              <div className={styles.featureIcon}>
                <FeatureIcon name="shield" />
              </div>
              <p className={styles.featureLabel}>回读解析</p>
              <h3 className={styles.featureTitle}>从 PPTX 回到结构化内容，而不是单向导出。</h3>
              <p className={styles.featureBody}>
                <code className={styles.inlineCode}>pptx2json</code> and{' '}
                <code className={styles.inlineCode}>json2pptx-schema</code> 让 deck
                保持可编辑，而不是把导出变成不可回头的一次性动作。
              </p>
            </article>

            <article className={styles.featureCard} data-span="narrow" data-accent="slate">
              <div className={styles.featureIcon}>
                <FeatureIcon name="preview" />
              </div>
              <p className={styles.featureLabel}>浏览器预览</p>
              <h3 className={styles.featureTitle}>不打开 Office，也能先检查版式变化。</h3>
              <p className={styles.featureBody}>
                直接在浏览器里预览 presentation JSON，让模板调整和内容修改停留在同一条
                反馈链路里。
              </p>
            </article>

            <article className={styles.featureCard} data-span="wide" data-accent="steel">
              <div className={styles.featureIcon}>
                <FeatureIcon name="layers" />
              </div>
              <p className={styles.featureLabel}>主题变换</p>
              <h3 className={styles.featureTitle}>模板资产进入统一工作流，而不是散落在人工操作里。</h3>
              <p className={styles.featureBody}>
                把主题替换、自定义内容注入和模板规范对齐放进同一条链路，而不是继续手动维护
                各种 deck 变体。
              </p>

              <div className={styles.miniDeck} aria-hidden="true">
                <div className={styles.miniDeckPanel}>
                  <span className={styles.miniDeckLine} />
                  <span className={styles.miniDeckLine} />
                  <span className={styles.miniDeckAccent} />
                </div>
                <div className={styles.miniDeckPanel}>
                  <span className={styles.miniDeckLine} />
                  <span className={styles.miniDeckAccent} />
                  <span className={styles.miniDeckLine} />
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.workflowSection} id="workflow">
          <div className={styles.workflowHeading}>
            <h2 className={styles.workflowTitle}>三步跑通演示自动化流程</h2>
            <span className={styles.workflowRule} aria-hidden="true" />
          </div>

          <div className={styles.workflowGrid}>
            {workflowSteps.map((item) => (
              <article key={item.step} className={styles.workflowCard}>
                <div className={styles.workflowNumber}>{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaGlow} aria-hidden="true" />
            <div className={styles.ctaContent}>
              <h2>准备把演示文稿接进你的工程链路了吗？</h2>
              <p>
                先用 Playground 验证 authoring 流程，再把同一套 JSON 管道接进真实
                业务、报表和模板系统。
              </p>
              <div className={styles.ctaActions}>
                <a className={styles.primaryButton} href={playgroundHref}>
                  在线演示
                </a>
                <a
                  className={styles.secondaryButton}
                  href={repositoryHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  查看仓库
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <img className={styles.footerBrandIcon} src='/favicon.svg' alt='' aria-hidden='true' />
            <span>Pipto</span>
          </div>
          <div className={styles.footerLinks}>
            {footerLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={item.icon ? styles.iconLink : undefined}
                aria-label={item.ariaLabel ?? item.label}
                title={item.ariaLabel ?? item.label}
                {...((item.external ?? item.href.startsWith('http')) ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {item.label}
              </a>
            ))}
          </div>
          <p className={styles.footerCopy}>© 2026 Henry Ge</p>
        </div>
      </footer>
    </main>
  )
}
