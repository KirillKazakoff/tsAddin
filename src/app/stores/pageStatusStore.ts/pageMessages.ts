/* eslint-disable max-len */
export type PageStatusTypeT =
    | 'notFilledTable'
    | 'excelInEditingMode'
    | 'transportNotFound'
    | 'picturesError'
    | 'unknownError'
    | 'ok'
    | 'noRouteMatchFileName'
    | 'mismatchKonosamentId';

export type PageStatusT = {
    statusType: PageStatusTypeT;
    title: string;
    desc: string;
};

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
export const mismatchKonosamentId = (innerRowKnsId: string): PageStatusT => ({
    statusType: 'mismatchKonosamentId',
    title: 'Несоответствие номеров коносамента',
    desc: `Коносамент с номером ${innerRowKnsId} не был найден в таблице Коносаменты - номер из таблицы Внутренний Рынок должен совпадать с номером в таблице Коносаменты`,
});
export const noRouteMatchFileName = (fileName: string): PageStatusT => ({
    statusType: 'noRouteMatchFileName',
    title: `Данный тип файла не поддерживается - ${fileName}`,
    desc: 'В названии файла должно быть либо "Движение продукции", либо "Sales" либо "Суточные Письмо"',
});

export const initPageStatus = (): PageStatusT => ({
    statusType: 'ok',
    title: 'Вернитесь назад',
    desc: 'Возвращайтесь назад',
});
