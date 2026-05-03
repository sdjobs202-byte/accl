import { supabaseAdmin } from "@/lib/supabase";
import Link from "next/link";

export default async function AdminPage() {
  const [
    { count: totalUsers },
    { count: totalExams },
    { count: totalResults },
    { count: totalCerts },
    { data: recentUsers },
    { data: recentCerts },
  ] = await Promise.all([
    supabaseAdmin.from("User").select("id", { count: "exact", head: true }).eq("role", "USER"),
    supabaseAdmin.from("Exam").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("Result").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("Certificate").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("User").select("id, name, email, createdAt").eq("role", "USER").order("createdAt", { ascending: false }).limit(5),
    supabaseAdmin.from("Certificate").select("id, issueDate, result:Result(user:User(name), exam:Exam(title))").order("issueDate", { ascending: false }).limit(5),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h1>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "전체 회원", value: totalUsers ?? 0, href: "/admin/members" },
          { label: "시험 종류", value: totalExams ?? 0, href: "/admin/exams" },
          { label: "총 응시 횟수", value: totalResults ?? 0, href: null },
          { label: "발급 자격증", value: totalCerts ?? 0, href: "/admin/certificates" },
        ].map(({ label, value, href }) => (
          <div key={label} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-3xl font-bold mt-2 text-gray-900">{value}</p>
            {href && (
              <Link href={href} className="text-xs text-blue-500 mt-2 block hover:underline">
                자세히 보기
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-700 mb-4">최근 가입 회원</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-left border-b">
                <th className="pb-2 font-medium">이름</th>
                <th className="pb-2 font-medium">이메일</th>
                <th className="pb-2 font-medium">가입일</th>
              </tr>
            </thead>
            <tbody>
              {(recentUsers ?? []).map((u: any) => (
                <tr key={u.id} className="border-b last:border-0">
                  <td className="py-2">{u.name}</td>
                  <td className="py-2 text-gray-500 text-xs">{u.email}</td>
                  <td className="py-2 text-gray-500">{new Date(u.createdAt).toLocaleDateString("ko-KR")}</td>
                </tr>
              ))}
              {(recentUsers ?? []).length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-400 text-xs">
                    가입 회원 없음
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-700 mb-4">최근 발급 자격증</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-left border-b">
                <th className="pb-2 font-medium">수험자</th>
                <th className="pb-2 font-medium">시험명</th>
                <th className="pb-2 font-medium">발급일</th>
              </tr>
            </thead>
            <tbody>
              {(recentCerts ?? []).map((c: any) => (
                <tr key={c.id} className="border-b last:border-0">
                  <td className="py-2">{c.result?.user?.name}</td>
                  <td className="py-2 text-gray-500 text-xs truncate max-w-[100px]">
                    {c.result?.exam?.title}
                  </td>
                  <td className="py-2 text-gray-500">{new Date(c.issueDate).toLocaleDateString("ko-KR")}</td>
                </tr>
              ))}
              {(recentCerts ?? []).length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-400 text-xs">
                    발급 자격증 없음
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
