import { selectSp } from '../../spsStore/select';
import { initAmount } from '../utils/initAmount';
import { setTable } from './setTable';

export const setNordmile = (table: any[][]) => {
    return setTable({
        table,
        type: 'nordmileT',
        headers: {
            producer: 'Изготовитель',
            contractNo: 'Договор',
            contractDate: 'Дата',
            seller: 'Продавец',
            buyer: 'Покупатель',
            product: 'Наименование',
            pack: 'Упаковка',
            placesTotal: 'Кол-во, кг',
            price: 'Цена, руб',
            priceTotal: 'Сумма, руб',
            bankSeller: 'Банк',
            paymentDate: 'Дата оплаты',
        },
        row: (r) => ({
            producer: r.producer,
            contractNo: r.contractNo,
            contractDate: r.contractDate,
            seller: selectSp.seller(r.seller),
            buyer: r.buyer,
            product: r.product,
            pack: r.pack,
            amount: {
                placesTotal: initAmount(r.placesTotal, 2, 2),
                price: initAmount(r.price, 2, 2),
                priceTotal: initAmount(r.priceTotal, 2, 2),
            },
            bankSeller: r.bankSeller,
            paymentDate: r.paymentDate,
        }),
    });
};

export type NordmileRowT = ReturnType<typeof setNordmile>['transformedTable'][number];
