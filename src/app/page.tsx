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
                  교육 과정, 자격증, 단체 수강 등 무엇이든 물어보세요. 빠른 시간 내에 답변해 드리겠습니다.
                </p>
                <div className="space-y-4">
                  <p className="flex items-center"><span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-4">✉</span> contact@accl.kr</p>
                  <p className="flex items-center"><span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-4">📞</span> 1588-0000</p>
                </div>
              </div>
              <div className="p-12">
                <form className="space-y-4" action="#">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A92B2B] focus:border-transparent outline-none" placeholder="홍길동" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                    <input type="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A92B2B] focus:border-transparent outline-none" placeholder="example@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>
                    <textarea rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A92B2B] focus:border-transparent outline-none" placeholder="문의하실 내용을 입력해주세요."></textarea>
                  </div>
                  <button type="button" className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors">
                    문의 남기기
                  </button>
                </form>
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
