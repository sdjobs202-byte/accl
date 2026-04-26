import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ExamForm from "../../ExamForm";

export default async function EditExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const exam = await prisma.exam.findUnique({
    where: { id },
    include: { questions: true },
  });

  if (!exam) notFound();

  const initialData = {
    id: exam.id,
    title: exam.title,
    description: exam.description,
    passingScore: exam.passingScore,
    examDate: exam.examDate ? exam.examDate.toISOString().split("T")[0] : null,
    questions: exam.questions.map((q) => ({
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
