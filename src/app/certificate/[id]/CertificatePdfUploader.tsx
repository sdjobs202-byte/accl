"use client";
import { useEffect } from "react";

export default function CertificatePdfUploader({
  certificateId,
  hasPdf,
}: {
  certificateId: string;
  hasPdf: boolean;
}) {
  useEffect(() => {
    if (hasPdf) return;

    const generate = async () => {
      try {
        const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
          import("html2canvas"),
          import("jspdf"),
        ]);

        const el = document.getElementById("certificate-content");
        if (!el) return;

        const canvas = await html2canvas(el, {
          scale: 1.5,
          useCORS: true,
          logging: false,
        });

        const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
        const imgData = canvas.toDataURL("image/jpeg", 0.72);
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = (canvas.height * pageWidth) / canvas.width;
        pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);

        const blob = pdf.output("blob");
        const fd = new FormData();
        fd.append("pdf", blob, `certificate-${certificateId}.pdf`);
        fd.append("certificateId", certificateId);

        await fetch("/api/certificate/upload-pdf", { method: "POST", body: fd });
      } catch {
        // 조용히 실패 — 다음 방문 시 재시도됨
      }
    };

    generate();
  }, [certificateId, hasPdf]);

  return null;
}
