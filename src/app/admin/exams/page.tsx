import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ExamActions from "./ExamActions";

export default async function ExamsPage() {
  const exams = await prisma.exam.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { questions: true, results: true } },
      results: { select: { passed: true } },
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">시험 관리</h1>
        <Link
          href="/admin/exams/new"
          className="px-4 py-2 bg-[#A92B2B] text-white rounded-lg text-sm font-medium hover:bg-[#8B2020]"
        >
          + 시험 추가
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">시험명</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">시험일</th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">문항 수</th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">합격 점수</th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">응시자</th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">합격률</th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {exams.map((exam) => {
              const passRate =
                exam.results.length > 0
                  ? Math.round(
                      (exam.results.filter((r) => r.passed).length / exam.results.length) * 100
                    )
                  : null;
              return (
                <tr key={exam.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{exam.title}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {exam.examDate
                      ? exam.examDate.toLocaleDateString("ko-KR")
                      : "미설정"}
                  </td>
                  <td className="px-4 py-3 text-center">{exam._count.questions}문항</td>
                  <td className="px-4 py-3 text-center">{exam.passingScore}점</td>
                  <td className="px-4 py-3 text-center">{exam._count.results}명</td>
                  <td className="px-4 py-3 text-center">
                    {passRate !== null ? (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          passRate >= 50
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {passRate}%
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <ExamActions examId={exam.id} />
                  </td>
                </tr>
              );
            })}
            {exams.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  등록된 시험이 없습니다. 시험을 추가해주세요.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
