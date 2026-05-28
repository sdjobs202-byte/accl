"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

type Question = {
  id: string;
  text: string;
  options: string; // JSON string of string[]
};

type Exam = {
  id: string;
  title: string;
  description: string;
  passingScore?: number;
  questions: Question[];
};

type SubmitResult = {
  score: number;
  passed: boolean;
  certificateId: string | null;
  totalQuestions: number;
  correctCount: number;
  passingScore: number;
};

const CIRCUMFERENCE = 2 * Math.PI * 50; // 314.16

const OPT_NUM = ["①", "②", "③", "④", "⑤"];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function ExamClient({ exam }: { exam: Exam }) {
  const router = useRouter();

  const storageKey = `accl_exam_${exam.id}_state_v1`;

  const parsedQuestions = useMemo(
    () =>
      exam.questions.map((q) => ({
        id: q.id,
        text: q.text,
        options:
          typeof q.options === "string"
            ? (JSON.parse(q.options) as string[])
            : (q.options as unknown as string[]),
      })),
    [exam.questions]
  );

  const totalQ = parsedQuestions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [view, setView] = useState<"taking" | "result">("taking");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);

  // 로컬스토리지에서 진행 상태 복원
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers && typeof parsed.answers === "object") {
          setAnswers(parsed.answers);
        }
        if (typeof parsed.currentIndex === "number") {
          setCurrentIndex(Math.min(parsed.currentIndex, totalQ - 1));
        }
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 답안/현재 문제 변경 시 자동 저장
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ answers, currentIndex })
      );
    } catch {
      // ignore
    }
  }, [answers, currentIndex, storageKey]);

  // 키보드 네비게이션 (← / →)
  useEffect(() => {
    if (view !== "taking") return;
    const handler = (e: KeyboardEvent) => {
      if (showModal) {
        if (e.key === "Escape") setShowModal(false);
        return;
      }
      if (e.key === "ArrowLeft") {
        setCurrentIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((i) => Math.min(totalQ - 1, i + 1));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [view, showModal, totalQ]);

  // 결과 화면 진입 시 점수 카운트업 애니메이션
  useEffect(() => {
    if (view !== "result" || !result) return;
    setAnimatedScore(0);
    const duration = 1200;
    let start: number | null = null;
    let raf = 0;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = easeOutCubic(p);
      setAnimatedScore(Math.round(result.score * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [view, result]);

  const currentQ = parsedQuestions[currentIndex];
  const answeredCount = Object.keys(answers).filter((k) =>
    parsedQuestions.some((q) => q.id === k)
  ).length;
  const unansweredCount = totalQ - answeredCount;
  const progressPct = Math.round(((currentIndex + 1) / totalQ) * 100);

  const handleSelect = (option: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: option }));
  };

  const handleSave = () => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ answers, currentIndex })
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleSubmit = useCallback(async () => {
    setShowModal(false);
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/exam/${exam.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) throw new Error("submit failed");
      const data = await res.json();
      // 채점 결과 보강(서버가 일부 필드만 줄 수 있어 클라이언트에서 보완)
      const correctFromServer =
        typeof data.correctCount === "number"
          ? data.correctCount
          : Math.round((data.score / 100) * totalQ);
      const passingFromServer =
        typeof data.passingScore === "number"
          ? data.passingScore
          : exam.passingScore ?? 70;
      setResult({
        score: data.score,
        passed: data.passed,
        certificateId: data.certificateId ?? null,
        totalQuestions: totalQ,
        correctCount: correctFromServer,
        passingScore: passingFromServer,
      });
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
      setView("result");
    } catch {
      alert("제출에 실패했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  }, [answers, exam.id, exam.passingScore, storageKey, totalQ]);

  /* =========================================================
     결과 화면
     ========================================================= */
  if (view === "result" && result) {
    const wrong = result.totalQuestions - result.correctCount;
    const arcOffset =
      CIRCUMFERENCE - (CIRCUMFERENCE * animatedScore) / 100;
    const gradFrom = result.passed ? "#16a34a" : "#dc2626";
    const gradTo = result.passed ? "#22c55e" : "#f97316";

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 text-center">
            <div className="text-5xl mb-2">{result.passed ? "🏆" : "📝"}</div>
            <p className="text-sm font-semibold text-gray-500 mb-1">
              {exam.title}
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {result.passed
                ? "합격을 축하합니다! 🎉"
                : "아쉽지만 다음 기회에!"}
            </h2>

            {/* 점수 링 */}
            <div className="relative w-44 h-44 mx-auto mb-8">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <defs>
                  <linearGradient
                    id={`scoreGrad-${exam.id}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor={gradFrom} />
                    <stop offset="100%" stopColor={gradTo} />
                  </linearGradient>
                </defs>
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="10"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={arcOffset}
                  stroke={`url(#scoreGrad-${exam.id})`}
                  style={{ transition: "stroke-dashoffset 0.05s linear" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-gray-900 tabular-nums">
                  {animatedScore}
                </span>
                <span className="text-sm text-gray-500">점</span>
              </div>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-4 gap-2 bg-gray-50 rounded-xl p-4 mb-6 text-sm">
              <div>
                <div className="text-gray-500 mb-1">총 문항</div>
                <div className="font-bold text-gray-900">
                  {result.totalQuestions}
                </div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">정답</div>
                <div className="font-bold text-green-600">
                  {result.correctCount}
                </div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">오답</div>
                <div className="font-bold text-red-600">{wrong}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">합격 기준</div>
                <div className="font-bold text-gray-900">
                  {result.passingScore}점
                </div>
              </div>
            </div>

            {/* 합격/불합격 배지 */}
            <div className="mb-8">
              <span
                className={`inline-block px-6 py-2 rounded-full text-base font-bold ${
                  result.passed
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {result.passed ? "합격" : "불합격"}
              </span>
            </div>

            {/* 액션 버튼 */}
            <div className="flex flex-col sm:flex-row gap-3">
              {result.passed && result.certificateId ? (
                <button
                  onClick={() =>
                    router.push(`/certificate/${result.certificateId}`)
                  }
                  className="flex-1 bg-[#A92B2B] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#8B2020] transition-colors"
                >
                  수료증 보기
                </button>
              ) : null}
              <button
                onClick={() => router.push("/exams")}
                className={`flex-1 px-6 py-3 rounded-lg font-bold transition-colors ${
                  result.passed && result.certificateId
                    ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    : "bg-[#A92B2B] text-white hover:bg-[#8B2020]"
                }`}
              >
                자격 인증 센터로
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     응시 화면
     ========================================================= */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 바 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <button
            onClick={() => router.push("/exams")}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
            aria-label="자격 인증 센터로 돌아가기"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M11 4L6 9L11 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            자격 인증 센터
          </button>
          <div className="text-sm font-semibold text-gray-700 truncate">
            {exam.title}
          </div>
          <div className="text-sm text-gray-500 tabular-nums">
            {currentIndex + 1} / {totalQ}
          </div>
        </div>
        {/* 진행률 바 */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-[#A92B2B] transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* ====== 좌측: 문제 ====== */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="text-xs font-bold tracking-wider text-[#A92B2B] mb-2">
                문제 {currentIndex + 1}
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 leading-relaxed mb-6">
                {currentQ.text}
              </h2>
              <div className="space-y-3">
                {currentQ.options.map((opt, i) => {
                  const isSelected = answers[currentQ.id] === opt;
                  return (
                    <label
                      key={i}
                      className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? "bg-red-50 border-[#A92B2B] ring-2 ring-[#A92B2B]/20"
                          : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${currentQ.id}`}
                        value={opt}
                        checked={isSelected}
                        onChange={() => handleSelect(opt)}
                        className="sr-only"
                      />
                      <span
                        className={`flex-none w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                          isSelected
                            ? "bg-[#A92B2B] text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {OPT_NUM[i] ?? i + 1}
                      </span>
                      <span className="ml-4 text-gray-800 text-sm sm:text-base leading-relaxed">
                        {opt}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 네비게이션 */}
            <div className="mt-5 flex flex-col sm:flex-row items-stretch gap-3">
              <button
                onClick={() =>
                  setCurrentIndex((i) => Math.max(0, i - 1))
                }
                disabled={currentIndex === 0}
                className="px-5 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 3L5 8L10 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                이전 문제
              </button>
              <div className="flex-1 flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 px-5 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 flex items-center justify-center gap-1"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 3h8l2 2v8H3V3z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  저장
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex-1 px-5 py-3 bg-[#A92B2B] text-white rounded-lg font-bold hover:bg-[#8B2020]"
                >
                  제출하기
                </button>
              </div>
              <button
                onClick={() =>
                  setCurrentIndex((i) => Math.min(totalQ - 1, i + 1))
                }
                disabled={currentIndex === totalQ - 1}
                className="px-5 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1"
              >
                다음 문제
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* ====== 우측: 문제 현황 사이드바 ====== */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="font-bold text-gray-900 mb-3">문제 현황</div>
              <div className="grid grid-cols-6 lg:grid-cols-5 gap-2 mb-4">
                {parsedQuestions.map((q, i) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isCurrent = i === currentIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(i)}
                      aria-label={`${i + 1}번 문제로 이동`}
                      className={`aspect-square text-xs font-bold rounded-md border transition-all ${
                        isCurrent
                          ? "bg-[#A92B2B] text-white border-[#A92B2B] ring-2 ring-[#A92B2B]/30"
                          : isAnswered
                          ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                          : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <div className="space-y-1.5 text-xs text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded bg-green-200 border border-green-300" />
                  답변 완료
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded bg-[#A92B2B]" />
                  현재 문제
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded bg-gray-200 border border-gray-300" />
                  미답변
                </div>
              </div>
              <div className="pt-3 border-t border-gray-100 text-sm font-semibold text-gray-700">
                {answeredCount} / {totalQ} 답변 완료
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 px-1 leading-relaxed">
              💡 키보드 ← / → 로 이전/다음 문제로 이동할 수 있어요.
              <br />
              답안은 자동으로 저장됩니다.
            </p>
          </aside>
        </div>
      </div>

      {/* ====== 제출 확인 모달 ====== */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              테스트를 제출하시겠습니까?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              제출 후에는 답안을 수정할 수 없습니다.
            </p>
            {unansweredCount > 0 && (
              <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-lg px-4 py-3 text-sm mb-4">
                ⚠ 아직 <b>{unansweredCount}개</b>의 문제에 답하지
                않았습니다.
              </div>
            )}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-5 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-5 py-3 bg-[#A92B2B] text-white rounded-lg font-bold hover:bg-[#8B2020] disabled:opacity-50"
              >
                {isSubmitting ? "채점 중..." : "제출하기"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====== 저장 토스트 ====== */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white border border-gray-200 shadow-lg rounded-full px-5 py-2.5 text-sm font-medium text-gray-800 flex items-center gap-2 transition-all ${
          showToast
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle
            cx="9"
            cy="9"
            r="8"
            stroke="#16a34a"
            strokeWidth="1.5"
          />
          <path
            d="M5.5 9L8 11.5L12.5 6.5"
            stroke="#16a34a"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        답안이 저장되었습니다.
      </div>
    </div>
  );
}
