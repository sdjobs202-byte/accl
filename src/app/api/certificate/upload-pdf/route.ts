import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const pdf = formData.get("pdf") as File | null;
  const certificateId = formData.get("certificateId") as string | null;

  if (!pdf || !certificateId) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const arrayBuffer = await pdf.arrayBuffer();
  const fileName = `certificate-${certificateId}.pdf`;

  const { error } = await supabaseAdmin.storage
    .from("certificates")
    .upload(fileName, arrayBuffer, { contentType: "application/pdf", upsert: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from("certificates").getPublicUrl(fileName);

  const { error: updateError } = await supabaseAdmin
    .from("Certificate")
    .update({ pdfUrl: publicUrl })
    .eq("id", certificateId);

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  return NextResponse.json({ url: publicUrl });
}
