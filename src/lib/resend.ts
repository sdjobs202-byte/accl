type SendInquiryReplyArgs = {
  to: string;
  inquirerName: string;
  originalMessage: string;
  reply: string;
};

export async function sendInquiryReply({
  to,
  inquirerName,
  originalMessage,
  reply,
}: SendInquiryReplyArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, reason: "RESEND_API_KEY 미설정" };
  }
  const from = process.env.RESEND_FROM ?? "ACCL <onboarding@resend.dev>";
  const replyTo = process.env.CONTACT_TO_EMAIL ?? "sdjobs202@gmail.com";

  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const html = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
      <h2 style="color:#A92B2B;font-size:20px;margin:0 0 12px">${escape(inquirerName)}님, ACCL입니다.</h2>
      <p style="font-size:14px;line-height:1.7;margin:0 0 16px">문의 주신 내용에 답변드립니다.</p>
      <div style="padding:14px;background:#fff;border:1px solid #eee;border-radius:8px;white-space:pre-wrap;line-height:1.7;font-size:14px">${escape(reply)}</div>
      <h3 style="font-size:13px;color:#777;margin:24px 0 6px">원래 문의 내용</h3>
      <div style="padding:12px;background:#FAFAFA;border-radius:8px;white-space:pre-wrap;color:#666;font-size:13px;line-height:1.6">${escape(originalMessage)}</div>
      <p style="font-size:12px;color:#888;margin-top:24px">추가 문의는 이 메일에 회신하시거나 카카오톡 1:1 오픈채팅으로 연락 주세요.</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: replyTo,
      subject: "[ACCL] 문의 주신 내용에 답변드립니다",
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return { ok: false, reason: `Resend ${res.status}: ${text}` };
  }
  return { ok: true };
}

type SendCertificateEmailArgs = {
  to: string;
  recipientName: string;
  examTitle: string;
  certificateNumber: string;
  certificateUrl: string;
};

export async function sendCertificateEmail({
  to,
  recipientName,
  examTitle,
  certificateNumber,
  certificateUrl,
}: SendCertificateEmailArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY missing — skipping email send");
    return { skipped: true };
  }

  const from = process.env.RESEND_FROM ?? "ACCL <onboarding@resend.dev>";

  const html = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;color:#111">
      <h1 style="color:#A92B2B;font-size:22px;margin:0 0 16px">${recipientName}님, 합격을 축하합니다!</h1>
      <p style="font-size:15px;line-height:1.6;margin:0 0 16px">
        <strong>${examTitle}</strong> 시험에 합격하여 자격증이 발급되었습니다.
      </p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;background:#FAFAFA;border-radius:8px">
        <tr><td style="padding:12px 16px;color:#555">발급번호</td><td style="padding:12px 16px;font-weight:700">제 AIMC 2026-${certificateNumber} 호</td></tr>
        <tr><td style="padding:12px 16px;color:#555">발급일</td><td style="padding:12px 16px">${new Date().toLocaleDateString("ko-KR")}</td></tr>
      </table>
      <p style="font-size:14px;line-height:1.6;margin:16px 0">
        아래 버튼을 눌러 자격증을 확인하고 PDF로 다운로드하실 수 있습니다. 이 링크는 언제든 다시 사용할 수 있습니다.
      </p>
      <p style="margin:24px 0">
        <a href="${certificateUrl}" style="display:inline-block;background:#A92B2B;color:#fff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:700">자격증 확인 / PDF 다운로드</a>
      </p>
      <p style="font-size:12px;color:#888;margin-top:32px">© ACCL</p>
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
      subject: `[ACCL] ${examTitle} 자격증이 발급되었습니다`,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend ${res.status}: ${text}`);
  }

  return res.json();
}
