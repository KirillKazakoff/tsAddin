/* eslint-disable @typescript-eslint/indent */
import { selectSp } from '../../spsStore/select';
import { initAmount } from '../utils/initAmount';
import { setTable } from './setTable';

export const setDischargeInvoices = (table: any[][]) => {
    return setTable({
        table,
        type: 'dischargeInvoicesT',
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
                price: initAmount(r.price, 2, 2),
                placesTotal: initAmount(r.placesTotal, 4, 4),
                priceTotal: initAmount(r.priceTotal, 4, 4),
            },
        }),
    });
};

export type InvoiceKTIRowT = ReturnType<
    typeof setDischargeInvoices
>['transformedTable'][number] &
    Partial<{
        dateAccountSent: number;
        operation: string;
        days: number;
        operationResult: number;
        dateStorageStart: number;
        dateStorageEnd: number;
    }>;
