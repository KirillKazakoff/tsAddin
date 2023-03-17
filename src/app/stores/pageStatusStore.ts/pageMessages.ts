/* eslint-disable max-len */
import { PageStatusT } from '../../types/typesStore';

export const letterNotFulfilled: PageStatusT = {
    statusType: 'notFilledTable',
    desc: 'Проверьте таблицу (коносаменты), заполните пустые ячейки либо удалите пустые строки',
    title: 'В таблице (Коносаменты) ошибка',
};

export const blNotFulfilled: PageStatusT = {
    statusType: 'notFilledTable',
    desc: 'Проверьте таблицу (экспорт), заполните пустые ячейки либо удалите пустые строки',
    title: 'В таблице (Экспорт) ошибка',
};

export const tableNotFulfilled = (table: string): PageStatusT => ({
    statusType: 'notFilledTable',
    title: `В таблице ${table} ошибка`,
    desc: `Проверьте таблицу ${table} заполните пустые ячейки либо удалите пустые строки`,
});

// export const appNotSynched = (table: string): PageStatusT => ({
//     statusType: 'notSynched',
//     title: 'Обновите приложение',
//     desc: `Таблица ${table} была обновлена, нажмите на кнопку обновить, чтобы синхронизировать приложение`,
// });
