import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  // 로그인 뒤 화면과 개인 수료증은 크롤러가 들어갈 자리가 아니다.
  const disallow = ['/admin/', '/admin', '/api/', '/dashboard', '/login', '/register', '/exam/', '/certificate/']
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },

      // AI 답변·검색 엔진은 들여보낸다 (AEO — 자격 문의 유치)
      { userAgent: 'OAI-SearchBot', allow: '/', disallow },
      { userAgent: 'ChatGPT-User', allow: '/', disallow },
      { userAgent: 'ClaudeBot', allow: '/', disallow },
      { userAgent: 'Claude-User', allow: '/', disallow },
      { userAgent: 'PerplexityBot', allow: '/', disallow },
      { userAgent: 'Perplexity-User', allow: '/', disallow },
      { userAgent: 'Google-Extended', allow: '/', disallow },
      { userAgent: 'Applebot', allow: '/', disallow },

      // 학습 전용 크롤러는 막는다
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'Amazonbot', disallow: '/' },
      { userAgent: 'meta-externalagent', disallow: '/' },
      { userAgent: 'Applebot-Extended', disallow: '/' },
    ],
    sitemap: 'https://accl.kr/sitemap.xml',
  }
}
