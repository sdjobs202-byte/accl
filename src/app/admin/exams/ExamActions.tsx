"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ExamActions({ examId }: { examId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (
      !confirm(
        "시험을 삭제하면 관련 응시 결과와 자격증도 모두 삭제됩니다. 계속하시겠습니까?"
      )
    )
      return;
    await fetch(`/api/admin/exams/${examId}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <Link href={`/admin/exams/${examId}/edit`} className="text-blue-500 hover:underline text-xs">
        편집
      </Link>
      <button onClick={handleDelete} className="text-red-500 hover:underline text-xs">
        삭제
      </button>
    </div>
  );
}
