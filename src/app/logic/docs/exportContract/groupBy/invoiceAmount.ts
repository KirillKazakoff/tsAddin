import {
    addToAmount,
    initAmount,
} from '../../../../stores/tablesStore/utils/initAmount';
import { InvoiceAmountT } from '../../../../types/typesContract';
import { AmountObjT } from '../../../../types/typesTables';

export const initInvoiceAmount = () => {
    return {
        places: initAmount(0, 0, 0),
        priceTotal: initAmount(0, 3, 4),
        placesTotal: initAmount(0, 3, 3),
    };
};

export const addInvoiceAmount = (
    invoiceAmount: InvoiceAmountT,
    rowAmount: AmountObjT,
) => {
    addToAmount(invoiceAmount.places, rowAmount.places.count);
    addToAmount(invoiceAmount.priceTotal, rowAmount.priceTotal.count);
    addToAmount(invoiceAmount.placesTotal, rowAmount.placesTotal.count);
};

export const initBlAmount = () => {
    return {
        places: initAmount(0, 0, 0),
        placesTotal: initAmount(0, 3, 4),
    };
};

export type BlAmountT = ReturnType<typeof initBlAmount>;

export const addBlAmount = (blAmount: BlAmountT, rowAmount: AmountObjT) => {
    addToAmount(blAmount.places, rowAmount.places.count);
    addToAmount(blAmount.placesTotal, rowAmount.placesTotal.count);
};
