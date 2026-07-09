import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { SEED_EXAMS, SEED_QUESTIONS } from "@/lib/seed-exams";

/**
 * ACCL 자격 시험 3종(AIMC 2급 / AIMC 1급 / AITC) 시드.
 *
 * 안전 설계:
 *  - 관리자(role=ADMIN)만 실행 가능
 *  - 기존 시험/문항을 삭제하지 않음 (upsert만)
 *  - 여러 번 실행해도 동일 결과 (멱등). 기존 시험의 createdAt은 보존
 *
 * 데이터 원본: src/lib/seed-exams.ts (scripts/seed-3-exams.sql 에서 생성)
 */
export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 기존 3종의 createdAt 보존 (재실행 시 순서/생성일 유지)
    const ids = SEED_EXAMS.map((e) => e.id);
    const { data: existing } = await supabaseAdmin
      .from("Exam")
      .select("id, createdAt")
      .in("id", ids);
    const createdAtById = new Map<string, string>(
      (existing ?? []).map((e: any) => [e.id, e.createdAt])
    );

    const examRows = SEED_EXAMS.map((e, i) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      passingScore: e.passingScore,
      // 신규면 결정적 타임스탬프(2급<1급<AITC 순서 보장), 기존이면 원래 값 유지
      createdAt:
        createdAtById.get(e.id) ??
        new Date(Date.UTC(2026, 0, 1, 0, 0, i)).toISOString(),
    }));

    const { error: examError } = await supabaseAdmin
      .from("Exam")
      .upsert(examRows, { onConflict: "id" });
    if (examError) throw examError;

    const questionRows = SEED_QUESTIONS.map((q) => ({
      id: q.id,
      examId: q.examId,
      text: q.text,
      options: JSON.stringify(q.options), // 저장 형식: JSON 문자열 (응시화면에서 JSON.parse)
      correctAnswer: q.correctAnswer,
    }));

    const { error: qError } = await supabaseAdmin
      .from("Question")
      .upsert(questionRows, { onConflict: "id" });
    if (qError) throw qError;

    return NextResponse.json({
      message: "자격 시험 3종 시드 완료",
      exams: examRows.map((e) => e.title),
      questionCount: questionRows.length,
    });
  } catch (error: any) {
    console.error("SEED ERROR:", error);
    return NextResponse.json(
      { error: error?.message ?? "Internal Error" },
      { status: 500 }
    );
  }
}
