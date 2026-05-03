import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password, birthDate } = body;

    if (!email || !name || !password || !birthDate) {
      return new NextResponse("모든 정보를 입력해주세요.", { status: 400 });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
      return new NextResponse("생년월일 형식이 올바르지 않습니다.", { status: 400 });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return new NextResponse("비밀번호는 숫자, 영문자(대소문자 포함), 특수기호를 모두 포함하여 8자 이상이어야 합니다.", { status: 400 });
    }

    const { data: existingUser } = await supabaseAdmin
      .from("User")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return new NextResponse("이미 가입된 이메일입니다.", { status: 400 });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    const { data: user, error } = await supabaseAdmin
      .from("User")
      .insert({
        id: crypto.randomUUID(),
        email,
        name,
        birthDate,
        password: hashedPassword,
        role: "USER",
        createdAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(user);
  } catch (error: any) {
    console.error("REGISTRATION ERROR: ", error);
    return new NextResponse(error.message || "서버 내부 오류가 발생했습니다.", { status: 500 });
  }
}
