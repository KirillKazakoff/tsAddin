import { setTable } from './setTable';

export const setDT = (table: any[][]) => {
    return setTable({
        table,
        type: 'dtT',
        headers: {
            id: 'Номер ДТ',
            type: 'Вид ДТ',
            prevDt: 'Предшествующее ДТ',
            passport: 'Паспорт сделки',
            productNo: 'Номер товара',
            bl: 'BL',
            agreementNo: 'Доп',
            invoiceNo: 'Инвойс',
            productID: 'Код товара',
            places: 'Места',
            placesTotal: 'Количество',
            rate: 'Курс валюты',
            priceTotal: 'Сумма товара руб',
            priceUSD: 'Сумма товара $',
            terms: 'Условия',
            vessel: 'Судно',
            declarant: 'Декларант',
            consignee: 'Получатель',
        },
        row: (r) => ({
            id: r.id,
            bl: r.bl,
            agreementNo: r.agreementNo,
        }),
    });
};

export type DTRowT = ReturnType<typeof setDT>[number];
