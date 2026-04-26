import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ExamClient from "./ExamClient";

export const dynamic = "force-dynamic";

export default async function ExamPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  // params 가 Next.js 15+ 에서는 Promise 일 수 있으므로 await 처리
  const { id } = await params;
  const examId = id;

  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    include: {
      questions: true,
    },
  });

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

  // 클라이언트로 정답을 보내지 않도록 필터링
  const sanitizedQuestions = exam.questions.map(q => ({
    id: q.id,
    text: q.text,
    options: q.options, // This is a JSON string
  }));

  const sanitizedExam = {
    id: exam.id,
    title: exam.title,
    description: exam.description,
    questions: sanitizedQuestions,
  };

  return <ExamClient exam={sanitizedExam} />;
}
