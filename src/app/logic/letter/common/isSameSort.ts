import { ProductT, DetailsT } from '../../../types/types';

export const isSameSort = (product: ProductT, details: DetailsT) => {
    const firstDetails = product.details[0];

    if (!firstDetails) return false;
    if (firstDetails.sort === 'ST' || firstDetails.sort === 'OFF') return true;
    if (firstDetails.sort !== details.sort) return false;

    return true;
};

export const isStOff = (sort: string) => {
    if (sort === 'ST' || sort === 'OFF') return true;
    return false;
};
