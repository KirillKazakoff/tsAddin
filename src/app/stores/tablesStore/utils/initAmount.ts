/* eslint-disable no-param-reassign */
import { formatCount } from '../../../logic/utils/formatCount';
import { TableKeyT } from '../tablesStore';

// Amount
export type AmountT = {
    str: string;
    count: number;
    fraction: {
        min: number;
        max: number;
    };
};
export type AmountObjT = Partial<{
    placesTotal: AmountT;
    places: AmountT;
    price: AmountT;
    priceTotal: AmountT;
    placesGross: AmountT;
}>;

export const initAmount = (
    count: number | string,
    fractionMin: number,
    fractionMax: number,
): AmountT => {
    const fixedCount = fractionMin === fractionMax ? +(+count).toFixed(2) : +count;

    const amount = {
        str: formatCount(+count, fractionMin, fractionMax),
        count: fixedCount,
        fraction: {
            min: fractionMin,
            max: fractionMax,
        },
    };

    return amount;
};

export const initAmountObj = (rowType: TableKeyT) => {
    const min = rowType === 'salesT' ? 2 : 3;
    const max = rowType === 'salesT' ? 2 : 4;

    return {
        places: initAmount(0, 0, 0),
        placesTotal: initAmount(0, min, max),
        placesGross: initAmount(0, min, max),
        priceTotal: initAmount(0, 2, 2),
        price: initAmount(0, 2, 2),
    };
};

export const addToAmount = (amount: AmountT, count: number) => {
    amount.count += count;
    amount.str = formatCount(amount.count, amount.fraction.min, amount.fraction.max);
};

export const addToAmountObj = (addTo: AmountObjT, addFrom: AmountObjT) => {
    Object.keys(addTo).forEach((key) => {
        addToAmount(addTo[key], addFrom[key]?.count);
    });
};

export const remainderToZero = (count: number | string) => {
    const str = count.toString();
    const separator = str.includes('.') ? '.' : ',';

    return count
        .toString()
        .split(separator)[1]
        .split('')
        .map(() => '0')
        .join('');
};
