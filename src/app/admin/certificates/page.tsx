import { supabaseAdmin } from "@/lib/supabase";
import CertificatesTable from "./CertificatesTable";

export default async function CertificatesPage() {
  const { data: certificates } = await supabaseAdmin
    .from("Certificate")
    .select(
      "*, result:Result(score, user:User(name, email), exam:Exam(title))"
    )
    .order("issueDate", { ascending: false });

  return <CertificatesTable certificates={(certificates ?? []) as any} />;
}
