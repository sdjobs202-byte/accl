"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ExamActions from "./ExamActions";

type ExamRow = {
  id: string;
  title: string;
  examDate: string | null;
  passingScore: number;
  questions: { id: string }[];
  results: { id: string; passed: boolean }[];
};

function getCertKey(title: string): string {
  if (/AIMC.*2/i.test(title)) return "AIMC 2급";
  if (/AIMC.*1/i.test(title)) return "AIMC 1급";
  if (/AITC/i.test(title)) return "AITC";
  return title.split(/\s+/)[0] ?? "기타";
}

export default function ExamsTable({ exams }: { exams: ExamRow[] }) {
  const [certFilter, setCertFilter] = useState<string>("ALL");
  const [query, setQuery] = useState("");

  const certOptions = useMemo(() => {
    const set = new Set<string>();
    exams.forEach((e) => set.add(getCertKey(e.title)));
    return ["ALL", ...Array.from(set)];
  }, [exams]);

  const filtered = useMemo(() => {
    return exams.filter((e) => {
      const matchCert =
        certFilter === "ALL" || getCertKey(e.title) === certFilter;
      const q = query.trim().toLowerCase();
      const matchQuery = !q || e.title.toLowerCase().includes(q);
      return matchCert && matchQuery;
    });
  }, [exams, certFilter, query]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">시험 관리</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="시험명 검색"
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A92B2B]/30"
          />
          <select
            value={certFilter}
            onChange={(e) => setCertFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#A92B2B]/30"
          >
            {certOptions.map((c) => (
              <option key={c} value={c}>
                {c === "ALL" ? "전체 자격증" : c}
              </option>
            ))}
          </select>
          <Link
            href="/admin/exams/new"
            className="px-4 py-2 bg-[#A92B2B] text-white rounded-lg text-sm font-medium hover:bg-[#8B2020] text-center whitespace-nowrap"
          >
            + 시험 추가
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">
                시험명
              </th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">
                시험일
              </th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">
                문항 수
              </th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">
                합격 점수
              </th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">
                응시자
              </th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">
                합격률
              </th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((exam) => {
              const passRate =
                exam.results.length > 0
                  ? Math.round(
                      (exam.results.filter((r) => r.passed).length /
                        exam.results.length) *
                        100
                    )
                  : null;
              return (
                <tr key={exam.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{exam.title}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {exam.examDate
                      ? new Date(exam.examDate).toLocaleDateString("ko-KR")
                      : "미설정"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {exam.questions.length}문항
                  </td>
                  <td className="px-4 py-3 text-center">
                    {exam.passingScore}점
                  </td>
                  <td className="px-4 py-3 text-center">
                    {exam.results.length}명
                  </td>
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
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  조건에 해당하는 시험이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
