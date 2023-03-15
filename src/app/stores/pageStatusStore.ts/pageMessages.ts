import { PageStatusT } from '../../types/typesStore';

export const letterNotFulfilled: PageStatusT = {
    isError: true,
    desc: 'Проверьте таблицу (коносаменты), заполните пустые ячейки либо удалите пустые строки',
    title: 'В таблице (Коносаменты) ошибка',
};

export const blNotFulfilled: PageStatusT = {
    isError: true,
    desc: 'Проверьте таблицу (экспорт), заполните пустые ячейки либо удалите пустые строки',
    title: 'В таблице (Экспорт) ошибка',
};
