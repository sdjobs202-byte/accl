import { supabaseAdmin } from "@/lib/supabase";
import ExamsTable from "./ExamsTable";

export default async function ExamsPage() {
  const { data: exams } = await supabaseAdmin
    .from("Exam")
    .select(
      "id, title, examDate, passingScore, questions:Question(id), results:Result(id, passed)"
    )
    .order("createdAt", { ascending: false });

  return <ExamsTable exams={(exams ?? []) as any} />;
}
