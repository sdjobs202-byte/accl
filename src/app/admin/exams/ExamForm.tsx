"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

interface ExamFormData {
  title: string;
  description: string;
  passingScore: number;
  examDate: string;
  questions: Question[];
}

interface ExamFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string;
    passingScore: number;
    examDate: string | null;
    questions: Array<{
      id: string;
      text: string;
      options: string[];
      correctAnswer: string;
    }>;
  };
}

const emptyQuestion = (): Question => ({
  text: "",
  options: ["", "", "", ""],
  correctAnswer: "",
});

export default function ExamForm({ initialData }: ExamFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ExamFormData>({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    passingScore: initialData?.passingScore ?? 60,
    examDate: initialData?.examDate ?? "",
    questions: initialData?.questions?.map((q) => ({
      text: q.text,
      options: q.options,
      correctAnswer: q.correctAnswer,
    })) ?? [emptyQuestion()],
  });

  const updateQuestion = (index: number, field: keyof Question, value: string | string[]) => {
    const updated = [...form.questions];
    updated[index] = { ...updated[index], [field]: value };
    setForm((p) => ({ ...p, questions: updated }));
  };

  const updateOption = (qIdx: number, optIdx: number, value: string) => {
    const updated = [...form.questions];
    const oldOpt = updated[qIdx].options[optIdx];
    const options = [...updated[qIdx].options];
    options[optIdx] = value;
    const newCorrect = updated[qIdx].correctAnswer === oldOpt ? value : updated[qIdx].correctAnswer;
    updated[qIdx] = { ...updated[qIdx], options, correctAnswer: newCorrect };
    setForm((p) => ({ ...p, questions: updated }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    for (const q of form.questions) {
      if (!q.correctAnswer) {
        alert("모든 문제의 정답을 선택해주세요");
        return;
      }
    }
    setLoading(true);
    const method = initialData ? "PUT" : "POST";
    const url = initialData ? `/api/admin/exams/${initialData.id}` : "/api/admin/exams";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin/exams");
      router.refresh();
    } else {
      alert("저장에 실패했습니다");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-gray-700">기본 정보</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">시험명</label>
          <input
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A92B2B]"
            required
            placeholder="예: AI 프롬프트 엔지니어링 1급"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A92B2B]"
            rows={3}
            placeholder="시험에 대한 설명을 입력하세요"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">합격 기준 점수</label>
            <input
              type="number"
              value={form.passingScore}
              onChange={(e) => setForm((p) => ({ ...p, passingScore: parseInt(e.target.value) }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A92B2B]"
              min={0}
              max={100}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">시험 날짜</label>
            <input
              type="date"
              value={form.examDate}
              onChange={(e) => setForm((p) => ({ ...p, examDate: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A92B2B]"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-700">문제 목록 ({form.questions.length}문제)</h2>
          <button
            type="button"
            onClick={() => setForm((p) => ({ ...p, questions: [...p.questions, emptyQuestion()] }))}
            className="text-sm text-[#A92B2B] hover:underline font-medium"
          >
            + 문제 추가
          </button>
        </div>

        {form.questions.map((q, qIdx) => (
          <div key={qIdx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700">{qIdx + 1}번 문제</h3>
              {form.questions.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setForm((p) => ({
                      ...p,
                      questions: p.questions.filter((_, i) => i !== qIdx),
                    }))
                  }
                  className="text-xs text-red-500 hover:underline"
                >
                  삭제
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">문제</label>
              <input
                value={q.text}
                onChange={(e) => updateQuestion(qIdx, "text", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A92B2B]"
                required
                placeholder="문제 내용을 입력하세요"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                보기 <span className="text-gray-400 font-normal">(정답 앞 라디오 버튼 선택)</span>
              </label>
              {q.options.map((opt, optIdx) => (
                <div key={optIdx} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={`correct-${qIdx}`}
                    checked={q.correctAnswer !== "" && q.correctAnswer === opt}
                    onChange={() => opt && updateQuestion(qIdx, "correctAnswer", opt)}
                    className="accent-[#A92B2B]"
                  />
                  <input
                    value={opt}
                    onChange={(e) => updateOption(qIdx, optIdx, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A92B2B]"
                    placeholder={`보기 ${optIdx + 1}`}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 pb-8">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-[#A92B2B] text-white rounded-lg text-sm font-medium hover:bg-[#8B2020] disabled:opacity-50"
        >
          {loading ? "저장 중..." : initialData ? "수정 완료" : "시험 등록"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
        >
          취소
        </button>
      </div>
    </form>
  );
}
