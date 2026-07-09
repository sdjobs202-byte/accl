"use client";

import { useState } from "react";

export default function SeedExamsButton() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function seed() {
    if (
      !confirm(
        "자격 시험 3종(AIMC 2급 / AIMC 1급 / AITC)을 시드합니다.\n기존 시험은 삭제되지 않으며, 여러 번 실행해도 안전합니다. 계속할까요?"
      )
    )
      return;

    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/seed-exam", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "시드 실패");
      setMsg(`✅ ${data.message} (문항 ${data.questionCount}개)`);
    } catch (e: any) {
      setMsg(`❌ ${e?.message ?? "시드 실패"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center md:items-end gap-1">
      <button
        onClick={seed}
        disabled={loading}
        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-bold transition-colors disabled:opacity-50"
      >
        {loading ? "시드 중…" : "[관리자] 자격시험 3종 시드"}
      </button>
      {msg && <span className="text-xs text-gray-600 max-w-[240px] text-right">{msg}</span>}
    </div>
  );
}
