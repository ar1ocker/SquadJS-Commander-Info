# SquadJS-Commander-Info
Плагин для SquadJS который выводит CMD сторон в общий чат (желтый) через определенное время после старта карты

## Установка

Установка происходит аналогично другим любым плагинам для SquadJS

## Настройка

Доступно три параметра

```js
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
