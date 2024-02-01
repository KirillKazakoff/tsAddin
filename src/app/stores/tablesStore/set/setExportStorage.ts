import { getExportRow } from '../getExportRow';
import { setTable } from './setTable';

export const setExportStorage = (table: any[][]) => {
    return setTable({
        table,
        type: 'exportStorageT',
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
            msc: 'MSC',
            product: 'Продукция',
            sort: 'Сорт',
            pack: 'Упаковка',
            places: 'Кол-во мест',
            placesTotal: 'Объем, тн',
            price: 'Цена некоммерческая',
            priceTotal: 'Сумма',
            portTo: 'Порт',
            consignee: 'Получатель',
            portFrom: 'Порт Декларирования',
            id: 'ID',
            idProduct: 'ID_product',
            currency: 'Currency',
        },

        row: (r) => {
            return getExportRow({ ...r, terms: 'EXW' });
        },
    });
};
