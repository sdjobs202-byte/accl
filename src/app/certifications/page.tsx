import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import HeroAurora from "@/components/HeroAurora";
import {
  Award,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  UserPlus,
  ListChecks,
  Trophy,
  FileCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

// ACCL 공식 자격 3종 (원본: scripts/seed-3-exams.sql).
// 공개 소개 페이지라 DB에 의존하지 않고 정적으로 표기해 항상 노출되도록 함.
const CERTS = [
  {
    abbr: "AIMC 2급",
    icon: "🥈",
    title: "AI 리터러시 마스터 인증 2급",
    level: "입문 · 기초",
    passingScore: 70,
    questionHint: "약 30문항",
    desc: "머신러닝·딥러닝·생성형 AI의 기본 개념부터 프롬프트 활용, AI 윤리까지. AI를 처음 배우는 분이 일상과 업무에서 자신 있게 활용하기 위한 첫 자격입니다.",
    forWhom: "AI 입문자 · 일반인 · 직장인",
  },
  {
    abbr: "AIMC 1급",
    icon: "🥇",
    title: "AI 리터러시 마스터 인증 1급",
    level: "심화 · 실무",
    passingScore: 75,
    questionHint: "약 40문항",
    desc: "트랜스포머·RLHF·RAG·파인튜닝 등 심화 개념까지 이해하고 실무에 응용하는 전문 자격. AI를 업무에 깊이 있게 활용하려는 분께 권합니다.",
    forWhom: "AI 활용 실무자 · 심화 학습자",
  },
  {
    abbr: "AITC",
    icon: "🎓",
    title: "AI 리터러시 전문강사 인증",
    level: "강사 · 교수역량",
    passingScore: 75,
    questionHint: "약 40문항",
    desc: "AI 리터러시를 남에게 가르칠 수 있는 교수 역량을 인증합니다. 강의·교육 현장에서 AI를 다루는 강사·교육자를 위한 자격입니다.",
    forWhom: "강사 · 교육자 · 예비 강사",
  },
] as const;

export default async function CertificationsPage() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = Boolean(session?.user?.email);
  const examHref = isLoggedIn ? "/exams" : "/login";

  const steps = [
    {
      Icon: UserPlus,
      title: "회원가입 · 로그인",
      desc: "간단한 가입 후 로그인하면 모든 시험에 응시할 수 있습니다.",
    },
    {
      Icon: ListChecks,
      title: "시험 선택 · 응시",
      desc: "원하는 자격 시험을 골라 객관식 문항에 답합니다. 답안은 자동 저장됩니다.",
    },
    {
      Icon: Trophy,
      title: "즉시 채점",
      desc: "제출과 동시에 점수와 합격 여부를 바로 확인할 수 있습니다.",
    },
    {
      Icon: FileCheck,
      title: "수료증 발급",
      desc: "합격 시 PDF 수료증이 발급되고 등록하신 이메일로 자동 발송됩니다.",
    },
  ] as const;

  const infos = [
    { emoji: "📋", title: "객관식 4지선다", desc: "모든 문항은 객관식 4지선다 형식으로 출제됩니다." },
    { emoji: "🎯", title: "합격 기준", desc: "시험별 합격 점수 이상을 획득하면 합격입니다." },
    { emoji: "🔁", title: "재응시 무제한", desc: "합격할 때까지 횟수 제한 없이 다시 도전할 수 있습니다." },
    { emoji: "💾", title: "자동 저장", desc: "답안이 자동 저장되어 언제든 이어서 응시할 수 있습니다." },
    { emoji: "⚡", title: "즉시 결과 확인", desc: "제출 후 점수와 합격 여부를 그 자리에서 확인합니다." },
    { emoji: "🔎", title: "수료증 진위 확인", desc: "발급 번호로 누구나 수료증의 진위를 조회할 수 있습니다." },
  ] as const;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-[#141414] text-white py-24 md:py-28 overflow-hidden">
        <HeroAurora />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#A92B2B]/20 text-[#ff8080] text-sm font-semibold mb-6 border border-[#A92B2B]/30">
            <ShieldCheck className="w-4 h-4" /> 과학기술정보통신부 등록 민간자격
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            자격관리센터
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mb-10 leading-relaxed">
            AI 역량을 공식 자격으로 증명하세요.
            <br className="hidden md:block" />
            온라인으로 응시하고, 합격하면 수료증까지 바로 받습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={examHref}
              className="bg-[#A92B2B] hover:bg-[#8e2323] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              {isLoggedIn ? "시험 응시하러 가기" : "로그인하고 응시하기"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            {!isLoggedIn && (
              <Link
                href="/register"
                className="bg-white hover:bg-gray-100 text-[#A92B2B] px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                회원가입
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* 발급 자격 종류 (정적 3종) */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">발급 자격 종류</h2>
            <div className="w-24 h-1 bg-[#A92B2B] mx-auto rounded-full mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              ACCL이 운영하는 AI 역량 인증 자격 3종입니다.
              <br className="hidden md:block" />
              단계에 맞는 자격을 선택해 온라인으로 응시할 수 있습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {CERTS.map((cert) => (
              <div
                key={cert.abbr}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="text-4xl mb-3">{cert.icon}</div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-red-50 text-[#A92B2B] rounded text-xs font-bold">
                    {cert.abbr}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                    {cert.level}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{cert.desc}</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">📋</span> {cert.questionHint}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">🎯</span> 합격 {cert.passingScore}점
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-5">
                  <span className="font-semibold text-gray-700">대상</span> · {cert.forWhom}
                </div>
                <Link
                  href={examHref}
                  className="mt-auto flex items-center justify-center gap-1 px-4 py-3 bg-[#A92B2B] text-white rounded-lg font-bold text-sm hover:bg-[#8e2323] transition-colors"
                >
                  {isLoggedIn ? "응시하기" : "로그인하고 응시"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 응시부터 발급까지 4단계 */}
      <section className="py-20 md:py-24 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">응시부터 발급까지</h2>
            <div className="w-24 h-1 bg-[#A92B2B] mx-auto rounded-full mb-6" />
            <p className="text-lg text-gray-600">네 단계면 자격 취득이 끝납니다.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative bg-white rounded-2xl p-7 border border-gray-100 shadow-sm"
              >
                <span className="absolute top-5 right-6 text-4xl font-extrabold text-[#A92B2B]/10">
                  {i + 1}
                </span>
                <div className="w-14 h-14 rounded-full bg-[#A92B2B] flex items-center justify-center mb-5 shadow-md">
                  <step.Icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 응시 안내 */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">응시 안내</h2>
            <div className="w-24 h-1 bg-[#A92B2B] mx-auto rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {infos.map((info) => (
              <div
                key={info.title}
                className="bg-[#F9FAFB] rounded-xl p-6 border border-gray-100 flex items-start gap-4"
              >
                <div className="text-2xl flex-shrink-0">{info.emoji}</div>
                <div>
                  <div className="font-bold text-gray-900 text-sm mb-1">{info.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{info.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-600">
            <CheckCircle2 className="w-5 h-5 text-[#A92B2B]" />
            발급받은 수료증의 진위가 궁금하신가요?
            <Link href="/verify" className="font-semibold text-[#A92B2B] hover:underline underline-offset-2">
              수료증 진위 확인 바로가기
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#141414] relative overflow-hidden text-center">
        <HeroAurora />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <Award className="w-12 h-12 text-[#ff8080] mx-auto mb-6" strokeWidth={1.6} />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            지금 바로 AI 역량을 증명하세요
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            온라인으로 간편하게 응시하고, 합격하면 공식 수료증이 발급됩니다.
          </p>
          <Link
            href={examHref}
            className="inline-flex items-center gap-2 bg-[#A92B2B] hover:bg-[#8e2323] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            {isLoggedIn ? "시험 응시하러 가기" : "로그인하고 응시하기"}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
