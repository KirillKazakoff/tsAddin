import { selectSp } from '../../spsStore/select';
import { setTable } from './setTable';

export const setDischargeInvoices = (table: any[][]) => {
    setTable({
        table,
        type: 'dischargeInvoices',
        headers: {
            blNo: 'BL',
            seller: 'Продавец',
            agreementNo: 'Доп',
            vessel: 'Судно',
            product: 'Продукция',
            placesTotal: 'Объем, кг',
            invoiceNo: 'Номер инвойса',
            dateInvoice: 'Дата инвойса',
            dateDischarge: 'Дата выгрузки',
            price: 'Ставка за тн',
            priceTotal: 'Стоимость',
        },
        row: (r) => ({
            agreementNo: r.agreementNo,
            invoiceNo: r.invoiceNo,
            blNo: r.blNo,
            seller: selectSp.seller(r.seller),
            vessel: selectSp.vessel(r.vessel),
            product: selectSp.product(r.product),
            dateDischarge: r.dateDischarge,
            dateInvoice: r.dateInvoice,
            amount: {
                price: r.price,
                placesTotal: r.placesTotal,
                priceTotal: r.priceTotal,
            },
        }),
    });
};
