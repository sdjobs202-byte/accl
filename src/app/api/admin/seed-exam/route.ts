import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // 1. 기존 시험 데이터 초기화 (Cascade 설정으로 Question, Result, Certificate 도 함께 삭제됨)
    await prisma.exam.deleteMany({});

    // 2. 샘플 시험 생성
    const exam = await prisma.exam.create({
      data: {
        title: "AI 프롬프트 엔지니어링 1급 모의고사",
        description: "ACCL에서 제공하는 AI 프롬프트 엔지니어링 자격증 취득을 위한 모의고사입니다. 총 3문항 중 2문항 이상(60점 이상) 맞히면 수료증이 자동 발급됩니다.",
        passingScore: 60,
        questions: {
          create: [
            {
              text: "다음 중 생성형 AI(Generative AI)에 올바른 지시를 내리기 위한 프롬프트 작성의 기본 원칙으로 가장 거리가 먼 것은?",
              options: JSON.stringify([
                "구체적이고 명확한 맥락(Context) 제공",
                "모호하고 추상적인 단어 사용",
                "원하는 출력 형식(Format) 지정",
                "예시(Few-shot) 제공을 통한 의도 전달"
              ]),
              correctAnswer: "모호하고 추상적인 단어 사용"
            },
            {
              text: "LLM(대규모 언어 모델)이 환각(Hallucination) 현상을 일으키는 주된 원인 중 하나는 무엇인가?",
              options: JSON.stringify([
                "학습 데이터의 편향 또는 부족",
                "사용자의 프롬프트가 너무 길어서",
                "서버의 네트워크 연결 속도 저하",
                "모델의 연산 속도가 너무 빨라서"
              ]),
              correctAnswer: "학습 데이터의 편향 또는 부족"
            },
            {
              text: "다음 프롬프트 기법 중, 복잡한 문제를 여러 단계로 나누어 모델이 논리적으로 추론하도록 유도하는 방법은 무엇인가?",
              options: JSON.stringify([
                "Zero-shot Prompting",
                "Role-playing Prompting",
                "Chain-of-Thought (CoT) Prompting",
                "Negative Prompting"
              ]),
              correctAnswer: "Chain-of-Thought (CoT) Prompting"
            }
          ]
        }
      }
    });

    return NextResponse.json({ message: "시험 데이터가 성공적으로 생성되었습니다.", exam });
  } catch (error: any) {
    console.error("SEED ERROR:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
