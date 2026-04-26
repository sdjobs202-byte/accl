import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("모든 정보를 입력해주세요.", { status: 400 });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return new NextResponse("비밀번호는 숫자, 영문자(대소문자 포함), 특수기호를 모두 포함하여 8자 이상이어야 합니다.", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      }
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.error("REGISTRATION ERROR: ", error);
    if (error.code === 'P2002') {
      return new NextResponse("이미 가입된 이메일입니다.", { status: 400 });
    }
    return new NextResponse(error.message || "서버 내부 오류가 발생했습니다.", { status: 500 });
  }
}
