"use client";

import { useState } from "react";

export default function ContactForm() {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.error ?? "발송 실패");
      setStatus("ok");
      setData({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(err.message ?? "발송 중 오류가 발생했습니다.");
      setStatus("error");
    }
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
        <input
          type="text"
          required
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A92B2B] focus:border-transparent outline-none"
          placeholder="홍길동"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
        <input
          type="email"
          required
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A92B2B] focus:border-transparent outline-none"
          placeholder="example@email.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>
        <textarea
          rows={4}
          required
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A92B2B] focus:border-transparent outline-none"
          placeholder="문의하실 내용을 입력해주세요."
        />
      </div>

      {status === "ok" && (
        <p className="text-sm font-medium text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
          문의가 정상적으로 접수되었습니다. 빠르게 회신드릴게요.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "전송 중..." : "문의 남기기"}
      </button>
    </form>
  );
}
