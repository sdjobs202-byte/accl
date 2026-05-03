import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

const env = Object.fromEntries(
  readFileSync(new URL("../.env", import.meta.url), "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// 1) target exam
const { data: exams } = await supabase.from("Exam").select("id, title");
if (!exams || exams.length === 0) { console.error("no exam"); process.exit(1); }
const targetExam = exams[0];
console.log(`Target exam: "${targetExam.title}" (${targetExam.id})`);

// 2) all 30 questions parsed from the markdown
const CIRCLED = ["①", "②", "③", "④", "⑤"];
const idx = (mark) => CIRCLED.indexOf(mark);

const raw = [
  ["프롬프트(Prompt)의 의미로 가장 적절한 것은?",
    ["AI 모델", "AI에게 주는 명령 또는 질문", "데이터 저장 방식", "서버 구조", "네트워크 시스템"], "②"],
  ["Chain of Thought 프롬프팅의 목적은 무엇인가?",
    ["답변 속도를 무조건 빠르게 만들기 위해", "AI가 단계적으로 사고하도록 유도하기 위해", "이미지 해상도를 높이기 위해", "파일 형식을 변환하기 위해", "데이터 저장 공간을 줄이기 위해"], "②"],
  ["AI를 활용한 콘텐츠 제작 예로 적절한 것은?",
    ["블로그 글 작성", "마케팅 콘텐츠 생성", "광고 문구 생성", "보고서 작성", "모두 해당"], "⑤"],
  ["멀티모달 AI의 특징으로 가장 적절한 것은?",
    ["텍스트 처리만 가능", "여러 데이터 유형을 동시에 처리", "이미지 생성만 가능", "음성 분석만 가능", "데이터 저장 기능"], "②"],
  ["다음 중 생성형 AI 도구에 해당하는 것은?",
    ["ChatGPT", "Midjourney", "Claude", "Gemini", "모두 해당"], "⑤"],
  ["AI 시스템 사용 시 가장 먼저 고려해야 할 요소는 무엇인가?",
    ["시스템 속도", "데이터 양", "개인정보 보호", "화면 디자인", "저장 공간"], "③"],
  ["프롬프트의 의미로 가장 적절한 것은?",
    ["데이터", "명령", "코드", "서버", "모델"], "②"],
  ["AI 윤리에서 공정성(Fairness)이 의미하는 것은 무엇인가?",
    ["AI가 빠르게 작동하는 것", "특정 집단에 불리하지 않도록 설계하는 것", "데이터가 많아지는 것", "프로그램이 복잡해지는 것", "서버 성능 향상"], "②"],
  ["다음 중 책임감 있는 AI 사용의 예는 무엇입니까?",
    ["동의 없이 개인 데이터 업로드", "AI 출력 사용 전 검증", "회사 기밀 데이터 공유", "AI에 대한 이해 없이 사용", "윤리적 문제를 무시함"], "②"],
  ["AI 발전 요인 중 가장 적절한 것은?",
    ["데이터", "컴퓨팅", "알고리즘", "네트워크", "모두 해당"], "⑤"],
  ["생산성 향상에 있어 AI 도구의 주된 목적은 무엇인가요?",
    ["모든 인간을 대체", "효율성 증대 및 업무 지원", "하드웨어 저장", "전력 제어", "인터넷 대체"], "②"],
  ["AI 활용 시 리스크 발생 요인으로 가장 적절한 것은?",
    ["편향 발생", "오류 발생", "윤리 문제", "데이터 문제", "모두 해당"], "⑤"],
  ["Gemini(제미니)의 장점을 가장 잘 설명하는 특징은 무엇입니까?",
    ["오프라인에서만 작동", "Google 서비스(문서, 검색 등)와 연동", "이미지 생성만 가능", "텍스트 처리 불가", "모바일 기기에서만 작동"], "②"],
  ["효과적인 프롬프트를 작성하는 방법으로 가장 적절한 것은?",
    ["질문을 최대한 모호하게 작성한다", "역할, 목적, 형식을 구체적으로 제시한다", "한 단어만 입력한다", "결과 검토 없이 바로 사용한다", "지시 없이 예시만 제공한다"], "②"],
  ["생성형 AI를 업무에 활용하는 가장 적절한 사례는 무엇인가?",
    ["보고서 초안 작성", "회의록 요약", "아이디어 브레인스토밍", "이메일 문안 작성", "모두 해당"], "⑤"],
  ["다음 중 AI를 활용한 업무 생산성 향상 사례로 가장 적절한 것은?",
    ["반복 문서 작성 자동화", "데이터 정리 지원", "초안 작성 시간 단축", "자료 요약 자동화", "모두 해당"], "⑤"],
  ["AI를 활용한 자동화의 대표 사례로 가장 적절한 것은?",
    ["반복 이메일 초안 자동 작성", "회의록 요약 자동화", "FAQ 응답 초안 생성", "보고서 템플릿 작성 지원", "모두 해당"], "⑤"],
  ["AI 기술이 사회에 미칠 수 있는 영향으로 옳은 것은?",
    ["업무 자동화", "산업 구조 변화", "생산성 향상", "새로운 직업 창출", "모두 해당"], "⑤"],
  ["AI를 업무 지원 도구로 사용할 때 가장 바람직한 태도는 무엇인가?",
    ["AI 결과를 참고하되 사람이 검토하고 최종 판단한다", "AI 결과를 무조건 정답으로 사용한다", "윤리 기준 없이 최대한 빠르게 배포한다", "개인정보를 자유롭게 입력한다", "검토 없이 자동 게시한다"], "①"],
  ["다음 중 생성형 AI 도구에 해당하는 것은?",
    ["ChatGPT", "Midjourney", "DALL·E", "Stable Diffusion", "모두 해당"], "⑤"],
  ["AI 모델 학습 과정에서 데이터를 사용하는 목적으로 가장 적절한 것은?",
    ["디자인", "패턴 학습", "인터넷 연결", "파일 저장", "화면 표시"], "②"],
  ["ChatGPT의 학습에 사용자 데이터를 사용하지 못하도록 하려면 어떤 설정을 조정해야 하는가?",
    ["테마 설정", "개인 설정", "데이터 제어/개인 정보 보호 설정", "언어 설정", "플러그인 설정"], "③"],
  ["AI의 핵심 기술에 해당하지 않는 것은?",
    ["머신러닝", "딥러닝", "자연어 처리", "운영체제", "컴퓨터 비전"], "④"],
  ["AI 모델 성능을 향상시키는 방법으로 적절한 것은?",
    ["데이터 증가", "알고리즘 개선", "학습 반복", "모델 튜닝", "모두 해당"], "⑤"],
  ["AI가 이미지 분석에 사용하는 기술은?",
    ["자연어 처리", "컴퓨터 비전", "데이터베이스", "서버 관리", "웹 기술"], "②"],
  ["AI 기술의 사회적 영향으로 가장 적절한 것은?",
    ["산업 변화", "업무 자동화", "생산성 향상", "새로운 직업 창출", "모두 해당"], "⑤"],
  ["AI 사용 시 보호해야 하는 정보가 아닌 것은?",
    ["개인정보", "금융정보", "의료정보", "민감정보", "오픈소스정보"], "⑤"],
  ["AI의 정의로 가장 적절한 것은 무엇인가?",
    ["데이터를 저장하는 기술", "인간의 지능을 모방하여 학습과 추론을 수행하는 기술", "단순 계산 프로그램", "인터넷 검색 시스템", "데이터베이스 관리 기술"], "②"],
  ["머신러닝의 특징으로 가장 적절한 것은?",
    ["규칙만 사용함", "데이터를 기반으로 학습함", "사람이 직접 계산함", "결과만 저장함", "프로그램만 실행함"], "②"],
  ["AI 도구를 업무에 사용 시 가장 안전한 방법은 무엇인가?",
    ["회사 데이터를 자유롭게 입력", "고객 개인 정보 공유", "민감하거나 기밀 정보 입력 금지", "출력 검토 없이 AI 사용", "모든 보안 설정 비활성화"], "③"],
];

console.log(`Parsed ${raw.length} questions from markdown.`);

// 3) build inserts
const rows = raw.map(([text, options, correctMark]) => {
  const i = idx(correctMark);
  if (i < 0 || i >= options.length) throw new Error(`bad correct mark for: ${text}`);
  return {
    id: randomUUID(),
    examId: targetExam.id,
    text,
    options: JSON.stringify(options),
    correctAnswer: options[i],
  };
});

const { error: delErr, count: deletedCount } = await supabase
  .from("Question")
  .delete({ count: "exact" })
  .eq("examId", targetExam.id);
if (delErr) { console.error("delete error:", delErr); process.exit(1); }
console.log(`Deleted ${deletedCount ?? "?"} existing questions.`);

const { error } = await supabase.from("Question").insert(rows);
if (error) { console.error("insert error:", error); process.exit(1); }

const { count } = await supabase
  .from("Question")
  .select("id", { count: "exact", head: true })
  .eq("examId", targetExam.id);

console.log(`✓ inserted ${rows.length} questions. total now: ${count}`);
