# Страница редиректа Vision Flow Bot

Переходник для передачи gclid (Google Ads) и yclid (Яндекс.Директ) в Telegram-бота.

## Деплой

1. Загрузите `index.html` на ваш хостинг (GitHub Pages, Netlify, и т.д.)
2. Убедитесь, что URL страницы совпадает с `REDIRECT_LANDING_URL` в .env бота (по умолчанию: `https://visionflow-ai.github.io/Telegram-Bot/`)

## Использование

### Яндекс.Директ
Финальный URL в объявлении:
```
https://ваш-домен/?utm_source=yandex&utm_medium=cpc&utm_campaign=НАЗВАНИЕ&yclid={logid}
```

### Google Ads
Финальный URL в объявлении:
```
https://ваш-домен/?gclid={gclid}&utm_source=google&utm_medium=cpc&utm_campaign=НАЗВАНИЕ
```

Плейсхолдер `{gclid}` автоматически заменится на Click ID при клике.
