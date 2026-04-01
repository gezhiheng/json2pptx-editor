import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PackageDocPage as PackageDocView } from '../../doc-page'
import { getPackageDocByPathSlug, getPackageDocList } from '../../../../lib/package-docs'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams () {
  const docs = await getPackageDocList('en')
  return docs
    .filter((doc) => doc.pathSlug)
    .map((doc) => ({ slug: doc.pathSlug }))
}

export async function generateMetadata ({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = await getPackageDocByPathSlug(slug, 'en')

  if (!doc) {
    return {
      title: 'Documentation Not Found'
    }
  }

  return {
    title: `${doc.title} Docs`,
    description: doc.description
  }
}

export default async function PackageDocPage ({
  params
}: PageProps) {
  const { slug } = await params
  const doc = await getPackageDocByPathSlug(slug, 'en')

  if (!doc) notFound()

  return <PackageDocView doc={doc} locale='en' />
}
