import { supabaseAdmin } from "@/lib/supabase";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ExamClient from "./ExamClient";

export const dynamic = "force-dynamic";

export default async function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  const { data: exam } = await supabaseAdmin
    .from("Exam")
    .select("*, questions:Question(*)")
    .eq("id", id)
    .single();

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">시험을 찾을 수 없습니다.</h1>
          <p className="text-gray-600">올바른 경로로 접속해 주세요.</p>
        </div>
      </div>
    );
  }

  const sanitizedQuestions = exam.questions.map((q: any) => ({
    id: q.id,
    text: q.text,
    options: q.options,
  }));

  const sanitizedExam = {
    id: exam.id,
    title: exam.title,
    description: exam.description,
    passingScore: exam.passingScore,
    questions: sanitizedQuestions,
  };

  return <ExamClient exam={sanitizedExam} />;
}
