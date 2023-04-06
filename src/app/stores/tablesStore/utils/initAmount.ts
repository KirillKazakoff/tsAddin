import { formatCount } from '../../../logic/utils/formatCount';
import { AmountT } from '../../../types/typesTables';

export const initAmount = (
    count?: number,
    fractionMin?: number,
    fractionMax?: number,
): AmountT => {
    if (!count) {
        return {
            str: '0',
            count: 0,
        };
    }
    const amount = { str: formatCount(count, fractionMin, fractionMax), count };
    return amount;
};
