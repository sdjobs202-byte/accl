"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExamClient({ exam }: { exam: any }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (questionId: string, option: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < exam.questions.length) {
      alert("모든 문항에 답안을 선택해 주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/exam/${exam.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
      });

      if (!res.ok) {
        throw new Error("채점 중 오류가 발생했습니다.");
      }

      const result = await res.json();

      alert(`시험이 완료되었습니다! 점수: ${result.score}점 (${result.passed ? '합격' : '불합격'})`);
      if (result.passed && result.certificateId) {
        router.push(`/certificate/${result.certificateId}`);
      } else {
        router.push("/dashboard");
      }
      router.refresh();
      
    } catch (error) {
      alert("제출에 실패했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="border-b pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{exam.title}</h1>
            <p className="text-gray-600 leading-relaxed">{exam.description}</p>
          </div>

          <div className="space-y-8">
            {exam.questions.map((q: any, index: number) => {
              const options = JSON.parse(q.options);
              return (
                <div key={q.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {index + 1}. {q.text}
                  </h3>
                  <div className="space-y-3">
                    {options.map((opt: string, i: number) => (
                      <label 
                        key={i} 
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                          answers[q.id] === opt 
                            ? 'bg-red-50 border-[#A92B2B]' 
                            : 'bg-white border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={opt}
                          checked={answers[q.id] === opt}
                          onChange={() => handleSelect(q.id, opt)}
                          className="h-4 w-4 text-[#A92B2B] focus:ring-[#A92B2B] border-gray-300"
                        />
                        <span className="ml-3 text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#A92B2B] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition-colors duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "채점 중..." : "답안 제출하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
