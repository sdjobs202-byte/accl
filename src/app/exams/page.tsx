import { supabaseAdmin } from "@/lib/supabase";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

// 자격증 약어 추출 (DB title에서 첫 단어를 약어로 사용)
function getAbbr(title: string): string {
  const match = title.match(/^([A-Z]+(?:\s?\d+급)?)/);
  if (match) return match[1].trim();
  return title.split(/\s+/)[0] ?? title;
}

function getIcon(abbr: string): string {
  if (abbr.includes("2급")) return "🥈";
  if (abbr.includes("1급")) return "🥇";
  if (abbr.includes("AITC")) return "🎓";
  return "📚";
}

export default async function ExamsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const [{ data: user }, { data: exams }] = await Promise.all([
    supabaseAdmin
      .from("User")
      .select("id, email, results:Result(id, examId, score, passed)")
      .eq("email", session.user.email)
      .single(),
    supabaseAdmin
      .from("Exam")
      .select("id, title, description, passingScore, questions:Question(id)")
      .order("createdAt", { ascending: true }),
  ]);

  if (!user) {
    redirect("/login");
  }

  const results = (user.results as any[]) ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-block px-3 py-1 bg-red-50 text-[#A92B2B] rounded-full text-xs font-semibold mb-4">
            공인 자격 인증 시험
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            AI 커리어 콘텐츠 연구소
            <br />
            자격 인증 센터
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            아래 자격 시험 중 하나를 선택하여 응시하세요.
            <br />각 시험은 독립적으로 관리되며 언제든지 이어서 응시할 수 있습니다.
          </p>
        </div>
      </section>

      {/* 카드 그리드 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {(exams ?? []).length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <p className="text-gray-500">등록된 시험이 없습니다.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(exams ?? []).map((exam: any) => {
              const abbr = getAbbr(exam.title);
              const icon = getIcon(abbr);
              const totalQ = exam.questions?.length ?? 0;
              const examResults = results.filter(
                (r: any) => r.examId === exam.id
              );
              const bestResult = examResults.reduce(
                (best: any, r: any) =>
                  !best || r.score > best.score ? r : best,
                null
              );
              const hasPassed = examResults.some((r: any) => r.passed);
              const status: "passed" | "tried" | "new" = hasPassed
                ? "passed"
                : bestResult
                ? "tried"
                : "new";

              const statusLabel =
                status === "passed"
                  ? "합격"
                  : status === "tried"
                  ? "응시 기록 있음"
                  : "미응시";
              const statusClass =
                status === "passed"
                  ? "bg-green-100 text-green-700"
                  : status === "tried"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-gray-100 text-gray-600";

              const btnLabel =
                status === "passed"
                  ? "다시 응시하기"
                  : status === "tried"
                  ? "다시 도전하기"
                  : "응시 시작";

              return (
                <div
                  key={exam.id}
                  className={`relative bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow flex flex-col ${
                    status === "passed" ? "ring-1 ring-green-200" : ""
                  }`}
                >
                  {status === "passed" && (
                    <div className="absolute top-4 right-4 text-xs font-bold text-green-600">
                      ✔ 합격
                    </div>
                  )}
                  <div className="text-4xl mb-3">{icon}</div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-red-50 text-[#A92B2B] rounded text-xs font-bold">
                      {abbr}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${statusClass}`}
                    >
                      {statusLabel}
                    </span>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {exam.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {exam.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">📋</span>
                      총 {totalQ}문제
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">🎯</span>
                      합격 {exam.passingScore}점
                    </div>
                  </div>
                  {bestResult && (
                    <div className="bg-gray-50 rounded-lg px-3 py-2 mb-4 text-xs flex items-center justify-between">
                      <span className="text-gray-500">최고 점수</span>
                      <span
                        className={`font-bold ${
                          hasPassed ? "text-green-600" : "text-gray-700"
                        }`}
                      >
                        {bestResult.score}점
                      </span>
                    </div>
                  )}
                  <Link
                    href={`/exam/${exam.id}`}
                    className="mt-auto flex items-center justify-center gap-1 px-4 py-3 bg-[#A92B2B] text-white rounded-lg font-bold text-sm hover:bg-[#8B2020] transition-colors"
                  >
                    {btnLabel}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 3L11 8L6 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* INFO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-gray-100 flex items-start gap-3">
            <div className="text-2xl">📋</div>
            <div>
              <div className="font-bold text-gray-900 text-sm mb-1">
                객관식 4지선다
              </div>
              <div className="text-xs text-gray-500 leading-relaxed">
                모든 문제는 객관식 4지선다 형식입니다.
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100 flex items-start gap-3">
            <div className="text-2xl">💾</div>
            <div>
              <div className="font-bold text-gray-900 text-sm mb-1">
                자동 저장
              </div>
              <div className="text-xs text-gray-500 leading-relaxed">
                답안이 자동으로 저장되어 나중에 이어볼 수 있습니다.
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100 flex items-start gap-3">
            <div className="text-2xl">🏆</div>
            <div>
              <div className="font-bold text-gray-900 text-sm mb-1">
                즉시 결과 확인
              </div>
              <div className="text-xs text-gray-500 leading-relaxed">
                제출 후 점수와 합격 여부를 바로 확인할 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
