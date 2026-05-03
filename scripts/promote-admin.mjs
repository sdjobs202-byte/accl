import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const TARGET_EMAIL = process.argv[2];
if (!TARGET_EMAIL) {
  console.error("Usage: node scripts/promote-admin.mjs <email>");
  process.exit(1);
}

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

const { data: user, error: findErr } = await supabase
  .from("User")
  .select("id, email, name, role")
  .eq("email", TARGET_EMAIL)
  .maybeSingle();

if (findErr) { console.error(findErr); process.exit(1); }

if (!user) {
  console.log(`✗ ${TARGET_EMAIL} 계정이 아직 없습니다. 사이트에서 회원가입 후 다시 실행하세요.`);
  process.exit(0);
}

console.log("Found user:", user);

const { error: updErr } = await supabase
  .from("User")
  .update({ role: "ADMIN" })
  .eq("id", user.id);

if (updErr) { console.error("Update failed:", updErr); process.exit(1); }
console.log(`✓ ${TARGET_EMAIL} → ADMIN 승격 완료`);
