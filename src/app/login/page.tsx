"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const callback = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (callback?.error) {
      setError("이메일 또는 비밀번호가 일치하지 않습니다.");
      setLoading(false);
    } else if (callback?.ok) {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F9FAFB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <div className="w-12 h-12 bg-[#A92B2B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-[#A92B2B] w-6 h-6" />
          </div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ACCL의 다양한 서비스를 이용해보세요.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={loginUser}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일 주소</label>
              <input
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A92B2B] focus:border-transparent sm:text-sm"
                placeholder="example@accl.kr"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
              <input
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A92B2B] focus:border-transparent sm:text-sm"
                placeholder="********"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#A92B2B] hover:bg-[#8e2323] focus:outline-none transition-colors disabled:bg-gray-400"
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            아직 계정이 없으신가요?{" "}
            <Link href="/register" className="font-medium text-[#A92B2B] hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
