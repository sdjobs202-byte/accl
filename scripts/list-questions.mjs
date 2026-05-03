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
const { data, error } = await supabase.from("Question").select("id, examId, text, options");
if (error) { console.error(error); process.exit(1); }

for (const q of data) {
  let opts;
  try { opts = JSON.parse(q.options); } catch { opts = q.options; }
  console.log(`[${Array.isArray(opts) ? opts.length : "?"}지선다] ${q.text.slice(0, 50)}...`);
}
