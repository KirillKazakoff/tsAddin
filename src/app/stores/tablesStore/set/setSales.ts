import { selectSp } from '../../spsStore/select';
import { initAmount } from '../utils/initAmount';
import { setTable } from './setTable';

export const setSales = (table: any[][]) => {
    return setTable({
        table,
        type: 'salesT',
        headers: {
            id: 'Номер',
            contractDate: 'Дата',
            seller: 'Продавец',
            buyer: 'Покупатель',
            blNo: 'BL',
            transport: 'Транспорт',
            dateETA: 'ETA',
            port: 'Порт',
            terms: 'Условия',
            vessel: 'Изготовитель',
            product: 'Продукция',
            sort: 'Сорт',
            places: 'Места',
            pack: 'Тара',
            placesTotal: 'Количество, кг',
            price: 'Цена, USD',
            priceTotal: 'Сумма, USD',
        },
        row: (r) => ({
            id: r.id,
            idContract: r.id,
            contractDate: r.contractDate,
            seller: selectSp.agent(r.seller),
            buyer: selectSp.consignee(r.buyer),
            blNo: r.blNo || '-',
            transport: r.transport,
            dateETA: r.dateETA,
            port: r.port,
            terms: r.terms,
            vessel: r.vessel,
            product: selectSp.productSales(r.product),
            sort: r.sort,
            pack: r.pack,
            amount: {
                places: initAmount(r.places, 0, 0),
                placesTotal: initAmount(r.placesTotal, 2, 2),
                price: initAmount(r.price, 2, 2),
                priceTotal: initAmount(r.priceTotal, 2, 2),
            },
            isLive: r.product.toLowerCase().includes('live'),
        }),
    });
};

export type SalesRowT = ReturnType<typeof setSales>['transformedTable'][number];
