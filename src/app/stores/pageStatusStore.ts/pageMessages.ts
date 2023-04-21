/* eslint-disable max-len */
import { PageStatusT } from '../../types/typesStore';

type TableErrorT = {
    tableName: string;
    row: number;
    prop: string;
};
export const tableNotFulfilled = (error: TableErrorT): PageStatusT => ({
    statusType: 'notFilledTable',
    title: `В таблице ${error.tableName} ошибка`,
    desc: `Ошибка в строке ${error.row}, в столбце ${error.prop}`,
});

export const excelInEditingMode = (): PageStatusT => ({
    statusType: 'excelInEditingMode',
    title: 'Ячейки в Excel не должны быть активны',
    desc: 'Выйдите из активной ячейки (нажмите tab или enter в excel-таблице)',
});

export const transportNotFound = (): PageStatusT => ({
    statusType: 'transportNotFound',
    title: 'Не найден транспорт',
    desc: 'Не могу найти указанный транспорт в первой строке таблицы "Коносаменты" в БД, проверьте правильность заполнения либо обновите связи в Excel',
});
