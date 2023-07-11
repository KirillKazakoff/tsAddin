/* eslint-disable max-len */
export type PageStatusTypeT =
    | 'notFilledTable'
    | 'excelInEditingMode'
    | 'transportNotFound'
    | 'picturesError'
    | 'unknownError'
    | 'ok';

export type PageStatusT = {
    statusType: PageStatusTypeT;
    title: string;
    desc: string;
};
export type TableErrorT = {
    tableName: string;
    desc: string;
    row: number;
    prop: string;
};

export const tableError = (error: TableErrorT): PageStatusT => ({
    statusType: 'notFilledTable',
    title: `В таблице ${error.tableName} ошибка`,
    desc: `Ошибка (${error.desc}) в строке ${error.row}, в столбце ${error.prop}`,
});
export const excelInEditingMode = (): PageStatusT => ({
    statusType: 'excelInEditingMode',
    title: 'Ячейки в Excel не должны быть активны',
    desc: 'Выйдите из активной ячейки (нажмите tab или enter в excel-таблице)',
});
export const unknownError = (message: string): PageStatusT => ({
    statusType: 'unknownError',
    title: 'Произошла неизвестная ошибка',
    desc: message,
});
export const noPictureFound = (): PageStatusT => ({
    statusType: 'picturesError',
    title: 'Не могу загрузить картинки',
    desc: 'Проверьте наличие вкладки "Картинки"',
});

export const initPageStatus = (): PageStatusT => ({
    statusType: 'ok',
    title: 'Вернитесь назад',
    desc: 'Возвращайтесь...',
});
