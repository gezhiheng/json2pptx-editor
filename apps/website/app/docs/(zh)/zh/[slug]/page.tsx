import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PackageDocPage as PackageDocView } from '../../../doc-page'
import { getPackageDocByPathSlug, getPackageDocList } from '../../../../../lib/package-docs'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams () {
  const docs = await getPackageDocList('zh')
  return docs
    .filter((doc) => doc.pathSlug)
    .map((doc) => ({ slug: doc.pathSlug }))
}

export async function generateMetadata ({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = await getPackageDocByPathSlug(slug, 'zh')

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

export default async function PackageDocChinesePage ({
  params
}: PageProps) {
  const { slug } = await params
  const doc = await getPackageDocByPathSlug(slug, 'zh')

  if (!doc) notFound()

  return <PackageDocView doc={doc} locale='zh' />
}
