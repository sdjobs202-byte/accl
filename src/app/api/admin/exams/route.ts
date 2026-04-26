import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session && (session.user as any).role === "ADMIN";
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const exams = await prisma.exam.findMany({
    orderBy: { createdAt: "desc" },
    include: { questions: true, _count: { select: { results: true } } },
  });
  return NextResponse.json(exams);
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, description, passingScore, examDate, questions } = await request.json();

  const exam = await prisma.exam.create({
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

  return NextResponse.json(exam, { status: 201 });
}
