import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const BASE = 'https://accl.kr'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE}/certifications`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/exams`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]
}
