/* eslint-disable no-param-reassign */
import { ProductionT, ProductT, TableRowT } from '../types/types';
import { productDictionary } from '../utils/dictionary';

export const transformByProduct = (group: TableRowT[]) => {
    const initProduct = (): ProductT => ({
        sorts: [],
        title: '',
        dateCreation: '',
    });

    return group.reduce<ProductionT>((productionTypes, tableRow) => {
        const { product, sort } = tableRow;
        if (!productionTypes[product]) {
            productionTypes[product] = initProduct();
            productionTypes[product].title = productDictionary[product].title;
        }

        productionTypes[product].sorts.push(sort);
        console.log('hel');
        return productionTypes;
    }, {});
};
