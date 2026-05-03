import { supabaseAdmin } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ExamForm from "../../ExamForm";

export default async function EditExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: exam } = await supabaseAdmin
    .from("Exam")
    .select("*, questions:Question(*)")
    .eq("id", id)
    .single();

  if (!exam) notFound();

  const initialData = {
    id: exam.id,
    title: exam.title,
    description: exam.description,
    passingScore: exam.passingScore,
    examDate: exam.examDate ? new Date(exam.examDate).toISOString().split("T")[0] : null,
    questions: exam.questions.map((q: any) => ({
      id: q.id,
      text: q.text,
      options: JSON.parse(q.options) as string[],
      correctAnswer: q.correctAnswer,
    })),
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">시험 편집</h1>
      <ExamForm initialData={initialData} />
    </div>
  );
}
