import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { LogIn, LogOut, Menu, UserCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: "ACCL - AI 학습 및 자격증 센터",
  description: "AI 시대, 당신의 성장을 돕는 ACCL",
  openGraph: {
    title: "ACCL - AI 학습 및 자격증 센터",
    description: "AI 시대, 당신의 성장을 돕는 ACCL",
    siteName: "ACCL",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACCL - AI 학습 및 자격증 센터",
    description: "AI 시대, 당신의 성장을 돕는 ACCL",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#F9FAFB] text-gray-900`}>
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-[#A92B2B]">
                  ACCL.
                </Link>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden md:flex space-x-8 items-center">
                <Link href="/#about" className="text-gray-600 hover:text-[#A92B2B] font-medium transition-colors">About</Link>
                <Link href="/#ai-contents" className="text-gray-600 hover:text-[#A92B2B] font-medium transition-colors">AI Contents</Link>
                <Link href="/#reference" className="text-gray-600 hover:text-[#A92B2B] font-medium transition-colors">Reference</Link>
                <Link href="/#contact" className="text-gray-600 hover:text-[#A92B2B] font-medium transition-colors">Contact</Link>
                <Link href="/exam" className="text-gray-600 hover:text-[#A92B2B] font-medium transition-colors">자격증 테스트</Link>
                <Link href="/#contact" className="bg-[#A92B2B] text-white px-5 py-2.5 rounded-full font-medium hover:bg-[#8e2323] transition-colors">
                  문의하기
                </Link>
                <div className="border-l border-gray-200 h-6 mx-2"></div>
                
                {session ? (
                  <div className="flex items-center space-x-4">
                    <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-[#A92B2B] transition-colors">
                      <UserCircle className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">
                        {session.user?.name ? `${session.user.name}님 · ` : ""}마이페이지
                      </span>
                    </Link>
                    <Link href="/api/auth/signout" className="flex items-center text-gray-600 hover:text-[#A92B2B] transition-colors">
                      <LogOut className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">로그아웃</span>
                    </Link>
                  </div>
                ) : (
                  <Link href="/login" className="flex items-center text-gray-600 hover:text-[#A92B2B] transition-colors">
                    <LogIn className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">로그인</span>
                  </Link>
                )}
              </nav>

              {/* Mobile menu button */}
              <div className="flex md:hidden items-center">
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-2xl font-bold tracking-tighter text-white mb-4">ACCL.</h2>
                <p className="text-sm text-gray-400 max-w-md">
                  AI 시대, 새로운 기술의 막막함을 해소하고 여러분의 성장을 돕는 최적의 파트너가 되겠습니다.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">바로가기</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/#about" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/#ai-contents" className="hover:text-white transition-colors">AI Contents</Link></li>
                  <li><Link href="/exam" className="hover:text-white transition-colors">자격증 테스트</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://open.kakao.com/o/sywGHfti"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      카카오톡 1:1 오픈채팅
                    </a>
                  </li>
                  <li className="text-gray-500 text-xs break-all">open.kakao.com/o/sywGHfti</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
              <p>&copy; {new Date().getFullYear()} ACCL. All rights reserved.</p>
              <div className="space-x-4 mt-4 md:mt-0">
                <Link href="/terms" className="hover:text-white transition-colors">이용약관</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
