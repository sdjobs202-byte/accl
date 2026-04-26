import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session && (session.user as any).role === "ADMIN";
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { title, description, passingScore, examDate, questions } = await request.json();

  await prisma.question.deleteMany({ where: { examId: id } });

  const exam = await prisma.exam.update({
    where: { id },
    data: {
      title,
      description,
      passingScore,
      examDate: examDate ? new Date(examDate) : null,
      questions: {
        create: questions.map((q: { text: string; options: string[]; correctAnswer: string }) => ({
          text: q.text,
          options: JSON.stringify(q.options),
          correctAnswer: q.correctAnswer,
        })),
      },
    },
  });

  return NextResponse.json(exam);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.exam.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
