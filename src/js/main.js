import '../scss/main.scss';

// Видео в карточках проектов: играют, только когда видны на экране.
const videos = document.querySelectorAll('video[data-autoplay]');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.play().catch(() => {});
        } else {
          target.pause();
        }
      });
    },
    { threshold: 0.25 },
  );
  videos.forEach((v) => io.observe(v));
} else {
  videos.forEach((v) => v.play().catch(() => {}));
}

// Мобильное меню (кнопка-«бургер»)
const burger = document.querySelector('.burger');

if (burger) {
  const toggleMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  };

  burger.addEventListener('click', () => {
    toggleMenu(!document.body.classList.contains('menu-open'));
  });

  document.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });
}

// Теги на первом экране: сами разъезжаются после загрузки страницы,
// за 2с (ease-out), без привязки к мышке. Стартуют вместе с их появлением.
const heroTitle = document.querySelector('.hero__title-wrap');
const isDesktop = window.matchMedia('(min-width: 768px)');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (heroTitle && 'animate' in Element.prototype && isDesktop.matches && !reduceMotion.matches) {
  // Смещения в макете заданы для кегля 308px — пересчитываем под текущий
  const fs = parseFloat(getComputedStyle(heroTitle).fontSize);
  heroTitle.querySelectorAll('[data-dx]').forEach((el) => {
    const dx = parseFloat(el.dataset.dx) * fs;
    const dy = parseFloat(el.dataset.dy) * fs;
    el.animate(
      [{ translate: '0px 0px' }, { translate: `${dx}px ${dy}px` }],
      { duration: 2000, delay: 850, easing: 'cubic-bezier(0, 0, 0.58, 1)', fill: 'both' },
    );
  });
}

// Плавающее меню: показываем, как только страницу начали прокручивать
const updateNav = () => {
  document.body.classList.toggle('nav-visible', window.scrollY > 4);
};

let navTicking = false;
window.addEventListener('scroll', () => {
  if (navTicking) return;
  navTicking = true;
  requestAnimationFrame(() => {
    updateNav();
    navTicking = false;
  });
}, { passive: true });

updateNav();

// Появление блоков при прокрутке — только на главной: проекты и «Напишите мне».
// По принципу первого экрана: сначала строка с названием, описанием и кнопкой,
// затем плашка с видео. Запускается, когда блок зашёл на экран на 20%.
const revealBlocks = document.querySelectorAll('.page-home .cases > .case, .page-home .contacts');

if (revealBlocks.length && 'IntersectionObserver' in window && !reduceMotion.matches) {
  // Шаг 1 — вся строка проекта (теги, название, счётчик, описание, кнопка)
  // и весь блок «Напишите мне»; шаг 2 — плашка с видео
  const STEP_1 = '.tags, .case__title, .case__counter, .case__desc, .btn, :scope > .tag, .contacts__title-wrap, .contacts__lead';
  const STEP_2 = '.panel';

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.add('is-visible');
        revealObserver.unobserve(target);
      });
    },
    { rootMargin: '0px 0px -20% 0px', threshold: 0 },
  );

  revealBlocks.forEach((block) => {
    block.querySelectorAll(STEP_1).forEach((el) => el.classList.add('reveal-1'));
    block.querySelectorAll(STEP_2).forEach((el) => el.classList.add('reveal-2'));
    block.classList.add('reveal');
    revealObserver.observe(block);
  });
}
