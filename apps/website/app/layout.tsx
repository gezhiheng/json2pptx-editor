import type { Metadata } from 'next'
import { Cormorant_Garamond, Noto_Sans_SC } from 'next/font/google'
import type { ReactNode } from 'react'
import './globals.css'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700']
})

const body = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '700']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pipto.henryge.com'),
  title: {
    default: 'Pipto | JSON 驱动的演示文稿工作流',
    template: '%s | Pipto'
  },
  description:
    'Pipto 将 schema、PPTX 导出、PPTX 解析、浏览器预览和主题替换组织成一条结构化演示文稿工作流。',
  keywords: [
    'Pipto',
    'json2pptx',
    'ppt2json',
    'presentation workflow',
    'PPTX automation',
    '演示文稿自动化'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Pipto | JSON 驱动的演示文稿工作流',
    description:
      '从 JSON schema 到 PPTX 导出、主题替换和浏览器预览，Pipto 让演示文稿成为可组合的工程资产。',
    url: 'https://pipto.henryge.com',
    siteName: 'Pipto',
    type: 'website',
    locale: 'zh_CN'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pipto | JSON 驱动的演示文稿工作流',
    description:
      '结构化定义内容，稳定生成 PPTX，在浏览器里预览并改造主题。'
  }
}

export default function RootLayout ({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  )
}
