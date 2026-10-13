# Scientific Calculator

Проект научного калькулятора. Пока главная страница содержит только заголовок;
интерфейс и вычисления будут добавлены позднее.

Стек: Next.js App Router, React, TypeScript, SCSS Modules и pnpm.
Глобальные стили находятся в `src/app/globals.scss`.

## Запуск

```bash
pnpm install
pnpm dev
```

Приложение доступно на [http://localhost:3000](http://localhost:3000).

## Проверки и сборка

```bash
pnpm exec next typegen
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

После сборки запустить приложение можно командой `pnpm start`.
