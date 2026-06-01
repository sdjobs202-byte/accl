"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type CertRow = {
  id: string;
  certificateNumber: string;
  issueDate: string;
  pdfUrl: string | null;
  result: {
    score: number;
    user: { name: string | null; email: string | null } | null;
    exam: { title: string | null } | null;
  } | null;
};

function getCertKey(title: string | null | undefined): string {
  if (!title) return "기타";
  if (/AIMC.*2/i.test(title)) return "AIMC 2급";
  if (/AIMC.*1/i.test(title)) return "AIMC 1급";
  if (/AITC/i.test(title)) return "AITC";
  return title.split(/\s+/)[0] ?? "기타";
}

type SortKey =
  | "issueDate-desc"
  | "issueDate-asc"
  | "number-asc"
  | "number-desc"
  | "score-desc";

export default function CertificatesTable({
  certificates,
}: {
  certificates: CertRow[];
}) {
  const [certFilter, setCertFilter] = useState<string>("ALL");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("issueDate-desc");

  const certOptions = useMemo(() => {
    const set = new Set<string>();
    certificates.forEach((c) => set.add(getCertKey(c.result?.exam?.title)));
    return ["ALL", ...Array.from(set)];
  }, [certificates]);

  const filtered = useMemo(() => {
    let arr = certificates.filter((c) => {
      const matchCert =
        certFilter === "ALL" ||
        getCertKey(c.result?.exam?.title) === certFilter;
      const q = query.trim().toLowerCase();
      const haystack =
        `${c.certificateNumber} ${c.result?.user?.name ?? ""} ${
          c.result?.user?.email ?? ""
        } ${c.result?.exam?.title ?? ""}`.toLowerCase();
      const matchQuery = !q || haystack.includes(q);
      return matchCert && matchQuery;
    });

    arr = [...arr].sort((a, b) => {
      switch (sortKey) {
        case "issueDate-desc":
          return (
            new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
          );
        case "issueDate-asc":
          return (
            new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime()
          );
        case "number-asc":
          return a.certificateNumber.localeCompare(b.certificateNumber);
        case "number-desc":
          return b.certificateNumber.localeCompare(a.certificateNumber);
        case "score-desc":
          return (b.result?.score ?? 0) - (a.result?.score ?? 0);
      }
    });
    return arr;
  }, [certificates, certFilter, query, sortKey]);

  // CSV 다운로드
  const handleDownload = () => {
    const rows = [
      [
        "자격증 번호",
        "수험자명",
        "이메일",
        "시험명",
        "자격증 종류",
        "점수",
        "발급일",
      ],
      ...filtered.map((c) => [
        c.certificateNumber,
        c.result?.user?.name ?? "",
        c.result?.user?.email ?? "",
        c.result?.exam?.title ?? "",
        getCertKey(c.result?.exam?.title),
        String(c.result?.score ?? ""),
        new Date(c.issueDate).toISOString().slice(0, 10),
      ]),
    ];
    const csv = rows
      .map((r) =>
        r
          .map((cell) =>
            /[",\n]/.test(cell) ? `"${cell.replace(/"/g, '""')}"` : cell
          )
          .join(",")
      )
      .join("\n");
    const blob = new Blob(["﻿" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `자격증발급내역_${
      certFilter === "ALL" ? "전체" : certFilter
    }_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">자격증 관리</h1>
          <p className="text-xs text-gray-500 mt-1">
            총 {certificates.length}건 · 필터 결과 {filtered.length}건
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="번호·이름·이메일 검색"
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
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#A92B2B]/30"
          >
            <option value="issueDate-desc">발급일 ↓</option>
            <option value="issueDate-asc">발급일 ↑</option>
            <option value="number-asc">번호 ↑</option>
            <option value="number-desc">번호 ↓</option>
            <option value="score-desc">점수 ↓</option>
          </select>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-red-50 text-[#A92B2B] border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100"
          >
            ⬇ CSV 다운로드
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">
                자격증 번호
              </th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">
                수험자
              </th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">
                시험명
              </th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">
                종류
              </th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">
                점수
              </th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">
                발급일
              </th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">
                PDF
              </th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">
                자격증 보기
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((cert) => (
              <tr key={cert.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-gray-700 text-xs">
                  {cert.certificateNumber}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">{cert.result?.user?.name}</p>
                  <p className="text-xs text-gray-400">
                    {cert.result?.user?.email}
                  </p>
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-[160px] truncate">
                  {cert.result?.exam?.title}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-red-50 text-[#A92B2B] rounded text-xs font-bold">
                    {getCertKey(cert.result?.exam?.title)}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {cert.result?.score}점
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(cert.issueDate).toLocaleDateString("ko-KR")}
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
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  조건에 해당하는 자격증이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
