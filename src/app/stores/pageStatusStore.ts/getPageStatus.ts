const statuses = [
    'excelInEditingMode',
    'unknownError',
    'picturesError',
    'mismatchKonosamentId',
    'noRouteMatchFileName',
    'ok',
] as const;

export type PageStatusKeyT = (typeof statuses)[number];
export type PageStatusT = {
    statusType: PageStatusKeyT;
    title: string;
    desc: string;
};
export const initPageStatus = (): PageStatusT => ({
    statusType: 'ok',
    title: 'Вернитесь назад',
    desc: 'Возвращайтесь назад',
});

export const getPageStatus = (key: PageStatusKeyT, message?: string) => {
    const status = initPageStatus();
    status.statusType = key;

    switch (key) {
        case 'unknownError':
            status.title = 'Произошла неизвестная ошибка';
            status.desc = message;
            break;
        case 'picturesError':
            status.title = 'Не получается загрузить изображения';
            status.desc = 'Проверьте наличие вкладки "Картинки" и наличие необходимого изображения в этой вкладке';
            break;
        case 'excelInEditingMode':
            status.title = 'Ячейки в Excel не должны быть активны';
            status.desc = 'Выйдите из активной ячейки (нажмите tab или enter в excel-таблице)';
            break;
        case 'mismatchKonosamentId':
            status.title = 'Несоответствие номеров коносамента';
            status.desc = `Коносамент с номером ${message} не был найден в таблице Коносаменты - номер из таблицы Внутренний Рынок должен совпадать с номером в таблице Коносаменты`;
            break;
        case 'noRouteMatchFileName':
            status.title = `Данный тип файла не поддерживается - ${message}`;
            status.desc = 'В названии файла должно быть либо "Движение продукции", либо "Sales" либо "Письмо заявки"';
            break;
        default:
            break;
    }

    return status;
};
