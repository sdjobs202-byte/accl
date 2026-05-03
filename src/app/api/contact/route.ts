import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "이름·이메일·문의 내용을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "이메일 형식이 올바르지 않습니다." }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: "문의 내용이 너무 깁니다." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("CONTACT: RESEND_API_KEY missing");
      return NextResponse.json({ error: "메일 발송이 구성되지 않았습니다." }, { status: 500 });
    }

    const to = process.env.CONTACT_TO_EMAIL ?? "sdjobs202@gmail.com";
    const from = process.env.RESEND_FROM ?? "ACCL <onboarding@resend.dev>";

    const escape = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const html = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
        <h2 style="color:#A92B2B;font-size:20px;margin:0 0 12px">[ACCL] 새 문의가 도착했습니다</h2>
        <table style="width:100%;border-collapse:collapse;margin:12px 0;background:#FAFAFA;border-radius:8px;font-size:14px">
          <tr><td style="padding:10px 14px;color:#555;width:90px">이름</td><td style="padding:10px 14px;font-weight:600">${escape(name)}</td></tr>
          <tr><td style="padding:10px 14px;color:#555">이메일</td><td style="padding:10px 14px"><a href="mailto:${escape(email)}">${escape(email)}</a></td></tr>
        </table>
        <h3 style="font-size:14px;color:#555;margin:18px 0 6px">문의 내용</h3>
        <div style="padding:14px;background:#fff;border:1px solid #eee;border-radius:8px;white-space:pre-wrap;line-height:1.6;font-size:14px">${escape(message)}</div>
        <p style="font-size:12px;color:#888;margin-top:24px">이 메일에 그대로 회신하면 문의자에게 답장됩니다.</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `[ACCL 문의] ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("CONTACT RESEND ERROR:", res.status, text);
      return NextResponse.json({ error: "메일 발송에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("CONTACT ERROR:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
