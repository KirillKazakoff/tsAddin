/* eslint-disable max-len */
import { PageStatusT } from '../../types/typesStore';

export const tableNotFulfilled = (table: string): PageStatusT => ({
    statusType: 'notFilledTable',
    title: `В таблице ${table} ошибка`,
    desc: `Проверьте таблицу ${table} заполните пустые ячейки либо удалите пустые строки`,
});

export const blSame = (table: string): PageStatusT => ({
    statusType: 'sameBl',
    title: `В таблице ${table} одинаковые Bl!`,
    desc: 'Исправьте одинаковые Bl',
});
