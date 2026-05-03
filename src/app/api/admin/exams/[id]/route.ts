import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session && (session.user as any).role === "ADMIN";
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { title, description, passingScore, examDate, questions } = await request.json();

  await supabaseAdmin.from("Question").delete().eq("examId", id);

  const { data: exam, error } = await supabaseAdmin
    .from("Exam")
    .update({
      title,
      description,
      passingScore,
      examDate: examDate ? new Date(examDate).toISOString() : null,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (questions && questions.length > 0) {
    const questionRows = questions.map((q: { text: string; options: string[]; correctAnswer: string }) => ({
      id: crypto.randomUUID(),
      examId: id,
      text: q.text,
      options: JSON.stringify(q.options),
      correctAnswer: q.correctAnswer,
    }));

    const { error: qError } = await supabaseAdmin.from("Question").insert(questionRows);
    if (qError) return NextResponse.json({ error: qError.message }, { status: 500 });
  }

  return NextResponse.json(exam);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { error } = await supabaseAdmin.from("Exam").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
