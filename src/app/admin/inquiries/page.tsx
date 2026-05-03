import { supabaseAdmin } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  NEW: { label: "신규", cls: "bg-red-100 text-red-700" },
  REPLIED: { label: "답변완료", cls: "bg-green-100 text-green-700" },
  CLOSED: { label: "종료", cls: "bg-gray-100 text-gray-600" },
};

export default async function InquiriesPage() {
  const { data: inquiries } = await supabaseAdmin
    .from("Inquiry")
    .select("id, name, email, message, status, createdAt, repliedAt")
    .order("createdAt", { ascending: false });

  const list = inquiries ?? [];
  const newCount = list.filter((i: any) => i.status === "NEW").length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">문의 관리</h1>
          <p className="text-sm text-gray-500 mt-1">총 {list.length}건 / 신규 {newCount}건</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">상태</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">이름</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">이메일</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">문의 요약</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">접수일</th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {list.map((q: any) => {
              const status = STATUS_LABEL[q.status] ?? STATUS_LABEL.NEW;
              return (
                <tr key={q.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.cls}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{q.name}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{q.email}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-[280px] truncate">{q.message}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(q.createdAt).toLocaleString("ko-KR")}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/admin/inquiries/${q.id}`}
                      className="text-blue-500 hover:underline text-xs"
                    >
                      열기
                    </Link>
                  </td>
                </tr>
              );
            })}
            {list.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  접수된 문의가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
