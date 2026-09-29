'use strict';
// 참여기업 로고·이름을 누르면 행사 팝업 위에 기업 소개 창을 띄운다.
(() => {
  const dialog = document.getElementById('company-dialog');
  if (!dialog) return;
  const logo = dialog.querySelector('.company-dialog-logo');
  const title = document.getElementById('company-dialog-title');
  const text = document.getElementById('company-dialog-text');
  let opener = null;

  document.querySelectorAll('.fair-company-button').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.querySelector('.fair-company-name').textContent;
      title.textContent = button.dataset.companyTitle || name;
      text.textContent = button.parentElement.querySelector('.fair-company-desc').textContent;
      logo.replaceChildren(button.querySelector('.fair-logo').cloneNode(true));
      opener = button;
      dialog.showModal();
      title.focus({ preventScroll: true });
    });
  });

  dialog.querySelectorAll('.company-dialog-close, .company-dialog-done').forEach(button => {
    button.addEventListener('click', () => dialog.close());
  });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    opener?.focus({ preventScroll: true });
    opener = null;
  });
})();
