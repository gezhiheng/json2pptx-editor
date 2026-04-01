import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PackageDocPage as PackageDocView } from '../../doc-page'
import { getPackageDoc } from '../../../../lib/package-docs'

export async function generateMetadata (): Promise<Metadata> {
  const doc = await getPackageDoc('overview', 'zh')

  if (!doc) {
    return {
      title: '文档不存在'
    }
  }

  return {
    title: `${doc.title} 文档`,
    description: doc.description
  }
}

export default async function DocsChineseIndexPage () {
  const doc = await getPackageDoc('overview', 'zh')

  if (!doc) notFound()

  return <PackageDocView doc={doc} locale='zh' />
}
