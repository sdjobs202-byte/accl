/**
 * test-page의 data.js를 읽어 Supabase 시드 SQL을 생성합니다.
 *
 * 사용:
 *   node scripts/generate-seed-3-exams.mjs <test-page-data.js 경로> [<기존-1종-Exam-ID>]
 *
 * 출력: scripts/seed-3-exams.sql
 *
 * 동작:
 *   - AIMC 2급은 기존 1종의 id를 유지(있다면)하고 데이터만 교체합니다.
 *   - AIMC 1급, AITC는 새 UUID로 INSERT됩니다.
 *   - 각 시험의 기존 Question은 전부 삭제 후 재생성됩니다.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dataJsPath = process.argv[2];
const existingAimc2Id = process.argv[3] ?? null;

if (!dataJsPath) {
  console.error(
    "Usage: node scripts/generate-seed-3-exams.mjs <test-page-data.js 경로> [<기존-1종-Exam-ID>]"
  );
  process.exit(1);
}

// data.js는 브라우저용이라 `const TESTS_DATA = [...]` 형태. 평가해서 가져옴.
const rawJs = readFileSync(resolve(process.cwd(), dataJsPath), "utf-8");
// global에 TESTS_DATA 노출되도록 sandbox 평가
const sandbox = {};
// eslint-disable-next-line no-new-func
const fn = new Function("sandbox", `${rawJs}\nsandbox.TESTS_DATA = TESTS_DATA;`);
fn(sandbox);

const tests = sandbox.TESTS_DATA;
if (!Array.isArray(tests) || tests.length === 0) {
  console.error("data.js에서 TESTS_DATA를 읽지 못했습니다.");
  process.exit(1);
}

const lines = [];
lines.push("-- =============================================================");
lines.push("-- ACCL 자격 시험 3종 시드 (AIMC 2급 / AIMC 1급 / AITC)");
lines.push(`-- 생성: ${new Date().toISOString()}`);
lines.push("-- =============================================================");
lines.push("");
lines.push("BEGIN;");
lines.push("");

const idMap = {};

for (const test of tests) {
  let examId;
  const isAimc2 = test.id === "aimc2";
  if (isAimc2 && existingAimc2Id) {
    examId = existingAimc2Id;
    lines.push(`-- ${test.fullName}: 기존 id ${existingAimc2Id} 유지 (UPDATE)`);
    lines.push(
      `UPDATE "Exam" SET title=$$${test.fullName}$$, description=$$${test.abbr} 공식 자격 시험$$, "passingScore"=${test.passingScore} WHERE id=$$${existingAimc2Id}$$;`
    );
    lines.push(`DELETE FROM "Question" WHERE "examId"=$$${existingAimc2Id}$$;`);
  } else {
    examId = randomUUID();
    lines.push(`-- ${test.fullName}: 신규 INSERT (id ${examId})`);
    lines.push(
      `INSERT INTO "Exam" (id, title, description, "passingScore", "createdAt") VALUES ($$${examId}$$, $$${test.fullName}$$, $$${test.abbr} 공식 자격 시험$$, ${test.passingScore}, NOW())`
    );
    lines[lines.length - 1] +=
      ` ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, description=EXCLUDED.description, "passingScore"=EXCLUDED."passingScore";`;
    lines.push(`DELETE FROM "Question" WHERE "examId"=$$${examId}$$;`);
  }
  idMap[test.id] = examId;

  // 문제 INSERT
  for (const q of test.questions) {
    const qid = randomUUID();
    const optionsJson = JSON.stringify(q.options).replace(/\$\$/g, "$ $");
    const correctAnswer = q.options[q.answer];
    const correctAnswerSafe = correctAnswer.replace(/\$\$/g, "$ $");
    const textSafe = q.text.replace(/\$\$/g, "$ $");
    lines.push(
      `INSERT INTO "Question" (id, "examId", text, options, "correctAnswer") VALUES ($$${qid}$$, $$${examId}$$, $$${textSafe}$$, $$${optionsJson}$$, $$${correctAnswerSafe}$$);`
    );
  }
  lines.push("");
}

lines.push("COMMIT;");
lines.push("");
lines.push("-- ID 매핑 (참고):");
for (const [key, id] of Object.entries(idMap)) {
  lines.push(`--   ${key} → ${id}`);
}

const outPath = resolve(__dirname, "seed-3-exams.sql");
writeFileSync(outPath, lines.join("\n"), "utf-8");

console.log(`✅ SQL 시드 생성 완료: ${outPath}`);
console.log(`   AIMC 2급 id: ${idMap.aimc2}`);
console.log(`   AIMC 1급 id: ${idMap.aimc1}`);
console.log(`   AITC    id: ${idMap.aitc}`);
console.log("");
console.log("다음 단계:");
console.log("  1) Supabase 대시보드 → SQL Editor");
console.log(`  2) ${outPath} 내용 복사·실행`);
