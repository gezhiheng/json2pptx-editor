import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PackageDocPage as PackageDocView } from '../doc-page'
import { getPackageDoc } from '../../../lib/package-docs'

export async function generateMetadata (): Promise<Metadata> {
  const doc = await getPackageDoc('overview', 'en')

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

export default async function DocsIndexPage () {
  const doc = await getPackageDoc('overview', 'en')

  if (!doc) notFound()

  return <PackageDocView doc={doc} locale='en' />
}
