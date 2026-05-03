import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 | ACCL",
  description: "ACCL 서비스 이용약관",
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="border-b border-gray-200 pb-8 mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">이용약관</h1>
          <p className="text-sm text-gray-500">시행일: 2026년 5월 3일</p>
        </header>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제1조 (목적)</h2>
            <p>
              본 약관은 ACCL(이하 &ldquo;회사&rdquo;)이 제공하는 AI 교육 및 자격증 관련 서비스(이하 &ldquo;서비스&rdquo;)의 이용과
              관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제2조 (용어의 정의)</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>&ldquo;서비스&rdquo;라 함은 회사가 제공하는 AI 학습 콘텐츠, 자격증 시험, 수료증 발급 등 일체의 서비스를 의미합니다.</li>
              <li>&ldquo;회원&rdquo;이라 함은 본 약관에 동의하고 회사와 서비스 이용계약을 체결한 자를 말합니다.</li>
              <li>&ldquo;아이디(ID)&rdquo;라 함은 회원의 식별과 서비스 이용을 위해 회원이 등록한 이메일 주소를 의미합니다.</li>
              <li>&ldquo;비밀번호&rdquo;라 함은 회원이 부여 받은 아이디와 일치하는 회원임을 확인하고 회원의 정보 보호를 위해 회원 자신이 정한 문자, 숫자 또는 특수문자의 조합을 말합니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제3조 (약관의 효력 및 변경)</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>본 약관은 서비스를 이용하고자 하는 모든 회원에게 그 효력이 발생합니다.</li>
              <li>회사는 필요하다고 인정되는 경우 본 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지를 통해 공시합니다.</li>
              <li>변경된 약관은 공지 또는 통지한 효력 발생일로부터 효력이 발생합니다.</li>
              <li>회원이 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제4조 (서비스의 제공)</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>회사는 회원에게 다음과 같은 서비스를 제공합니다.
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>AI 관련 학습 콘텐츠 및 강의</li>
                  <li>AI 자격증 시험 응시 및 채점</li>
                  <li>수료증 발급 및 관리</li>
                  <li>기타 회사가 추가로 개발하거나 제공하는 서비스</li>
                </ul>
              </li>
              <li>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. 다만 시스템 점검 등의 사유로 일시적으로 중단될 수 있습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제5조 (회원가입)</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>회원이 되고자 하는 자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.</li>
              <li>회사는 다음 각 호에 해당하는 신청에 대해서는 승낙을 거절하거나 사후에 이용계약을 해지할 수 있습니다.
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
                  <li>허위의 정보를 기재하거나 회사가 제시하는 내용을 기재하지 않은 경우</li>
                  <li>기타 회원으로 등록하는 것이 회사의 운영 정책에 반한다고 판단되는 경우</li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제6조 (회원의 의무)</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>회원은 다음 행위를 하여서는 안 됩니다.
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>타인의 정보를 도용하거나 허위 정보를 등록하는 행위</li>
                  <li>회사가 제공하는 콘텐츠를 무단으로 복제, 배포, 출판하는 행위</li>
                  <li>회사 또는 제3자의 저작권 등 지적재산권을 침해하는 행위</li>
                  <li>자격증 시험 부정행위 또는 수료증 위변조</li>
                  <li>기타 관련 법령 및 본 약관, 운영 정책에 위반되는 행위</li>
                </ul>
              </li>
              <li>회원은 본인의 아이디와 비밀번호를 제3자에게 공개하거나 제공하여서는 안 됩니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제7조 (서비스 이용 제한)</h2>
            <p>
              회사는 회원이 본 약관 또는 운영 정책을 위반하는 경우 사전 통보 없이 서비스 이용을 일시 또는 영구적으로 제한할 수 있습니다.
              특히 자격증 시험 부정행위가 확인된 경우, 발급된 수료증을 무효 처리할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제8조 (책임의 한계)</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>회사는 천재지변, 전쟁, 정전, 통신서비스 장애 등 불가항력적인 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</li>
              <li>회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.</li>
              <li>회사가 제공하는 학습 콘텐츠는 참고용이며, 자격증 시험의 합격이나 특정 결과를 보장하지 않습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제9조 (분쟁 해결 및 관할법원)</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>회사와 회원 간 발생한 분쟁은 상호 협의에 의해 해결함을 원칙으로 합니다.</li>
              <li>협의가 이루어지지 않을 경우, 관련 법령 및 상관례에 따르며 회사 본점 소재지를 관할하는 법원을 합의관할 법원으로 합니다.</li>
            </ol>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">부칙</h2>
            <p>본 약관은 2026년 5월 3일부터 시행됩니다.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
