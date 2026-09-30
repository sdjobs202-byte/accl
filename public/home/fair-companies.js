'use strict';
// 참여기업 로고·이름을 누르면 행사 팝업 위에 기업 소개 창을 띄운다.
(() => {
  const dialog = document.getElementById('company-dialog');
  if (!dialog) return;
  const logo = dialog.querySelector('.company-dialog-logo');
  const title = document.getElementById('company-dialog-title');
  const text = document.getElementById('company-dialog-text');
  const site = document.getElementById('company-dialog-site');
  const jobsToggle = document.getElementById('company-dialog-jobs-toggle');
  const jobsPanel = document.getElementById('company-dialog-jobs');
  const jobsBody = document.getElementById('company-dialog-jobs-body');
  let opener = null;

  // 채용공고는 각 기업 li 안의 숨은 .fair-company-jobs 내용을 보여준다. 아직 없으면 준비 중 안내만 띄운다.
  const setJobsOpen = open => {
    if (!jobsToggle || !jobsPanel) return;
    jobsToggle.setAttribute('aria-expanded', String(open));
    jobsPanel.hidden = !open;
  };
  const fillJobs = item => {
    if (!jobsBody) return;
    const source = item.querySelector('.fair-company-jobs');
    if (source && source.innerHTML.trim()) {
      jobsBody.innerHTML = source.innerHTML;
    } else {
      const empty = document.createElement('p');
      empty.className = 'company-dialog-jobs-empty';
      empty.textContent = '채용공고를 준비하고 있어요. 곧 이곳에서 확인할 수 있어요.';
      jobsBody.replaceChildren(empty);
    }
  };
  jobsToggle?.addEventListener('click', () => {
    const open = jobsToggle.getAttribute('aria-expanded') !== 'true';
    setJobsOpen(open);
    if (open) jobsPanel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });

  document.querySelectorAll('.fair-company-button').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.querySelector('.fair-company-name').textContent;
      title.textContent = button.dataset.companyTitle || name;
      text.textContent = button.parentElement.querySelector('.fair-company-desc').textContent;
      logo.replaceChildren(button.querySelector('.fair-logo').cloneNode(true));
      // 홈페이지 주소가 확인된 기업만 '홈페이지 방문' 버튼을 보여준다.
      const url = button.dataset.companyUrl;
      if (site) {
        site.hidden = !url;
        if (url) site.href = url; else site.removeAttribute('href');
      }
      fillJobs(button.parentElement);
      setJobsOpen(false);
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
