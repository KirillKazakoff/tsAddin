import { TableStatusT } from '../../../types/typesTables';

export type TableErrorT = {
    tableName: string;
    desc: string;
    row: number;
    prop: string;
};

export const initTableStatus = (): TableStatusT => ({
    statusType: 'ok',
    title: '',
    desc: '',
});

export const tableError = (error: TableErrorT): TableStatusT => ({
    statusType: 'notFilledTable',
    title: `В таблице ${error.tableName} ошибка`,
    desc: `Ошибка (${error.desc}) в строке ${error.row}, в столбце ${error.prop}`,
});

export const tableEmpty = (tableName: string): TableStatusT => ({
    statusType: 'empty',
    title: `Таблица ${tableName} пуста`,
    desc: 'Заполните таблицу',
});
