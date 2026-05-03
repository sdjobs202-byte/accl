import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env", import.meta.url), "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const { data: exams } = await supabase
  .from("Exam")
  .select("id, title, passingScore, createdAt")
  .order("createdAt", { ascending: true });

for (const e of exams) {
  const { count } = await supabase
    .from("Question")
    .select("id", { count: "exact", head: true })
    .eq("examId", e.id);
  console.log(`[${e.id.slice(0, 8)}] "${e.title}" — ${count} 문항, pass=${e.passingScore}`);
}
