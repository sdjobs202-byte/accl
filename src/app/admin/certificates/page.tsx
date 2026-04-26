import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { issueDate: "desc" },
    include: {
      result: {
        include: {
          user: { select: { name: true, email: true } },
          exam: { select: { title: true } },
        },
      },
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">자격증 관리</h1>
        <span className="text-sm text-gray-500">총 {certificates.length}건</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">자격증 번호</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">수험자</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">시험명</th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">점수</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">발급일</th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">PDF</th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">자격증 보기</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {certificates.map((cert) => (
              <tr key={cert.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-gray-700 text-xs">
                  {cert.certificateNumber}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">{cert.result.user.name}</p>
                  <p className="text-xs text-gray-400">{cert.result.user.email}</p>
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-[160px] truncate">
                  {cert.result.exam.title}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {cert.result.score}점
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {cert.issueDate.toLocaleDateString("ko-KR")}
                </td>
                <td className="px-4 py-3 text-center">
                  {cert.pdfUrl ? (
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs hover:bg-blue-100"
                    >
                      다운로드
                    </a>
                  ) : (
                    <span className="text-gray-400 text-xs">미생성</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
                    href={`/certificate/${cert.id}`}
                    className="text-blue-500 hover:underline text-xs"
                  >
                    보기
                  </Link>
                </td>
              </tr>
            ))}
            {certificates.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  발급된 자격증이 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
