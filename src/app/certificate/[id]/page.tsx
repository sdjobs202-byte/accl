import { supabaseAdmin } from "@/lib/supabase";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import PrintButton from "./PrintButton";
import CertificatePdfUploader from "./CertificatePdfUploader";

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const { id } = await params;
  const userRole = (session.user as any).role;

  const { data: certificate } = await supabaseAdmin
    .from("Certificate")
    .select("*, result:Result(*, exam:Exam(*), user:User(*))")
    .eq("id", id)
    .single();

  const isOwner = certificate?.result?.user?.email === session.user.email;
  const isAdmin = userRole === "ADMIN";

  if (!certificate || (!isOwner && !isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            권한이 없거나 수료증을 찾을 수 없습니다.
          </h1>
          <Link href="/dashboard" className="text-[#A92B2B] hover:underline">
            대시보드로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  let displayCertNum = certificate.certificateNumber;
  if (displayCertNum.startsWith("ACCL")) {
    displayCertNum = "0101";
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div
        id="certificate-content"
        className="relative w-full max-w-[794px] aspect-[1/1.414] bg-white shadow-2xl overflow-hidden print:shadow-none print:w-[210mm] print:h-[297mm] print:max-w-none print:aspect-auto"
      >
        <div className="absolute inset-[4%]">
          <Image
            src="/img/aimc2.png"
            alt="Certificate Background"
            fill
            className="object-fill print:object-fill"
            priority
          />
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none">
          <div
            className="absolute top-[8.5%] right-[10%] bg-white px-2 py-1 text-black text-[14px] md:text-[15px] whitespace-nowrap"
            style={{
              fontFamily: "'GyeonMyeongjo', 'Batang', 'Nanum Myeongjo', serif",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              transform: "scaleX(0.95)",
              transformOrigin: "right",
            }}
          >
            발급번호 : 제 AIMC 2026-{displayCertNum} 호
          </div>

          <div className="absolute top-[41.5%] left-[45%] text-black text-lg md:text-xl font-serif tracking-widest font-medium">
            {certificate.result?.user?.name}
          </div>

          <div className="absolute top-[44.8%] left-[45%] text-black text-lg md:text-xl font-serif tracking-widest font-medium">
            {(() => {
              const bd = certificate.result?.user?.birthDate;
              if (!bd) return "";
              const m = String(bd).match(/^(\d{4})-(\d{2})-(\d{2})/);
              return m ? `${m[1].slice(2)}.${m[2]}.${m[3]}` : "";
            })()}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4 print:hidden">
        <PrintButton certificateNumber={displayCertNum} pdfUrl={certificate.pdfUrl} />
        {isAdmin ? (
          <Link
            href="/admin/certificates"
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-bold transition-colors"
          >
            관리자 페이지로
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-bold transition-colors"
          >
            대시보드로 돌아가기
          </Link>
        )}
      </div>

      <CertificatePdfUploader certificateId={certificate.id} hasPdf={!!certificate.pdfUrl} />
    </div>
  );
}
