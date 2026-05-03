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

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

const { data: admins, error: listErr } = await supabase
  .from("User")
  .select("id, email")
  .eq("role", "ADMIN");

if (listErr) { console.error(listErr); process.exit(1); }
console.log("Admins to remove:", admins);

for (const a of admins) {
  const { data: results } = await supabase
    .from("Result")
    .select("id")
    .eq("userId", a.id);
  const resultIds = (results ?? []).map((r) => r.id);
  console.log(`  ${a.email}: ${resultIds.length} result(s) attached`);

  if (resultIds.length) {
    const { error: certDelErr } = await supabase
      .from("Certificate")
      .delete()
      .in("resultId", resultIds);
    if (certDelErr) console.error("  cert delete:", certDelErr);

    const { error: resDelErr } = await supabase
      .from("Result")
      .delete()
      .eq("userId", a.id);
    if (resDelErr) console.error("  result delete:", resDelErr);
  }

  const { error: userDelErr } = await supabase
    .from("User")
    .delete()
    .eq("id", a.id);
  if (userDelErr) {
    console.error(`  USER DELETE FAILED for ${a.email}:`, userDelErr);
  } else {
    console.log(`  ✓ deleted ${a.email}`);
  }
}

const { data: remaining } = await supabase
  .from("User")
  .select("id, email, role")
  .eq("role", "ADMIN");
console.log("\nRemaining admins:", remaining);
