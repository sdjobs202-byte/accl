import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Award, BookOpen, Clock, PlayCircle } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">환영합니다, {session.user.name}님!</h1>
            <p className="text-gray-600">ACCL과 함께 당신의 AI 역량을 증명해 보세요.</p>
          </div>
          <div className="mt-6 md:mt-0">
            {/* If Admin, show Admin link */}
            {(session.user as any).role === "ADMIN" && (
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
                <Link href="/exam" className="text-sm text-[#A92B2B] font-medium hover:underline">
                  전체 보기
                </Link>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-100 rounded-xl p-5 hover:border-[#A92B2B]/30 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h3 className="font-bold text-gray-900">AI 리터러시 기본 과정</h3>
                    <p className="text-sm text-gray-500 mt-1">AI의 기본 개념과 툴 활용법 평가</p>
                    <div className="flex items-center text-xs text-gray-400 mt-2">
                      <Clock className="w-3 h-3 mr-1" /> 제한시간 30분
                      <span className="mx-2">•</span>
                      합격기준 70점
                    </div>
                  </div>
                  <Link href="/exam/1" className="mt-4 sm:mt-0 flex items-center bg-[#A92B2B]/10 text-[#A92B2B] hover:bg-[#A92B2B] hover:text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                    <PlayCircle className="w-4 h-4 mr-1" /> 응시하기
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* My Certificates */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Award className="w-5 h-5 text-[#A92B2B] mr-2" /> 내 수료증
              </h2>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-500 text-sm">아직 취득한 수료증이 없습니다.<br/>시험에 도전해보세요!</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
