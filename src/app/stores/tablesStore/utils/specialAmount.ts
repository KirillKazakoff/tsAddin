import { addToAmount, initAmount } from './initAmount';
import { AmountObjT } from '../../../types/typesTables';

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

export const initBlAmount = () => {
    return {
        places: initAmount(0, 0, 0),
        placesTotal: initAmount(0, 3, 4),
        placesGross: initAmount(0, 3, 4),
    };
};
export type BlAmountT = ReturnType<typeof initBlAmount>;
export const addBlAmount = (
    blAmount: BlAmountT,
    rowAmount: AmountObjT,
    coefficient: number | null = 1,
) => {
    addToAmount(blAmount.places, rowAmount.places.count);
    addToAmount(blAmount.placesTotal, rowAmount.placesTotal.count);
    addToAmount(blAmount.placesGross, rowAmount.placesTotal.count * coefficient);
};
