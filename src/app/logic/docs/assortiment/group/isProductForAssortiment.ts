import { ProductionT } from '../../../../stores/spsStore/set/setProduction';

export const isProductForAssortiment = (product: ProductionT) => {
    const { name } = product.eng;

    if (!name.includes('crab') && !name.includes('Whelk')) {
        return false;
    }
    return true;
};
