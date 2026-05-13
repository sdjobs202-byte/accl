"use client";

import { useState } from "react";

export default function PrintButton({
  certificateNumber,
  pdfUrl,
}: {
  certificateNumber: string;
  pdfUrl?: string | null;
}) {
  const [busy, setBusy] = useState(false);

  const handleDownload = async () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
      return;
    }

    setBusy(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const el = document.getElementById("certificate-content");
      if (!el) return;

      const canvas = await html2canvas(el, { scale: 2, useCORS: true, logging: false });
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = (canvas.height * pageWidth) / canvas.width;
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, pageWidth, pageHeight);
      pdf.save(`ACCL-Certificate-${certificateNumber}.pdf`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleDownload}
        disabled={busy}
        className="bg-[#A92B2B] hover:bg-red-800 disabled:opacity-60 text-white px-6 py-3 rounded-lg font-bold transition-colors"
      >
        {busy ? "PDF 생성 중..." : "PDF 다운로드"}
      </button>
    </div>
  );
}
