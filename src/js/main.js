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
