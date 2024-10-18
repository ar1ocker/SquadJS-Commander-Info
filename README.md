# ⭐ If it's useful, give it a star ⭐
# SquadJS-Commander-Info

# English

A plugin for Squads that outputs the CMD of the sides to the general chat (yellow) after a certain time after the start of the map

## Installation

Installation is similar to any other plugin for SquadJS

Copy the `commanders-info.js` file and the `commanders-info-locales` translations folder to the `squadjs/squad-server/plugins` folder

Configure the plugin in your `config.json`

## Settings

Four parameters are available

```js
language: {
  required: false,
  description: "The language of the plugin",
  default: "en"
},
startSearchTimeout: {
  required: false,
  description: 'Timeout after the start of the match, after which the first check for side commanders for both teams is performed, in ms',
  default: 10 * 60 * 1000
},
repeatSearchTimeout: {
  required: false,
  description: 'Timeout for repeated checks to see if the team leaders for both teams have appeared, in ms',
  default: 5 * 60 * 1000
},
countMaxSearch: {
  required: false,
  description: 'Number of checks',
  default: 3
}
```

# Russian

Плагин для SquadJS который выводит CMD сторон в общий чат (желтый) через определенное время после старта карты

## Установка

Установка происходит аналогично другим любым плагинам для SquadJS

Скопируйте файл `commanders-info.js` и папку с переводами `commanders-info-locales` в папку `squadjs/squad-server/plugins`

Настройте плагин в вашем `config.json`

## Настройка

Доступно четыре параметра, стандартно доступны 2 языка

```js
language: {
  required: false,
  description: "The language of the plugin",
  default: "en"
},
startSearchTimeout: {
  required: false,
  description: 'Таймаут после начала матча, после которого идёт первая проверка на наличие командиров сторон за обе команды, в мс',
  default: 10 * 60 * 1000
},
repeatSearchTimeout: {
  required: false,
  description: 'Таймаут для повторных проверок, а появились ли командиры сторон за обе команды, в мс',
  default: 5 * 60 * 1000
},
countMaxSearch: {
  required: false,
  description: 'Количество проверок',
  default: 3
}
```
