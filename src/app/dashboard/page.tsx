import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Award, BookOpen, Clock, PlayCircle, CheckCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  // 1. 사용자 정보 및 결과(수료증 포함) 가져오기
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      results: {
        include: {
          exam: true,
          certificate: true,
        },
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!user) {
    redirect("/login");
  }

  // 2. 전체 시험 목록 가져오기
  const exams = await prisma.exam.findMany({
    orderBy: { createdAt: "desc" }
  });

  const passedResults = user.results.filter(r => r.passed);
  const certificates = passedResults.map(r => r.certificate).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">환영합니다, {session.user.name}님!</h1>
            <p className="text-gray-600">ACCL과 함께 당신의 AI 역량을 증명해 보세요.</p>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
            {user.role === "ADMIN" && (
              <Link href="/api/admin/seed-exam" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-bold transition-colors">
                [관리자] 시험 데이터 초기화
              </Link>
            )}
            {user.role === "ADMIN" && (
              <Link href="/admin" className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-bold transition-colors">
                관리자 페이지로 이동
              </Link>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Available Exams */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <BookOpen className="w-5 h-5 text-[#A92B2B] mr-2" /> 응시 가능한 자격증 시험
                </h2>
              </div>
              
              <div className="space-y-4">
                {exams.length === 0 ? (
                  <p className="text-gray-500 text-sm">등록된 시험이 없습니다.</p>
                ) : (
                  exams.map(exam => {
                    // 사용자가 해당 시험에 합격했는지 확인
                    const hasPassed = passedResults.some(r => r.examId === exam.id);
                    
                    return (
                      <div key={exam.id} className="border border-gray-100 rounded-xl p-5 hover:border-[#A92B2B]/30 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                          <h3 className="font-bold text-gray-900">{exam.title}</h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-1">{exam.description}</p>
                          <div className="flex items-center text-xs text-gray-400 mt-2">
                            <Clock className="w-3 h-3 mr-1" /> 합격기준: {exam.passingScore}점
                            <span className="mx-2">•</span>
                            상태: {hasPassed ? <span className="text-green-600 font-bold ml-1">합격</span> : "미응시/불합격"}
                          </div>
                        </div>
                        <Link href={`/exam/${exam.id}`} className="mt-4 sm:mt-0 flex items-center bg-[#A92B2B]/10 text-[#A92B2B] hover:bg-[#A92B2B] hover:text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm whitespace-nowrap ml-4">
                          <PlayCircle className="w-4 h-4 mr-1" /> {hasPassed ? "다시 응시하기" : "응시하기"}
                        </Link>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            {/* Exam Results History */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <CheckCircle className="w-5 h-5 text-[#A92B2B] mr-2" /> 내 응시 내역
              </h2>
              {user.results.length === 0 ? (
                <p className="text-gray-500 text-sm">응시 내역이 없습니다.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시험명</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">점수</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">결과</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">응시일</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {user.results.map(r => (
                        <tr key={r.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{r.exam.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.score}점</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {r.passed ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">합격</span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">불합격</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(r.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* My Certificates */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Award className="w-5 h-5 text-[#A92B2B] mr-2" /> 내 수료증
              </h2>
              {certificates.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-500 text-sm">아직 취득한 수료증이 없습니다.<br/>시험에 도전해보세요!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {certificates.map(cert => (
                    <div key={cert!.id} className="border border-[#A92B2B]/20 bg-red-50/30 rounded-xl p-4 text-center">
                      <Award className="w-8 h-8 text-[#A92B2B] mx-auto mb-2" />
                      <p className="font-bold text-sm text-gray-900 mb-1">{cert!.certificateNumber}</p>
                      <p className="text-xs text-gray-500 mb-3">발급일: {new Date(cert!.issueDate).toLocaleDateString()}</p>
                      <Link href={`/certificate/${cert!.id}`} className="inline-block bg-[#A92B2B] text-white text-xs px-4 py-2 rounded-lg font-medium hover:bg-red-800 transition-colors">
                        수료증 보기
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
