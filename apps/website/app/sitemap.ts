import type { MetadataRoute } from 'next'
import { getPackageDocList } from '../lib/package-docs'

export const dynamic = 'force-static'

export default async function sitemap (): Promise<MetadataRoute.Sitemap> {
  const englishDocs = await getPackageDocList('en')
  const chineseDocs = await getPackageDocList('zh')
  const lastModified = new Date()

  return [
    {
      url: 'https://pipto.henryge.com',
      lastModified,
      changeFrequency: 'weekly',
      priority: 1
    },
    ...englishDocs.map((doc) => ({
      url: `https://pipto.henryge.com${doc.url}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    })),
    ...chineseDocs.map((doc) => ({
      url: `https://pipto.henryge.com${doc.url}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }))
  ]
}
