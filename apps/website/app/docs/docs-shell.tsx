import type { ReactNode } from 'react'
import type { PageTree } from 'fumadocs-core/server'
import { DocsLayout as FumadocsDocsLayout } from 'fumadocs-ui/layouts/docs'

type DocsShellProps = {
  tree: PageTree.Root
  children: ReactNode
}

export function DocsShell ({
  tree,
  children
}: DocsShellProps) {
  return (
    <FumadocsDocsLayout
      tree={tree}
      githubUrl='https://github.com/gezhiheng/pipto'
      nav={{
        title: (
          <span className='inline-flex items-center gap-2.5'>
            <img className='h-6 w-6 shrink-0' src='/favicon.svg' alt='' aria-hidden='true' />
            <span className='font-semibold tracking-[-0.01em]'>Pipto Docs</span>
          </span>
        ),
        url: '/docs'
      }}
      searchToggle={{
        enabled: false
      }}
      themeSwitch={{
        enabled: false
      }}
    >
      {children}
    </FumadocsDocsLayout>
  )
}
