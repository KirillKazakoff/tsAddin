import { ProductionT } from '../../../../types/typesSP';

export const isProductForAssortiment = (product: ProductionT) => {
    const { name } = product.eng;

    if (!name.includes('crab') && !name.includes('Whelk')) {
        return false;
    }
    return true;
};
