"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InquiryReplyClient({
  inquiryId,
  inquirerEmail,
  existingReply,
  currentStatus,
}: {
  inquiryId: string;
  inquirerEmail: string;
  existingReply: string | null;
  currentStatus: string;
}) {
  const router = useRouter();
  const [reply, setReply] = useState(existingReply ?? "");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "warn" | "error"; msg: string } | null>(null);

  const submit = async () => {
    if (!reply.trim()) return;
    setSending(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.error ?? "저장 실패");

      if (body.emailSent) {
        setFeedback({ kind: "ok", msg: `답변 저장 완료 + ${inquirerEmail} 으로 메일 발송됨.` });
      } else {
        setFeedback({
          kind: "warn",
          msg: `답변은 저장됐지만 이메일 발송에 실패했습니다. 사유: ${body.emailReason ?? "알 수 없음"} — 카카오톡 등 다른 경로로 답변해 주세요.`,
        });
      }
      router.refresh();
    } catch (err: any) {
      setFeedback({ kind: "error", msg: err.message ?? "오류" });
    } finally {
      setSending(false);
    }
  };

  const close = async () => {
    await fetch(`/api/admin/inquiries/${inquiryId}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ closeOnly: true }),
    });
    router.refresh();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-4 space-y-3">
      <h2 className="font-semibold text-gray-700">답변 작성</h2>
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        rows={8}
        placeholder="답변 내용을 입력하세요. 저장 시 문의자 이메일로 자동 발송됩니다."
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A92B2B]"
      />

      {feedback && (
        <p
          className={`text-sm font-medium px-3 py-2 rounded-lg ${
            feedback.kind === "ok"
              ? "bg-green-50 text-green-700 border border-green-100"
              : feedback.kind === "warn"
              ? "bg-yellow-50 text-yellow-800 border border-yellow-100"
              : "bg-red-50 text-red-700 border border-red-100"
          }`}
        >
          {feedback.msg}
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={submit}
          disabled={sending || !reply.trim()}
          className="px-5 py-2 bg-[#A92B2B] text-white rounded-lg text-sm font-medium hover:bg-[#8B2020] disabled:opacity-60"
        >
          {sending ? "전송 중..." : currentStatus === "REPLIED" ? "답변 다시 보내기" : "답변 보내기"}
        </button>
        {currentStatus !== "CLOSED" && (
          <button
            onClick={close}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
          >
            종료 처리
          </button>
        )}
      </div>
    </div>
  );
}
