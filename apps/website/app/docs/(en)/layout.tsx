import type { ReactNode } from 'react'
import { DocsShell } from '../docs-shell'
import { getDocsTree } from '../../../lib/package-docs'

type LayoutProps = {
  children: ReactNode
}

export default async function EnglishDocsLayout ({
  children
}: LayoutProps) {
  const tree = await getDocsTree('en')

  return <DocsShell tree={tree}>{children}</DocsShell>
}
