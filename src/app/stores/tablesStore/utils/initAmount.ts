/* eslint-disable no-param-reassign */
import { formatCount } from '../../../logic/utils/formatCount';
import { AmountObjT, AmountT } from '../../../types/typesTables';

export const initAmount = (
    count: number,
    fractionMin: number,
    fractionMax: number,
): AmountT => {
    const amount = {
        str: formatCount(count, fractionMin, fractionMax),
        count,
        fraction: {
            min: fractionMin,
            max: fractionMax,
        },
    };

    return amount;
};

export const addToAmount = (amount: AmountT, count: number) => {
    amount.count += count;
    amount.str = formatCount(amount.count, amount.fraction.min, amount.fraction.max);
};

export const addToAmountObj = (addTo: AmountObjT, addFrom: AmountObjT) => {
    Object.keys(addTo).forEach((key) => addToAmount(addTo[key], addFrom[key].count));
};
