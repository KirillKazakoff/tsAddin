import { getExportRow } from '../getExportRow';
import { setTable } from './setTable';

/* eslint-disable max-len */
export const setExport = (table: any[][]) => {
    setTable({
        table,
        type: 'export',
        headers: {
            contract: 'Контракт',
            seller: 'Продавец',
            agent: 'Покупатель',
            vessel: 'Судно',
            transport: 'Транспорт',
            agreementNo: 'Дополнение к контракту',
            invoice: 'Инвойс',
            date: 'Дата',
            blMode: 'BL mod',
            blNo: 'BL No',
            portFrom: 'Порт Декларирования',
            terms: 'Условия продажи',
            portTo: 'Порт',
            consignee: 'Получатель (если отличается от покупателя)',
            msc: 'MSC',
            product: 'Продукция',
            sort: 'Сорт',
            pack: 'Упаковка',
            places: 'Кол-во мест',
            placesTotal: 'Объем, тн',
            price: 'Цена',
            priceTotal: 'Сумма',
            id: 'ID',
        },

        row: (r) => getExportRow(r),
    });
};
