import styles from './page.module.css'

const packageCards = [
  {
    name: 'json2pptx-schema',
    role: 'Schema Core',
    body: '定义文档结构，完成迁移、校验和 normalize，让上游输入先收敛成稳定格式。',
    tone: 'signal'
  },
  {
    name: 'json2pptx',
    role: 'Renderer',
    body: '把结构化内容真正变成可交付的 PPTX 文件，而不是停留在浏览器截图或静态图像。',
    tone: 'rust'
  },
  {
    name: 'ppt2json',
    role: 'Parser',
    body: '把现有 PPTX 拉回 JSON 语义层，保留内容和版式的可再编辑能力。',
    tone: 'teal'
  },
  {
    name: 'pptx-previewer',
    role: 'Browser Preview',
    body: '在浏览器里快速看模板、内容和主题变化，不必每次都打开 Office。',
    tone: 'ink'
  },
  {
    name: 'pptx-custom',
    role: 'Theme & Content',
    body: '对模板做批量主题替换、内容注入和二次加工，让模板真正变成可编排素材。',
    tone: 'rust'
  }
] as const

const workflow = [
  {
    step: '01',
    title: '先表达结构，而不是先排版',
    body: '内容、主题、页面类型和元素位置都保留在 JSON 层，生成逻辑可以测试，也可以复用。'
  },
  {
    step: '02',
    title: '同一套素材可导出、可预览、可回读',
    body: '一边输出 PPTX，一边在浏览器里预览，同时保留把现有 PPTX 反向解析回结构化数据的能力。'
  },
  {
    step: '03',
    title: '把模板变成工作流节点',
    body: '主题替换、自定义内容、模板资产管理都可以挂到统一链路里，而不是散落在脚本和人工操作之间。'
  }
] as const

const principles = [
  {
    label: 'Landing Point',
    title: '品牌入口和工程入口分离',
    body: 'website 面向介绍、文档和 SEO；playground 面向真实编辑与集成验证。两者共享底层 packages，但生命周期不同。'
  },
  {
    label: 'Current Focus',
    title: '先把链路跑通，再扩展站点内容',
    body: '这版 landing page 先承担品牌入口、价值说明和 Playground 导流。后续再逐步补文档、案例、博客和 changelog。'
  },
  {
    label: 'Deployment Shape',
    title: '为同域双入口预留路径',
    body: '页面已经以 pipto.henryge.com 为主站定位，CTA 直接指向 /playground，便于后续接到反向代理方案。'
  }
] as const

const stackLines = [
  'JSON authoring',
  'schema validation',
  'theme transforms',
  'browser preview',
  'PPTX export / import'
] as const

export default function HomePage () {
  const playgroundHref = process.env.NEXT_PUBLIC_PLAYGROUND_URL ?? '/playground'

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a className={styles.brand} href="/">
            <span className={styles.brandMark}>P</span>
            <span className={styles.brandWord}>Pipto</span>
          </a>

          <nav className={styles.nav} aria-label="Primary">
            <a href="#packages">Packages</a>
            <a href="#workflow">Workflow</a>
            <a href="#principles">Positioning</a>
          </nav>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>JSON-native presentation workflows</p>
            <h1 className={styles.title}>
              让演示文稿从
              <span> 手工排版</span>
              回到可组合、可校验、可部署的工程资产。
            </h1>
            <p className={styles.lead}>
              Pipto 把 schema、renderer、parser、previewer 和 theme tools
              整合成一条结构化链路。你可以先定义内容，再决定如何预览、如何导出、如何反向解析和如何替换主题。
            </p>

            <div className={styles.ctaRow}>
              <a className={styles.primaryCta} href={playgroundHref}>
                Open Playground
              </a>
              <a className={styles.secondaryCta} href="#packages">
                Inspect The Stack
              </a>
            </div>

            <dl className={styles.metrics}>
              <div>
                <dt>Workspace Shape</dt>
                <dd>packages + apps</dd>
              </div>
              <div>
                <dt>Current Surface</dt>
                <dd>Landing + Playground</dd>
              </div>
              <div>
                <dt>Core Promise</dt>
                <dd>One JSON, multiple outputs</dd>
              </div>
            </dl>
          </div>

          <aside className={styles.signalPanel}>
            <div className={styles.panelHeader}>
              <p className={styles.panelEyebrow}>Current Architecture</p>
              <h2 className={styles.panelTitle}>One workspace, five engine rooms.</h2>
            </div>

            <ul className={styles.stackList}>
              {stackLines.map((item, index) => (
                <li key={item} className={styles.stackItem}>
                  <span className={styles.stackIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className={styles.pulseCard}>
              <p className={styles.pulseLabel}>Target domain</p>
              <p className={styles.pulseValue}>pipto.henryge.com</p>
              <p className={styles.pulseNote}>
                Root 负责品牌入口与 SEO，/playground 承接真实编辑器体验。
              </p>
            </div>
          </aside>
        </section>

        <section className={styles.section} id="packages">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionEyebrow}>Packages</p>
            <h2 className={styles.sectionTitle}>底层能力不再藏在 app 目录里</h2>
            <p className={styles.sectionLead}>
              每个 npm 包都围绕一类明确职责展开。website 负责解释它们，playground 负责把它们串成真实工作流。
            </p>
          </div>

          <div className={styles.packageGrid}>
            {packageCards.map((item) => (
              <article
                key={item.name}
                className={styles.packageCard}
                data-tone={item.tone}
              >
                <p className={styles.packageRole}>{item.role}</p>
                <h3 className={styles.packageName}>{item.name}</h3>
                <p className={styles.packageBody}>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="workflow">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionEyebrow}>Workflow</p>
            <h2 className={styles.sectionTitle}>不是一个 editor，而是一条完整演示链路</h2>
            <p className={styles.sectionLead}>
              landing page 需要传达的重点不是“有个编辑器”，而是这套工程能力为什么值得独立成产品。
            </p>
          </div>

          <div className={styles.workflowGrid}>
            {workflow.map((item) => (
              <article key={item.step} className={styles.workflowCard}>
                <p className={styles.workflowStep}>{item.step}</p>
                <h3 className={styles.workflowTitle}>{item.title}</h3>
                <p className={styles.workflowBody}>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="principles">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionEyebrow}>Positioning</p>
            <h2 className={styles.sectionTitle}>这版 website 先承担三件事</h2>
          </div>

          <div className={styles.principlesGrid}>
            {principles.map((item) => (
              <article key={item.title} className={styles.principleCard}>
                <p className={styles.principleLabel}>{item.label}</p>
                <h3 className={styles.principleTitle}>{item.title}</h3>
                <p className={styles.principleBody}>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.footerCta}>
          <div>
            <p className={styles.footerEyebrow}>Ready To Test The Flow</p>
            <h2 className={styles.footerTitle}>
              先从 Playground 验证真实交互，再逐步把文档、案例和品牌内容补到 website。
            </h2>
          </div>

          <div className={styles.footerActions}>
            <a className={styles.primaryCta} href={playgroundHref}>
              Launch Playground
            </a>
            <a
              className={styles.secondaryCta}
              href="https://github.com/gezhiheng/pipto"
              target="_blank"
              rel="noreferrer"
            >
              Repository
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
