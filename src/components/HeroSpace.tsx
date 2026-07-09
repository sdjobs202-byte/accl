// 정적 딥스페이스 배경 (모션 없이 톤만 통일 — 보조 CTA 배너용).
// 감싸는 요소는 `relative overflow-hidden`, 콘텐츠는 `relative z-10`.
export default function HeroSpace() {
  return (
    <div className="hero-fx" aria-hidden="true">
      <div className="hero-fx__space" />
      <div className="hero-fx__vignette" />
    </div>
  );
}
