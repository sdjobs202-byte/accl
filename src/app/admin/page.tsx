import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  const [totalUsers, totalExams, totalResults, totalCerts, recentUsers, recentCerts] =
    await Promise.all([
      prisma.user.count({ where: { role: "USER" } }),
      prisma.exam.count(),
      prisma.result.count(),
      prisma.certificate.count(),
      prisma.user.findMany({
        where: { role: "USER" },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, email: true, createdAt: true },
      }),
      prisma.certificate.findMany({
        orderBy: { issueDate: "desc" },
        take: 5,
        include: {
          result: {
            include: {
              user: { select: { name: true } },
              exam: { select: { title: true } },
            },
          },
        },
      }),
    ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h1>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "전체 회원", value: totalUsers, href: "/admin/members" },
          { label: "시험 종류", value: totalExams, href: "/admin/exams" },
          { label: "총 응시 횟수", value: totalResults, href: null },
          { label: "발급 자격증", value: totalCerts, href: "/admin/certificates" },
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
              {recentUsers.map((u) => (
                <tr key={u.id} className="border-b last:border-0">
                  <td className="py-2">{u.name}</td>
                  <td className="py-2 text-gray-500 text-xs">{u.email}</td>
                  <td className="py-2 text-gray-500">{u.createdAt.toLocaleDateString("ko-KR")}</td>
                </tr>
              ))}
              {recentUsers.length === 0 && (
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
              {recentCerts.map((c) => (
                <tr key={c.id} className="border-b last:border-0">
                  <td className="py-2">{c.result.user.name}</td>
                  <td className="py-2 text-gray-500 text-xs truncate max-w-[100px]">
                    {c.result.exam.title}
                  </td>
                  <td className="py-2 text-gray-500">{c.issueDate.toLocaleDateString("ko-KR")}</td>
                </tr>
              ))}
              {recentCerts.length === 0 && (
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
