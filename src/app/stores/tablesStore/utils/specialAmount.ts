import { addToAmount, initAmount } from './initAmount';
import { AmountObjT } from '../../../types/typesTables';
import { TableKeyT } from '../tablesStore';

export const initProductAmount = () => {
    return {
        places: initAmount(0, 0, 0),
        priceTotal: initAmount(0, 2, 2),
        placesTotal: initAmount(0, 3, 4),
    };
};
export const addProductAmount = (
    productAmount: AmountObjT,
    rowAmount: AmountObjT,
) => {
    addToAmount(productAmount.places, rowAmount.places.count);
    addToAmount(productAmount.priceTotal, rowAmount.priceTotal.count);
    addToAmount(productAmount.placesTotal, rowAmount.placesTotal.count);
};

export const initBlAmount = (rowType: TableKeyT) => {
    const min = rowType === 'sales' ? 2 : 3;
    const max = rowType === 'sales' ? 2 : 4;

    return {
        places: initAmount(0, 0, 0),
        placesTotal: initAmount(0, min, max),
        placesGross: initAmount(0, min, max),
        priceTotal: initAmount(0, 2, 2),
    };
};

export const addBlAmount = (blAmount: AmountObjT, rowAmount: AmountObjT) => {
    addToAmount(blAmount.places, rowAmount.places.count);
    addToAmount(blAmount.placesTotal, rowAmount.placesTotal.count);
    addToAmount(blAmount.placesGross, rowAmount.placesTotal.count);
    addToAmount(blAmount.priceTotal, rowAmount?.priceTotal?.count);
};
