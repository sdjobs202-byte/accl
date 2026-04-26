import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") redirect("/login");

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-gray-900 text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-gray-700">
          <p className="font-bold text-[#A92B2B] text-lg">ACCL</p>
          <p className="text-xs text-gray-400 mt-0.5">관리자 대시보드</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {[
            { href: "/admin", label: "대시보드" },
            { href: "/admin/exams", label: "시험 관리" },
            { href: "/admin/members", label: "회원 관리" },
            { href: "/admin/certificates", label: "자격증 관리" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-300">
            홈으로 돌아가기
          </Link>
        </div>
      </aside>
      <main className="flex-1 bg-gray-50 overflow-auto p-8">{children}</main>
    </div>
  );
}
