import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, BookOpen, BrainCircuit, Users, Settings, Award, GraduationCap, Target } from "lucide-react";
import ContactForm from "./ContactForm";

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

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              <span className="text-gray-900">AI 시대</span>{" "}
              <span className="text-[#A92B2B]">혁신 전문가 그룹, ACCL</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              ACCL(AI Career Contents LAB)은 AI 시대에 필요한 실질적인 역량을 개발하고 전파하는 전문가 그룹입니다.<br className="hidden md:block" />
              급변하는 디지털 환경에서 개인과 조직이 효과적으로 적응하고 성장할 수 있도록 체계적인 교육과 실용적인 콘텐츠를 제공합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* About ACCL — dark circle */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">ACCL 소개</h3>
              <div className="relative w-full max-w-[420px] aspect-square rounded-full bg-[#1A1F2E] text-white flex flex-col items-center justify-center px-8 shadow-xl">
                <p className="text-lg md:text-xl font-bold mb-6">About ACCL</p>
                <ul className="space-y-3 text-sm md:text-base text-center">
                  <li>AI 기술을 활용한 업무 혁신 전문가 그룹</li>
                  <li>실무 경험을 바탕으로 한 현장 중심 접근</li>
                  <li>이론과 실무를 연결하는 교육 콘텐츠 개발</li>
                  <li>AI와 디지털 전환 시대의 핵심 역량 전수</li>
                  <li>단계별 맞춤형 교육 제공</li>
                </ul>
              </div>
            </div>

            {/* Mission & Vision — red circle */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl md:text-2xl font-bold text-[#A92B2B] mb-6">Mission &amp; Vision</h3>
              <div className="relative w-full max-w-[420px] aspect-square rounded-full bg-[#A92B2B] text-white flex flex-col items-center justify-center px-8 shadow-xl">
                <p className="text-lg md:text-xl font-bold mb-6">우리가 그리는 미래</p>
                <ul className="space-y-3 text-sm md:text-base text-center">
                  <li>AI 활용 업무 생산성 향상</li>
                  <li>고품질 콘텐츠 신속 개발 및 제공</li>
                  <li>실질적인 AI 활용 방법론 제시</li>
                  <li>디지털 격차 해소를 통한 포용적 성장</li>
                  <li>AI 시대의 새로운 커리어 패스 개척</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Contents Section */}
      <section id="ai-contents" className="py-24 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              <span className="text-[#A92B2B]">4대</span> 핵심 콘텐츠 영역
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              ACCL은 AI 활용 능력 향상을 위한 4가지 핵심 콘텐츠 영역을 제공합니다.<br className="hidden md:block" />
              각 영역은 대상과 목표에 맞춰 특화된 교육을 제공합니다.
            </p>
          </div>

          {(() => {
            const items = [
              { side: "left",  title: "AI 리터러시", line1: "일반인 대상 기초 교육",         line2: "AI와 친해지는 가장 쉬운 첫걸음", Icon: Settings },
              { side: "right", title: "AI 워커스",   line1: "직장인 업무 생산성 향상",       line2: "퇴근 시간을 앞당기는 AI 일잘러", Icon: Award },
              { side: "left",  title: "AI 커리어",   line1: "취업준비생 경쟁력 강화",         line2: "AI 시대, 급변하는 채용 전략 수립", Icon: GraduationCap },
              { side: "right", title: "AI 티처스",   line1: "전문 강사 양성 과정",           line2: "고퀄리티 강사로 빠르게 브랜딩",   Icon: Target },
            ] as const;

            const Card = ({ side, title, line1, line2, Icon }: typeof items[number]) => {
              const iconCircle = (
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#A92B2B] flex items-center justify-center shadow-md">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1.8} />
                </div>
              );
              const text = (
                <div className={`flex-1 ${side === "left" ? "text-left pr-2" : "text-right pl-2"}`}>
                  <h4 className="text-xl md:text-2xl font-extrabold text-[#A92B2B] mb-1">{title}</h4>
                  <p className="text-sm text-gray-700 leading-snug">{line1}</p>
                  <p className="text-sm text-gray-700 leading-snug">{line2}</p>
                </div>
              );
              return (
                <div className="bg-white rounded-full px-5 py-4 md:px-6 md:py-5 border border-[#A92B2B]/20 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                  {side === "left" ? <>{iconCircle}{text}</> : <>{text}{iconCircle}</>}
                </div>
              );
            };

            return (
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-56 md:gap-y-10">
                  {items.map((it) => <Card key={it.title} {...it} />)}
                </div>

                {/* Center circular photo (overlay on md+) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="relative w-44 h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white">
                    <Image
                      src="/img/center-photo.jpg"
                      alt="ACCL 4대 핵심 콘텐츠 영역"
                      fill
                      sizes="(min-width:1024px) 208px, 176px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

    {/* Reference Section */}
      <section id="reference" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">함께하는 파트너 & 주요 레퍼런스</h2>
            <div className="w-24 h-1 bg-[#A92B2B] mx-auto rounded-full mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              2023년 7월부터 다양한 기업, 기관, 협단체, 대학, 시니어, 여성인력개발센터 등<br className="hidden md:block" /> 다양한 대상에 AI 활용 콘텐츠 특강 및 워크숍 제공 경험을 보유하고 있습니다.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <div className="p-8 rounded-2xl bg-[#F9FAFB] border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#A92B2B]/10 rounded-full flex items-center justify-center mb-6">
                <Users className="text-[#A92B2B] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">신중년 & 경력 단절 여성</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 경기 화성, 양주, 부천 시/군 대상 특강</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> "AI 일잘러", "AI 직무 역량 강화" 온라인 콘텐츠 제작</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> '나는 강사다' 팀 프로젝트 우수상 수상</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 화성 베이비부머 행복캠퍼스 (15회, 40시간)</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 공공기관 퇴직자 대상 프로그램 (JM커리어, 34시간)</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 군포시청 시니어 대상 AI 특강</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 동대문 여성인력개발센터 마케터 과정 (32시간)</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 부평 여성인력개발센터 AI 특강</li>
              </ul>
            </div>

            {/* Category 2 */}
            <div className="p-8 rounded-2xl bg-[#F9FAFB] border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#A92B2B]/10 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="text-[#A92B2B] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">대학 & 청년</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 천안 청년 일자리 공간 (7회)</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 단국대 취/창업지원센터 교육 및 온라인 특강</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 고려대 AI 활용 기업 분석 특강</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 성균관대 AI 활용 기업 분석 특강</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 수원과학대 디자인학과 특강</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 성결대 신소재공학과 특강</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 한양대 입사 지원서 워크숍</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 나사렛대 AI 활용 창의적 사고 특강</li>
              </ul>
            </div>

            {/* Category 3 */}
            <div className="p-8 rounded-2xl bg-[#F9FAFB] border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#A92B2B]/10 rounded-full flex items-center justify-center mb-6">
                <BrainCircuit className="text-[#A92B2B] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">기업 & 협회 특강</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 동부그룹 신입사원 교육</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 한화큐셀 온보딩 (진천 상공회의소)</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 중소기업 팀장급 및 온보딩 (대전 상공회의소)</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 한국전자정보통신산업진흥회 (KEA)</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 한국디지털융합진흥회 (KODICA)</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> 인적자원개발 성과공유회 (한국반도체산업협회)</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#A92B2B] mt-1 mr-2 flex-shrink-0" /> (주)TES 기업 특강</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Press & Articles Section */}
      <section className="py-20 bg-[#F3F4F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">언론 보도 및 인터뷰</h2>
              <p className="text-gray-600">커리어웨이 강희승 대표의 활동과 인사이트를 만나보세요.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Article 1 */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-xl p-6 border border-gray-200 hover:border-[#A92B2B] hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 bg-red-50 text-[#A92B2B] text-xs font-semibold rounded-full">인터뷰</span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#A92B2B] transition-colors line-clamp-2">
                    [인터뷰] 커리어웨이 강희승 대표, "AI 시대, 스타트업 비즈니스 모델 혁신은 선택이 아닌 필수"
                  </h3>
                  <p className="text-sm text-gray-500">
                    생성형 AI의 발전이 기업의 생산성과 직결되는 시대에, 스타트업이 살아남기 위한 실무적인 챗GPT 활용법과 비즈니스 전략에 대해 들어보았다.
                  </p>
                </div>
                <div className="ml-4 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#A92B2B] group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                <span>IT비즈뉴스</span>
                <span>2024.03.15</span>
              </div>
            </a>

            {/* Article 2 */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-xl p-6 border border-gray-200 hover:border-[#A92B2B] hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">뉴스</span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#A92B2B] transition-colors line-clamp-2">
                    커리어웨이, 기업 임직원 대상 '생성형 AI 실무 적용 워크숍' 성황리 개최
                  </h3>
                  <p className="text-sm text-gray-500">
                    단순 이론 교육을 넘어 실제 업무에 적용할 수 있는 프롬프트 엔지니어링 실습 위주의 워크숍으로 참석자들의 큰 호응을 얻었다.
                  </p>
                </div>
                <div className="ml-4 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#A92B2B] group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                <span>스타트업투데이</span>
                <span>2024.02.20</span>
              </div>
            </a>

            {/* Article 3 */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-xl p-6 border border-gray-200 hover:border-[#A92B2B] hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full">소식</span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#A92B2B] transition-colors line-clamp-2">
                    강희승 대표 "시니어 & 경력단절 여성 특화 AI 리터러시 교육 전국으로 확대할 것"
                  </h3>
                  <p className="text-sm text-gray-500">
                    디지털 격차 해소를 위해 신중년과 경력단절 여성을 대상으로 한 맞춤형 AI 활용 교육 프로그램을 지자체와 협력하여 더욱 넓혀갈 계획이다.
                  </p>
                </div>
                <div className="ml-4 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#A92B2B] group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                <span>여성경제신문</span>
                <span>2023.11.10</span>
              </div>
            </a>

            {/* Article 4 */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-xl p-6 border border-gray-200 hover:border-[#A92B2B] hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full">전문가 칼럼</span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#A92B2B] transition-colors line-clamp-2">
                    [전문가 칼럼] 챗GPT 시대, 대학생의 취업 준비는 어떻게 달라져야 하는가
                  </h3>
                  <p className="text-sm text-gray-500">
                    수많은 정보 속에서 AI를 '비서'로 활용해 나만의 차별화된 이력서를 작성하고 기업을 분석하는 구체적인 노하우를 공개한다.
                  </p>
                </div>
                <div className="ml-4 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#A92B2B] group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                <span>캠퍼스잡앤조이</span>
                <span>2023.09.05</span>
              </div>
            </a>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#F9FAFB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-12 bg-[#A92B2B] text-white">
                <h2 className="text-3xl font-bold mb-4">궁금한 점이 있으신가요?</h2>
                <p className="text-white/80 mb-8">
                  교육 과정, 자격증, 단체 수강 등 무엇이든 물어보세요.<br />
                  관리자가 확인 후 이메일로 답변드립니다.
                </p>
                <p className="text-xs text-white/70">
                  급하시면{" "}
                  <a
                    href="https://open.kakao.com/o/sywGHfti"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-white"
                  >
                    카카오톡 1:1 오픈채팅
                  </a>
                  으로 연락 주세요.
                </p>
              </div>
              <div className="p-12">
                <ContactForm />
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
