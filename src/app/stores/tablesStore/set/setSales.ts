import { selectSp } from '../../spsStore/select';
import { initAmount } from '../utils/initAmount';
import { setTable } from './setTable';

export const setSales = (table: any[][]) => {
    setTable({
        table,
        type: 'sales',
        headers: {
            id: 'Номер контракта',
            contractDate: 'Дата контракта',
            seller: 'Продавец',
            buyer: 'Покупатель',
            blNo: 'Номер B/L',
            transport: 'Транспорт',
            dateETA: 'ETA',
            port: 'Порт',
            terms: 'Условия',
            vessel: 'Изготовитель',
            product: 'Продукция',
            sort: 'Сорт',
            places: 'Кол-во мест',
            pack: 'Тара',
            placesTotal: 'Количество, кг.',
            price: 'Цена, USD',
            priceTotal: 'Сумма, USD',
            certificateDate: 'Срок получения сертификатов',
        },
        row: (r) => ({
            id: r.id,
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
            certificateDate: r.certificateDate,
            isLive: r.product.toLowerCase().includes('live'),
        }),
    });
};
