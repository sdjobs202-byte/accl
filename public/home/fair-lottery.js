'use strict';
(() => {
  const section = document.getElementById('fair-lottery');
  if (!section) return;
  const button = document.getElementById('fair-lottery-button');
  const panel = document.getElementById('fair-lottery-result');
  const title = document.getElementById('fair-lottery-result-title');
  const message = document.getElementById('fair-lottery-result-message');
  const dialog = document.getElementById('jobfair-dialog');
  let winnerCount = 0;
  const winnerLimit = 3;
  const states = {
    ready: ['오늘의 행운을 만나보세요!', '아래 버튼을 눌러 추첨에 참여해 주세요.', '행운 뽑기'],
    won: ['당첨!', '1시간의 1:1 온라인 면접코칭 기회를 드립니다. 이 화면을 인포메이션에 보여주세요!', '다음 추첨'],
    miss: ['실패', '아쉽지만 이번에는 당첨되지 않았어요. 다시 행운에 도전해 보세요!', '다시 뽑기'],
  };
  function render(next) {
    section.dataset.drawState = next;
    title.textContent = states[next][0];
    message.textContent = states[next][1];
    button.textContent = winnerCount >= winnerLimit ? '추첨 마감' : states[next][2];
    button.disabled = winnerCount >= winnerLimit;
  }

  // Equal-probability buckets, with no server request, cookies or saved state.
  function winsThisDraw() {
    const value = new Uint32Array(1);
    const limit = Math.floor(0x100000000 / 100) * 100;
    do { crypto.getRandomValues(value); } while (value[0] >= limit);
    return value[0] % 100 < 5;
  }

  button.addEventListener('click', () => {
    if (winnerCount >= winnerLimit) return;
    const won = winsThisDraw();
    if (won) winnerCount += 1;
    render(won ? 'won' : 'miss');
    if (dialog.open) panel.focus({ preventScroll: true });
  });
  render('ready');
})();
