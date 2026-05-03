import { supabaseAdmin } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import InquiryReplyClient from "./InquiryReplyClient";

export const dynamic = "force-dynamic";

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: q } = await supabaseAdmin
    .from("Inquiry")
    .select("*")
    .eq("id", id)
    .single();

  if (!q) notFound();

  return (
    <div className="max-w-3xl">
      <Link href="/admin/inquiries" className="text-sm text-gray-500 hover:underline">
        ← 목록으로
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-4 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{q.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {q.email} · {new Date(q.createdAt).toLocaleString("ko-KR")}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              q.status === "NEW"
                ? "bg-red-100 text-red-700"
                : q.status === "REPLIED"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {q.status === "NEW" ? "신규" : q.status === "REPLIED" ? "답변완료" : "종료"}
          </span>
        </div>

        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-2">문의 내용</h3>
          <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap text-sm leading-6">
            {q.message}
          </div>
        </div>

        {q.reply && (
          <div>
            <h3 className="text-xs font-medium text-gray-500 mb-2">
              내 답변 · {q.repliedAt ? new Date(q.repliedAt).toLocaleString("ko-KR") : ""}
            </h3>
            <div className="p-4 bg-green-50 rounded-lg whitespace-pre-wrap text-sm leading-6 border border-green-100">
              {q.reply}
            </div>
          </div>
        )}
      </div>

      <InquiryReplyClient
        inquiryId={q.id}
        inquirerEmail={q.email}
        existingReply={q.reply}
        currentStatus={q.status}
      />
    </div>
  );
}
