import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, BookOpen, BrainCircuit, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-[#1A1A1A] text-white py-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-[#A92B2B] opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-[#A92B2B] opacity-20 blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-[#A92B2B]/20 text-[#ff8080] text-sm font-semibold mb-6 border border-[#A92B2B]/30">
            ACCL AI 러닝 센터
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            AI 시대,<br />어떻게 성장하고 계신가요?
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12 leading-relaxed">
            반복되는 업무, 뒤처지는 불안감, 새로운 기술의 막막함.<br />
            <span className="text-white font-semibold">ACCL과 함께하면 달라집니다.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#ai-contents" className="bg-[#A92B2B] hover:bg-[#8e2323] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              ACCL 알아보기 <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/exam" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 backdrop-blur-sm flex items-center justify-center">
              자격증 시험 응시하기
            </Link>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">어떤 어려움을 겪고 계신가요?</h2>
            <div className="w-24 h-1 bg-[#A92B2B] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "비효율적인 반복 업무", desc: "매일 똑같이 반복되는 서류 작업과 데이터 정리에 지치셨나요?" },
              { title: "빠른 기술 변화에 대한 불안", desc: "쏟아지는 AI 기술, 어디서부터 어떻게 시작해야 할지 막막하신가요?" },
              { title: "실무 적용의 한계", desc: "이론은 배웠지만, 내 업무에 직접 적용하기가 어려우신가요?" }
            ].map((item, i) => (
              <div key={i} className="bg-[#F9FAFB] p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#A92B2B]/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="text-[#A92B2B] w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Contents Section */}
      <section id="ai-contents" className="py-24 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                업무의 <span className="text-[#A92B2B]">혁신</span>,<br />ACCL에서 시작됩니다.
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                단순한 툴 사용법을 넘어, AI를 실무에 완벽히 적용할 수 있는 체계적인 커리큘럼을 제공합니다. 
                전문가의 1:1 피드백과 함께 진짜 '나만의 무기'를 만들어보세요.
              </p>
              
              <ul className="space-y-4">
                {[
                  "현업 전문가의 실전 중심 강의",
                  "내 업무에 바로 적용하는 맞춤형 프로젝트",
                  "자격증 취득으로 전문성 입증",
                ].map((text, i) => (
                  <li key={i} className="flex items-center text-gray-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#A92B2B] mr-3" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:w-1/2 w-full grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <BrainCircuit className="w-10 h-10 text-[#A92B2B] mb-4" />
                  <h4 className="font-bold text-gray-900">AI 리터러시</h4>
                  <p className="text-sm text-gray-500 mt-2">AI의 기본 개념과 활용법 마스터</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <BookOpen className="w-10 h-10 text-[#A92B2B] mb-4" />
                  <h4 className="font-bold text-gray-900">자격증 과정</h4>
                  <p className="text-sm text-gray-500 mt-2">민간자격증 취득을 통한 커리어 업</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-[#A92B2B] p-6 rounded-2xl shadow-md text-white">
                  <Users className="w-10 h-10 text-white/80 mb-4" />
                  <h4 className="font-bold">기업 맞춤형 교육</h4>
                  <p className="text-sm text-white/80 mt-2">조직의 생산성 극대화를 위한 워크샵</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Banner CTA */}
      <section className="py-20 bg-[#1A1A1A] relative overflow-hidden text-center">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">자신의 AI 역량을 증명하세요</h2>
          <p className="text-xl text-gray-400 mb-10">
            간단한 테스트부터 공식 민간자격증까지. 지금 바로 여러분의 실력을 점검하고 수료증을 발급받으세요.
          </p>
          <Link href="/exam" className="inline-flex items-center bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300">
            자격증 테스트 시작하기 <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
