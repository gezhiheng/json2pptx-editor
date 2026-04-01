import type { ReactNode } from 'react'
import { DocsShell } from '../../docs-shell'
import { getDocsTree } from '../../../../lib/package-docs'

type LayoutProps = {
  children: ReactNode
}

export default async function ChineseDocsLayout ({
  children
}: LayoutProps) {
  const tree = await getDocsTree('zh')

  return <DocsShell tree={tree}>{children}</DocsShell>
}
