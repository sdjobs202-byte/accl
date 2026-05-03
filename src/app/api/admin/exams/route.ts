import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session && (session.user as any).role === "ADMIN";
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: exams, error } = await supabaseAdmin
    .from("Exam")
    .select("*, questions:Question(*), results:Result(id, passed)")
    .order("createdAt", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(exams);
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, description, passingScore, examDate, questions } = await request.json();

  const examId = crypto.randomUUID();

  const { data: exam, error: examError } = await supabaseAdmin
    .from("Exam")
    .insert({
      id: examId,
      title,
      description,
      passingScore,
      examDate: examDate ? new Date(examDate).toISOString() : null,
      createdAt: new Date().toISOString(),
    })
    .select()
    .single();

  if (examError) return NextResponse.json({ error: examError.message }, { status: 500 });

  if (questions && questions.length > 0) {
    const questionRows = questions.map((q: { text: string; options: string[]; correctAnswer: string }) => ({
      id: crypto.randomUUID(),
      examId,
      text: q.text,
      options: JSON.stringify(q.options),
      correctAnswer: q.correctAnswer,
    }));

    const { error: qError } = await supabaseAdmin.from("Question").insert(questionRows);
    if (qError) return NextResponse.json({ error: qError.message }, { status: 500 });
  }

  return NextResponse.json(exam, { status: 201 });
}
