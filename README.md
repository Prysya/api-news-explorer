<p align="center">
    <img src="https://res.cloudinary.com/prysya/image/upload/v1600976364/news-explorer-logo_mxqu1g.png" width="1060">
</p>
<p align="center">
    <img alt="Version 0.0.1" src="https://img.shields.io/badge/Version-0.0.1-blue.svg" />
    <img alt="Version 0.0.1" src="https://img.shields.io/badge/Made%20by-Prysya-blueviolet" />
    <img alt="Stars *" src="https://img.shields.io/github/stars/prysya/api-news-explorer?style=flat-square" />
    <img alt="Beta Quality" src="https://img.shields.io/badge/Status-Beta-orange.svg" >
    <img alt="Code Size" src="https://img.shields.io/github/languages/code-size/prysya/api-news-explorer" >
</p>


## Работа с api

К api можно обратиться по адресам:

> `www.api.prysya-news-explorer.tk`
> `api.prysya-news-explorer.tk`
> `84.201.147.94`

## Установка

Для работы необходим [Node.js](https://nodejs.org/).

Склонировать проект, установить зависимости 

```sh
$ git clone https://github.com/Prysya/api-news-explorer.git
$ cd api-news-explorer
$ npm install
```

Запуск локального сервера доступного по ссылке http://localhost:3000/

```sh
$ npm run start
```

Запуск сервера для разработки с hot reload:
```sh
$ npm run dev
```

## Работа

| Метод    | Путь    | Описание                                                              |
| -------- | ------- | --------------------------------------------------------------------- |
|  `POST`  | /signup | Создаёт пользователя с переданными в теле `email`, `password`, `name` | 

- **Пример запроса**

```json
{
  "name": "test",
  "email": "test@test.tk",
  "password": "testtest"
}
```

- **Пример ответа в случае отсутствия ошибок валидации**

```json
{
  "data": {
    "name": "test",
    "email": "test@test.tk"
  }
}
```

| Метод    | Путь    | Описание                                                      |
| -------- | ------- | ------------------------------------------------------------- |
|  `POST`  | /signin | Проверяет переданные в теле почту и пароль и возвращает `JWT` | 

- **Пример запроса**

```json
{
  "name": "test",
  "email": "test@test.tk"
}
```

- **Пример ответа в случае отсутствия ошибок валидации**

```json
{
  "message": "Авторизация прошла успешно"
}
```

| Метод   |  Путь  |                     Описание                          |
| ------- | ------ | ----------------------------------------------------- |
|  `GET`  | /users/me | Возвращает информацию о пользователе (email и имя) | 

- **Пример ответа для неавторизованного пользователя**

```json
{
  "message": "Необходима авторизация"
}
```

- **Пример ответа для авторизованного пользователя**

```json
{
  "data": {
    "name": "test",
    "email": "test@test.tk"
  }
}
```

| Метод   |  Путь  |                     Описание                          |
| ------- | ------ | ----------------------------------------------------- |
|  `POST`  | /articles | создаёт статью с переданными в теле `keyword`, `title`, `text`, `date`, `source`, `link` и `image`| 

- **Пример запроса**

```json
{
  "keyword": "Статья",
  "title": "Новости",
  "text": "Бла-бла-бла",
  "date": "Sun Feb 01 1998 00:00:00 GMT+0000 (GMT)",
  "source": "yandex",
  "link ": "https://yandex.ru",
  "image": "https://yandex.ru/img.jpg"
}
```

- **Пример ответа для неавторизованного пользователя**

```json
{
  "message": "Необходима авторизация"
}
```

- **Пример ответа для авторизованного пользователя в случае отстуствия ошибок валидации**

```json
{
  "message": "Статья успешно добавлена"
}
```

| Метод   |  Путь  |                     Описание                          |
| ------- | ------ | ----------------------------------------------------- |
|  `GET`  | /articles | Возвращает все сохранённые пользователем статьи | 

- **Пример ответа для неавторизованного пользователя**

```json
{
  "message": "Необходима авторизация"
}
```

- **Пример ответа для авторизованного пользователя**

```json
[
  {
      "_id": "5f6ce08e7d4b3b1844c5450b",
      "keyword": "Статья",
      "title": "Новости",
      "text": "Бла-бла-бла",
      "date": "Sun Feb 01 1998 00:00:00 GMT+0000 (GMT)",
      "source": "yandex",
      "link ": "https://yandex.ru",
      "image": "https://yandex.ru/img.jpg",
      "__v": 0
  }
]
```

| Метод   |  Путь  |                     Описание                          |
| ------- | ------ | ----------------------------------------------------- |
|  `DELETE `  | /articles/`:articleId` | Возвращает все сохранённые пользователем статьи | 

- **Пример ответа для неавторизованного пользователя, либо если пользователь пытается удалить не свою карточку**

```json
{
  "message": "Необходима авторизация"
}
```

- **Пример ответа в случае отсуствия статьи**

```json
{
  "message": "Нет статьи с таким id"
}
```

- **Пример ответа в случае успеха пользователя**

```json
{
  "message": "Карточка удалена"
}
```

## Логгирование

В проекта настроено логгирование с помощью библиотеки [winston](https://www.npmjs.com/package/winston) и [express-winston](https://www.npmjs.com/package/express-winston)

Все логи сохраняются в папке `./logs` в `.json` формате

| Название файла | Описание                                             |
| -------------- | ---------------------------------------------------- |
|  `request.log` | Хранит информацию о всех запросах к API              | 
|  `error.log`   | Хранит информацию об ошибках, которые возвращало API | 

## Отдельная благодарность:

<p display="flex">
<img src="https://yastatic.net/q/praktikum/v0.137.16-1594146818/static/favicon-32x32.png" width="20"> <a href="https://praktikum.yandex.ru/profile/web-developer/">Яндекс.Практикум</a>
</p>

