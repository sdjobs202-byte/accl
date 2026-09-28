'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-navigation');
const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '메뉴 열기');
  navigation.classList.remove('is-open');
};

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? '메뉴 열기' : '메뉴 닫기');
  navigation.classList.toggle('is-open', !expanded);
});

navigation.querySelectorAll('a, button').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 681px)').addEventListener('change', closeMenu);

document.querySelectorAll('.learn-link').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const details = document.getElementById(button.getAttribute('aria-controls'));
    button.setAttribute('aria-expanded', String(!expanded));
    details.hidden = expanded;
    button.firstChild.textContent = expanded ? '자세히 보기 ' : '접기 ';
  });
});

const openDialog = dialog => {
  if (!dialog || dialog.open) return;
  document.querySelectorAll('.info-dialog[open]').forEach(open => open.close());
  closeMenu();
  dialog.showModal();
  document.body.classList.add('dialog-open');
};

document.querySelectorAll('[data-dialog]').forEach(button => {
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.dialog);
    openDialog(dialog);
  });
});

document.querySelectorAll('.info-dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.querySelectorAll('.dialog-anchor').forEach(link => link.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('close', () => document.body.classList.toggle('dialog-open', Boolean(document.querySelector('.info-dialog[open]'))));
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
});

document.querySelectorAll('[data-close-dialog]').forEach(button => {
  button.addEventListener('click', () => document.getElementById(button.dataset.closeDialog)?.close());
});

// Announce the upcoming fair once per tab session; manual reopening stays available.
const fairDialog = document.getElementById('jobfair-dialog');
const fairDismissalKey = 'accl-jobfair-20260930-dismissed';
const fairEndsAt = Date.parse('2026-09-30T17:00:00+09:00');
let fairDismissed = false;
try { fairDismissed = sessionStorage.getItem(fairDismissalKey) === '1'; } catch {}
fairDialog.addEventListener('close', () => {
  try { sessionStorage.setItem(fairDismissalKey, '1'); } catch {}
});
if (Date.now() < fairEndsAt && !fairDismissed && !document.querySelector('.info-dialog[open]')) {
  openDialog(fairDialog);
}

if ('IntersectionObserver' in window) {
  const serviceNav = document.querySelector('.nav-link[href="#services"]');
  const homeNav = document.querySelector('.nav-link[href="#home"]');
  new IntersectionObserver(entries => {
    const isServices = entries[0].isIntersecting;
    serviceNav.classList.toggle('active', isServices);
    homeNav.classList.toggle('active', !isServices);
    if (isServices) { serviceNav.setAttribute('aria-current', 'location'); homeNav.removeAttribute('aria-current'); }
    else { homeNav.setAttribute('aria-current', 'page'); serviceNav.removeAttribute('aria-current'); }
  }, { threshold: .2 }).observe(document.getElementById('services'));
}
