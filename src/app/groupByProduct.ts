/* eslint-disable no-param-reassign */
import { ProductionT, ProductT, TableRowT } from './types/types';
import { productDictionary } from './utils/dictionary';

const initProduct = (tableRow: TableRowT): ProductT => {
    const { product, vessel, periodCreation } = tableRow;
    const dictionary = productDictionary[product];

    return {
        details: [],
        info: {
            desc: {
                standart: dictionary.standart,
                expirationDate: dictionary.expirationDate,
                pack: dictionary.pack,
                title: dictionary.title,
            },
            producer: vessel,
            periodCreation,
        },
    };
};

export const groupByProduct = (groupVessel: TableRowT[]): ProductionT => {
    return groupVessel.reduce<ProductionT>((productionTypes, tableRow) => {
        const { product, sort, amount } = tableRow;
        if (!productionTypes[product]) {
            productionTypes[product] = initProduct(tableRow);
        }

        const details = { sort, amount };
        productionTypes[product].details.push(details);
        return productionTypes;
    }, {});
};
