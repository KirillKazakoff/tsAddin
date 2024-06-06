import { selectSp } from '../../spsStore/select';
import { initAmount } from '../utils/initAmount';
import { setTable } from './setTable';

export const setStorageInvoices = (table: any[][]) => {
    return setTable({
        table,
        type: 'storageInvoicesT',
        headers: {
            blNo: 'BL',
            agreementNo: 'Доп',
            seller: 'Продавец',
            vessel: 'Судно',
            product: 'Продукция',
            dateStorageStart: 'Начало хранения',
            dateStorageEnd: 'Конец хранения',
            placesTotal: 'Объем на хранении',
            days: 'Дни',
            invoiceNo: 'Номер инвойса',
            dateInvoice: 'Дата инвойса',
            price: 'Ставка за сут*тн',
            priceTotal: 'Стоимость',
            dateAccountSent: 'Дата отправки в бухгалтерию',
        },
        row: (r) => {
            const res = {
                blNo: r.blNo,
                agreementNo: r.agreementNo,
                invoiceNo: r.invoiceNo,
                seller: selectSp.seller(r.seller),
                vessel: selectSp.vessel(r.vessel),
                product: selectSp.product(r.product),
                dateStorageStart: r.dateStorageStart,
                dateStorageEnd: r.dateStorageEnd,
                dateAccountSent: r.dateAccountSent,
                dateInvoice: r.dateInvoice,
                amount: {
                    placesTotal: initAmount(r.placesTotal, 3, 4),
                    price: initAmount(r.price, 2, 2),
                    priceTotal: initAmount(r.priceTotal, 2, 2),
                },
                days: r.days,
            };

            return res;
        },
    });
};
