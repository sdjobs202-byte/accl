import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | ACCL",
  description: "ACCL 개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="border-b border-gray-200 pb-8 mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">개인정보처리방침</h1>
          <p className="text-sm text-gray-500">시행일: 2026년 5월 3일</p>
        </header>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">
          <section>
            <p>
              ACCL(이하 &ldquo;회사&rdquo;)은 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을
              신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제1조 (개인정보의 처리 목적)</h2>
            <p className="mb-3">회사는 다음의 목적을 위하여 개인정보를 처리하며, 이용 목적이 변경되는 경우 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>회원 가입 및 관리: 회원 자격 유지·관리, 본인확인, 부정이용 방지</li>
              <li>서비스 제공: 학습 콘텐츠 제공, 자격증 시험 응시 및 채점, 수료증 발급</li>
              <li>고충처리: 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보</li>
              <li>마케팅 및 광고에의 활용 (선택 동의 시): 신규 서비스 안내, 이벤트 정보 제공</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제2조 (수집하는 개인정보 항목)</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">필수항목</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>이메일 주소, 비밀번호 (암호화 저장), 이름</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">자동 수집 항목</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>접속 IP 주소, 쿠키, 서비스 이용 기록, 접속 로그</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">서비스 이용 시 생성되는 정보</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>시험 응시 기록, 점수, 수료증 발급 정보</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제3조 (개인정보의 보유 및 이용기간)</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>회사는 정보주체로부터 개인정보를 수집할 때 동의 받은 보유·이용기간 또는 법령에 따른 보유·이용기간 내에서 개인정보를 처리·보유합니다.</li>
              <li>구체적인 처리 및 보유기간은 다음과 같습니다.
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>회원 가입 및 관리: 회원 탈퇴 시까지</li>
                  <li>시험 및 수료증 발급 기록: 발급일로부터 5년</li>
                  <li>접속 로그 및 IP 기록: 통신비밀보호법에 따라 3개월</li>
                  <li>전자상거래 관련 기록: 전자상거래법에 따라 5년</li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제4조 (개인정보의 제3자 제공)</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>회사는 정보주체의 개인정보를 제1조에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 제3자에게 제공합니다.</li>
              <li>현재 회사는 정보주체의 개인정보를 제3자에게 제공하지 않습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제5조 (개인정보 처리의 위탁)</h2>
            <p className="mb-3">회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다.</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">위탁받는 자</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">위탁업무 내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 text-sm border-b border-gray-200">Supabase Inc.</td>
                    <td className="px-4 py-3 text-sm border-b border-gray-200">데이터베이스 호스팅 및 인증 서비스</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm border-b border-gray-200">Vercel Inc.</td>
                    <td className="px-4 py-3 text-sm border-b border-gray-200">웹 호스팅 및 콘텐츠 전송</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제6조 (정보주체의 권리·의무 및 행사방법)</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>정보주체는 회사에 대해 언제든지 다음 각 호의 권리를 행사할 수 있습니다.
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>개인정보 열람 요구</li>
                  <li>오류 등이 있을 경우 정정 요구</li>
                  <li>삭제 요구</li>
                  <li>처리정지 요구</li>
                </ul>
              </li>
              <li>제1항에 따른 권리 행사는 회사에 대해 서면, 전자우편 등을 통해 하실 수 있으며, 회사는 이에 대해 지체 없이 조치하겠습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제7조 (개인정보의 안전성 확보 조치)</h2>
            <p className="mb-3">회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육</li>
              <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 비밀번호 암호화</li>
              <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제8조 (쿠키의 운용 및 거부 방법)</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>회사는 이용자에게 맞춤화된 서비스를 제공하기 위해 쿠키(Cookie)를 사용합니다.</li>
              <li>쿠키는 웹사이트가 이용자의 브라우저에 보내는 작은 데이터 파일로, 이용자의 컴퓨터 하드디스크에 저장됩니다.</li>
              <li>이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 이 경우 일부 서비스 이용에 제한이 있을 수 있습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제9조 (개인정보 보호책임자)</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="mb-2"><span className="font-semibold">성명:</span> ACCL 개인정보 보호책임자</p>
              <p className="mb-2"><span className="font-semibold">이메일:</span> contact@accl.kr</p>
              <p className="text-sm text-gray-500 mt-3">
                정보주체는 개인정보 처리에 관한 문의·불만처리·피해구제 등에 관한 사항을 위 연락처로 문의하실 수 있습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제10조 (권익침해 구제방법)</h2>
            <p className="mb-3">정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>개인정보분쟁조정위원회: (국번없이) 1833-6972 / www.kopico.go.kr</li>
              <li>개인정보침해신고센터: (국번없이) 118 / privacy.kisa.or.kr</li>
              <li>대검찰청 사이버수사과: (국번없이) 1301 / www.spo.go.kr</li>
              <li>경찰청 사이버수사국: (국번없이) 182 / ecrm.police.go.kr</li>
            </ul>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">부칙</h2>
            <p>본 개인정보처리방침은 2026년 5월 3일부터 적용됩니다.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
