import type { ReactNode } from 'react'
import './fumadocs.css'

type LayoutProps = {
  children: ReactNode
}

export default function DocsRootLayout ({
  children
}: LayoutProps) {
  return children
}
