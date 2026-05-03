const fs = require('fs');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const mdContent = fs.readFileSync('c:\\Users\\sdjob\\Downloads\\accl 시험문제\\AIMC 문제 추출 354a827fa39d8012b55ffe606176c49d.md', 'utf-8');

// The file has questions separated by "---" OR just empty lines before the next question.
// A better way is to split by "정답:" to separate blocks, or find patterns.
// Pattern: Optional numbers, then question text, then options, then "정답: X"

const lines = mdContent.split('\n').map(l => l.trim());

const questions = [];
let currentQuestionText = null;
let currentOptions = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line || line === '---' || line.startsWith('#') || line.match(/^\d+$/)) {
    continue;
  }
  
  if (line.startsWith('정답:')) {
    const answerKey = line.replace('정답:', '').trim();
    const keyMap = { '①': 0, '②': 1, '③': 2, '④': 3, '⑤': 4 };
    const answerIndex = keyMap[answerKey] ?? 0;
    const correctAnswer = currentOptions[answerIndex];
    
    if (currentQuestionText && currentOptions.length > 0 && correctAnswer) {
      questions.push({
        text: currentQuestionText,
        options: [...currentOptions],
        correctAnswer: correctAnswer
      });
    }
    currentQuestionText = null;
    currentOptions = [];
  } else if (line.match(/^[①②③④⑤]/)) {
    const optText = line.replace(/^[①②③④⑤]\s*/, '').trim();
    currentOptions.push(optText);
  } else {
    // It's the question text
    if (!currentQuestionText) {
      // Sometimes questions have numbers like "10\n멀티모달 AI는 무엇인가?". 
      // The `if (line.match(/^\d+$/))` above skips numbers.
      currentQuestionText = line;
    } else {
      currentQuestionText += ' ' + line;
    }
  }
}

console.log(`Parsed ${questions.length} questions.`);

const SUPABASE_URL = "https://uqcqnjtezebkvzdexmlk.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxY3FuanRlemVia3Z6ZGV4bWxrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzE3NjQwMiwiZXhwIjoyMDkyNzUyNDAyfQ.6iqqI_nsOuan3wTI2xzrKCIJBsriTa4QYEZbtuhMs6E";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  const { data: exams, error: examsErr } = await supabase.from('Exam').select('*');
  if (examsErr) throw examsErr;

  let examId;
  if (exams.length === 0) {
    console.log('No exams found. Creating one...');
    examId = crypto.randomUUID(); // using UUID for ID since Prisma's cuid() isn't here
    const { data: newExam, error: newExamErr } = await supabase.from('Exam').insert({
      id: examId,
      title: 'AI Marketing Certification',
      description: 'AIMC 자격증 시험입니다.',
      passingScore: 70
    }).select().single();
    if (newExamErr) throw newExamErr;
  } else {
    examId = exams[0].id;
    console.log(`Using existing exam ID: ${examId}`);
  }

  const { error: delErr } = await supabase.from('Question').delete().eq('examId', examId);
  if (delErr) throw delErr;
  console.log('Deleted existing questions.');

  const questionsToInsert = questions.map(q => ({
    id: crypto.randomUUID(),
    examId: examId,
    text: q.text,
    options: JSON.stringify(q.options),
    correctAnswer: q.correctAnswer
  }));

  const { error: insErr } = await supabase.from('Question').insert(questionsToInsert);
  if (insErr) throw insErr;
  
  console.log(`Successfully inserted ${questionsToInsert.length} questions.`);
}

main().catch(console.error);
