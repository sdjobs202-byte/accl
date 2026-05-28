import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { sendCertificateEmail } from "@/lib/resend";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { data: user } = await supabaseAdmin
      .from("User")
      .select("*")
      .eq("email", session.user.email)
      .single();

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const { id: examId } = await params;
    const body = await request.json();
    const { answers } = body;

    const { data: exam } = await supabaseAdmin
      .from("Exam")
      .select("*, questions:Question(*)")
      .eq("id", examId)
      .single();

    if (!exam) {
      return new NextResponse("Exam not found", { status: 404 });
    }

    let correctCount = 0;
    const totalQuestions = exam.questions.length;

    exam.questions.forEach((q: any) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    const passed = score >= exam.passingScore;

    const resultId = crypto.randomUUID();
    const { error: resultError } = await supabaseAdmin.from("Result").insert({
      id: resultId,
      userId: user.id,
      examId: exam.id,
      score,
      passed,
      createdAt: new Date().toISOString(),
    });

    if (resultError) throw resultError;

    let certificateId: string | null = null;

    if (passed) {
      const { count } = await supabaseAdmin
        .from("Certificate")
        .select("id", { count: "exact", head: true });

      const certificateNumber = String(101 + (count ?? 0)).padStart(4, "0");
      certificateId = crypto.randomUUID();

      const { error: certError } = await supabaseAdmin.from("Certificate").insert({
        id: certificateId,
        resultId,
        certificateNumber,
        issueDate: new Date().toISOString(),
        pdfUrl: null,
      });

      if (certError) {
        console.error("CERTIFICATE INSERT ERROR:", certError);
        throw certError;
      }

      const origin =
        request.headers.get("origin") ??
        process.env.NEXTAUTH_URL ??
        "";
      const certificateUrl = `${origin}/certificate/${certificateId}`;

      try {
        await sendCertificateEmail({
          to: user.email,
          recipientName: user.name ?? user.email,
          examTitle: exam.title,
          certificateNumber,
          certificateUrl,
        });
      } catch (mailErr) {
        console.error("CERTIFICATE EMAIL ERROR:", mailErr);
      }
    }

    return NextResponse.json({
      score,
      passed,
      certificateId,
      totalQuestions,
      correctCount,
      passingScore: exam.passingScore,
    });
  } catch (error: any) {
    console.error("SUBMIT EXAM ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
