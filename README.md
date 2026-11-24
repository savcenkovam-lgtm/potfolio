# Портфолио — вёрстка

Стек: HTML + SCSS + Vite.

## Запуск

1. Установите Node.js (LTS) с nodejs.org.
2. Откройте эту папку в терминале (в VS Code: Terminal → New Terminal) и выполните:

```
npm install
npm run dev
```

3. Откройте адрес, который покажет терминал (обычно http://localhost:5173).

Сборка для хостинга: `npm run build` — готовый сайт появится в папке `dist`.

## Структура

```
index.html            главная
src/scss/_tokens.scss цвета, шрифты, размеры из Figma
src/scss/_base.scss   сброс стилей и общие классы
src/scss/_components.scss кнопки, пилюли, навигация
src/scss/_home.scss   стили главной
src/js/main.js        подключение стилей, автозапуск видео при прокрутке
src/assets/           изображения (WebP) и видео (MP4)
public/               файлы, которые копируются как есть (сюда можно положить новое CV)
```

## Что заполнить

- Ссылки на Telegram, LinkedIn, Email и CV: во всех HTML-файлах стоят заглушки `href="#"`.
- Lato SemiBold: в Google Fonts его нет, сейчас вместо него Bold. Если есть файл
  `Lato-Semibold.woff2`, положите его в `src/assets/fonts/` и раскомментируйте
  `@font-face` в `src/scss/_fonts.scss`.
