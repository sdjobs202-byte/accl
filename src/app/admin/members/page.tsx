import { supabaseAdmin } from "@/lib/supabase";

export default async function MembersPage() {
  const { data: users } = await supabaseAdmin
    .from("User")
    .select("*, results:Result(id, passed)")
    .eq("role", "USER")
    .order("createdAt", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">회원 관리</h1>
        <span className="text-sm text-gray-500">총 {(users ?? []).length}명</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">이름</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">생년월일</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">이메일 (아이디)</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">가입일</th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">응시 횟수</th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">취득 자격증</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(users ?? []).map((u: any) => {
              const passedResults = u.results.filter((r: any) => r.passed);
              return (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-gray-500">{u.birthDate || "-"}</td>
                  <td className="px-4 py-3 text-gray-500">{u.email}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString("ko-KR")}
                  </td>
                  <td className="px-4 py-3 text-center">{u.results.length}회</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        passedResults.length > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {passedResults.length}개
                    </span>
                  </td>
                </tr>
              );
            })}
            {(users ?? []).length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  등록된 회원이 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
