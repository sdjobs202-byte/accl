import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if ((session.user as any).role !== "ADMIN") redirect("/dashboard");

  const { count: newInquiryCount } = await supabaseAdmin
    .from("Inquiry")
    .select("id", { count: "exact", head: true })
    .eq("status", "NEW");

  const navItems = [
    { href: "/admin", label: "대시보드" },
    { href: "/admin/exams", label: "시험 관리" },
    { href: "/admin/members", label: "회원 관리" },
    { href: "/admin/certificates", label: "자격증 관리" },
    { href: "/admin/inquiries", label: "문의 관리", badge: newInquiryCount ?? 0 },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-gray-900 text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-gray-700">
          <p className="font-bold text-[#A92B2B] text-lg">ACCL</p>
          <p className="text-xs text-gray-400 mt-0.5">관리자 대시보드</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(({ href, label, badge }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <span>{label}</span>
              {badge ? (
                <span className="bg-[#A92B2B] text-white text-[10px] font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center">
                  {badge}
                </span>
              ) : null}
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
