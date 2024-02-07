/* eslint-disable @typescript-eslint/indent */
import { getExportRow } from '../getExportRow';
import tablesStore from '../tablesStore';
import { setTable } from './setTable';

export const setExport = (table: any[][]) => {
    const transformed = setTable({
        table,
        type: 'exportT',
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
            idProduct: 'ID_product',
            currency: 'Currency',
        },

        row: (r) => {
            const res = getExportRow(r);

            let declarationNo = tablesStore.customsT.find(
                (cR) => cR.blNo === r.blNo,
            )?.declarationNo;

            if (!declarationNo) declarationNo = '';

            return { ...res, declarationNo };
        },
    });

    return transformed;
};

export type ExportRowT = ReturnType<typeof setExport>[number] &
    Partial<{
        date: any;
        hcNo: any;
        coNo: any;
        iuuNo: any;
        country: any;
    }>;
