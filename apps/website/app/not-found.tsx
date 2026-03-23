import styles from './page.module.css'

export default function NotFound () {
  return (
    <main className={styles.page}>
      <div className={styles.pageGlow} aria-hidden="true" />
      <div className={styles.shell}>
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaGlow} aria-hidden="true" />
            <div className={styles.ctaContent}>
              <h2>页面不存在</h2>
              <p>你访问的内容可能已经移动，或者当前地址本身就是无效链接。</p>
              <div className={styles.ctaActions}>
                <a className={styles.primaryButton} href='/'>
                  返回首页
                </a>
                <a className={styles.secondaryButton} href='/playground'>
                  打开 Playground
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
