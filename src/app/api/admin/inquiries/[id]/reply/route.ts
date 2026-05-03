import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { sendInquiryReply } from "@/lib/resend";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  const { data: inquiry, error: findErr } = await supabaseAdmin
    .from("Inquiry")
    .select("*")
    .eq("id", id)
    .single();
  if (findErr || !inquiry) {
    return NextResponse.json({ error: "문의를 찾을 수 없습니다." }, { status: 404 });
  }

  if (body.closeOnly) {
    const { error: updErr } = await supabaseAdmin
      .from("Inquiry")
      .update({ status: "CLOSED" })
      .eq("id", id);
    if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  const reply = String(body.reply ?? "").trim();
  if (!reply) {
    return NextResponse.json({ error: "답변 내용이 비어있습니다." }, { status: 400 });
  }

  const { error: updErr } = await supabaseAdmin
    .from("Inquiry")
    .update({
      reply,
      status: "REPLIED",
      repliedAt: new Date().toISOString(),
    })
    .eq("id", id);
  if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });

  let emailSent = false;
  let emailReason: string | undefined;
  try {
    const result = await sendInquiryReply({
      to: inquiry.email,
      inquirerName: inquiry.name,
      originalMessage: inquiry.message,
      reply,
    });
    emailSent = result.ok;
    if (!result.ok) emailReason = result.reason;
  } catch (err: any) {
    emailReason = err?.message ?? "unknown";
  }

  return NextResponse.json({ ok: true, emailSent, emailReason });
}
