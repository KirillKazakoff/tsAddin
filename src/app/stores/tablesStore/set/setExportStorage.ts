import { ExportInitRowT } from '../../../types/typesTables';
import { getExportRow } from '../getExportRow';
import { setTable } from './setTable';

export const setExportStorage = (table: any[][]) => {
    setTable({
        table,
        type: 'exportStorage',
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
        },

        row: (r) => {
            const rowInit: ExportInitRowT = { ...r, terms: 'EXW' };
            return getExportRow(rowInit);
        },
    });
};
