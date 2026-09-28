import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import homeHtml from "./_home/index.html";

// 메인(/)은 리뉴얼된 정적 HTML을 그대로 제공한다. 전용 CSS·JS·이미지는 public/home/ 에 있다.
// 공통 layout.tsx(Tailwind 헤더·푸터)를 거치지 않으므로, 로그인 상태 링크만 여기서 끼워 넣는다.
export const dynamic = "force-dynamic";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function GET() {
  const session = await getServerSession(authOptions);

  const authLinks = session
    ? `<a class="nav-link" href="/dashboard">${session.user?.name ? `${escapeHtml(session.user.name)}님 · ` : ""}마이페이지</a>
        <a class="nav-link nav-auth" href="/api/auth/signout">로그아웃</a>`
    : `<a class="nav-link" href="/login">로그인</a>`;

  return new Response(homeHtml.replace("<!--AUTH_LINKS-->", authLinks), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-cache",
    },
  });
}
