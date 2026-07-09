// 히어로 배경 모션 그래픽 (순수 CSS, JS 없음).
// 감싸는 요소는 `relative overflow-hidden` 여야 하고, 실제 콘텐츠는 `relative z-10` 로 올림.
export default function HeroAurora() {
  return (
    <div className="hero-fx" aria-hidden="true">
      <div className="hero-fx__base" />
      <div className="hero-fx__orb hero-fx__orb--1" />
      <div className="hero-fx__orb hero-fx__orb--2" />
      <div className="hero-fx__orb hero-fx__orb--3" />
      <div className="hero-fx__grid" />
      <div className="hero-fx__stars" />
      <div className="hero-fx__vignette" />
    </div>
  );
}
