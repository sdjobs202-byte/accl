# ACCL 자격 시험 3종 통합 작업 노트

`TEST-PAGE` 레포의 자격 시험 3종 (AIMC 2급 / AIMC 1급 / AITC)을 메인 `accl` 사이트로 통합한 작업입니다.

## 변경 요약

| 영역 | 파일 | 변경 |
|---|---|---|
| 시험 응시 UI | `src/app/exam/[id]/ExamClient.tsx` | 전면 재작성 (이전/다음·사이드바·진행률·자동저장·제출모달·점수링) |
| 시험 페이지 | `src/app/exam/[id]/page.tsx` | `passingScore` 클라이언트에 전달 |
| 채점 API | `src/app/api/exam/[id]/submit/route.ts` | 응답에 `totalQuestions`/`correctCount`/`passingScore` 추가 |
| 자격 인증 센터 | `src/app/exams/page.tsx` | 신규 — 3종 카드 그리드 + Hero + Info |
| 시험 관리 | `src/app/admin/exams/ExamsTable.tsx` + `page.tsx` | 자격증 필터 + 검색 추가 |
| 자격증 관리 | `src/app/admin/certificates/CertificatesTable.tsx` + `page.tsx` | 자격증 필터 + 정렬 + CSV 다운로드 추가 |
| DB 시드 | `scripts/generate-seed-3-exams.mjs` + `seed-3-exams.sql` | 3종 + 110문제 시드 |

기존 1종 시험은 **AIMC 2급으로 교체**(id 유지) — DB에 기존 응시자 결과는 보존되지만, 시험 문제는 교체됨.

## 적용 순서 (강 대표님 확정 후)

### 1. 로컬 dev 테스트

```bash
cd /tmp/accl-merge/accl-main
git checkout feature/merge-3-exams

# .env.local 파일 만들기 (강 대표님의 Vercel/Cloudflare 환경변수 그대로 복사)
# 필요 변수: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
#           NEXTAUTH_URL, NEXTAUTH_SECRET, RESEND_API_KEY 등

npm install
npm run dev
```

브라우저에서 확인:
- `/exams` — 3종 카드 (시드 적용 후)
- `/exam/[id]` — 시험 응시 (이전/다음·사이드바·키보드 ←→·저장·제출)
- `/admin/exams` — 자격증 필터·검색
- `/admin/certificates` — 자격증 필터·정렬·CSV 다운로드

### 2. Supabase SQL 시드 적용

```bash
# 기존 1종 시험 id 확인 (Supabase 대시보드 → Table Editor → Exam 테이블에서 id 복사)
# 그 id를 두 번째 인자로 넘기면 AIMC 2급으로 교체됨

cd /tmp/accl-merge/accl-main
node scripts/generate-seed-3-exams.mjs /tmp/accl-merge/test-page/data.js <기존-1종-Exam-ID>

# 출력된 scripts/seed-3-exams.sql 파일 전체를 Supabase SQL Editor에 붙여서 실행
```

**중요**: 두 번째 인자(기존 1종 ID)를 안 넘기면 AIMC 2급도 새 UUID로 INSERT 됩니다. 그러면 기존 1종은 별도로 남게 되어 총 4종이 됩니다. 음성에서 *"기존 1종을 신규 3종 중 하나로 교체"* 결정했으므로 ID 매핑 필수입니다.

### 3. 검수 체크리스트

- [ ] `/exams`에서 3종 카드가 표시됨 (AIMC 2급 🥈 / AIMC 1급 🥇 / AITC 🎓)
- [ ] 각 카드 "응시 시작" 클릭 → 시험 응시 페이지 진입
- [ ] 이전/다음 버튼·키보드 ←→ 동작
- [ ] 우측 사이드바: 문제 번호 클릭으로 이동, 답변한 문제 초록색, 현재 문제 빨강
- [ ] 답안 선택 시 자동 저장 (새로고침해도 진행 유지)
- [ ] "저장" 버튼 클릭 시 토스트 알림
- [ ] "제출하기" → 모달 → 채점 → 결과 화면 (점수 링 애니메이션 + 합격/불합격)
- [ ] 합격 시 "수료증 보기" 버튼 → `/certificate/[id]` 이동, 이메일 자동 발송
- [ ] `/admin/exams`에서 자격증 필터·검색 동작
- [ ] `/admin/certificates`에서 필터·정렬·CSV 다운로드 동작 (한글 깨짐 없음)
- [ ] 모바일 (768px 미만)에서 깨지지 않음

### 4. Push & 배포

```bash
cd /tmp/accl-merge/accl-main
git push origin feature/merge-3-exams
```

GitHub에서:
1. PR 생성: `feature/merge-3-exams` → `main`
2. 강 대표님과 Preview URL(Cloudflare/Vercel) 확인
3. 머지 → 자동 배포

## 디자인 결정 사항

- **라이트 톤 유지** — 메인 브랜드 컬러 `#A92B2B` 빨강 사용
- test-page의 다크 다크/그라디언트는 모두 라이트로 재해석
- 점수 링: 합격 시 초록 그라디언트, 불합격 시 빨강→주황

## 후속 작업 (선택)

- **`/exams` 진입점 추가**: 메인 헤더 / Dashboard에 "자격 인증 센터" 링크
- **이메일 템플릿**: 자격증명 3종에 맞게 Resend 템플릿 분기 (선택)
- **OG 이미지**: `/exams` 페이지용 og-image (선택)
