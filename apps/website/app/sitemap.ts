import type { MetadataRoute } from 'next'
import { getPackageDocList } from '../lib/package-docs'

export const dynamic = 'force-static'

export default async function sitemap (): Promise<MetadataRoute.Sitemap> {
  const docs = await getPackageDocList()
  const lastModified = new Date()

  return [
    {
      url: 'https://pipto.henryge.com',
      lastModified,
      changeFrequency: 'weekly',
      priority: 1
    },
    ...docs.map((doc) => ({
      url: `https://pipto.henryge.com/docs/${doc.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    })),
    ...docs
      .filter((doc) => doc.hasChineseReadme && doc.hasEnglishReadme)
      .map((doc) => ({
        url: `https://pipto.henryge.com/docs/${doc.slug}/en`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6
      }))
  ]
}
