import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const { id } = await params;
    const examId = id;
    
    const body = await request.json();
    const { answers } = body; // Record<string, string>

    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: { questions: true }
    });

    if (!exam) {
      return new NextResponse("Exam not found", { status: 404 });
    }

    // 채점 로직
    let correctCount = 0;
    const totalQuestions = exam.questions.length;

    exam.questions.forEach((q) => {
      const userAnswer = answers[q.id];
      if (userAnswer === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    const passed = score >= exam.passingScore;

    // Result 생성
    const result = await prisma.result.create({
      data: {
        userId: user.id,
        examId: exam.id,
        score,
        passed,
      }
    });

    // 합격했다면 수료증 발급
    if (passed) {
      // 고유 번호 생성 로직: 0101부터 순차적 증가
      const count = await prisma.certificate.count();
      const certificateNumber = String(101 + count).padStart(4, '0');

      await prisma.certificate.create({
        data: {
          resultId: result.id,
          certificateNumber,
        }
      });
    }

    return NextResponse.json({ score, passed });
  } catch (error: any) {
    console.error("SUBMIT EXAM ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
