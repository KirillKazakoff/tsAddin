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

export const productToString = (product: ProductT) => {
    const { details, info } = product;
    const { desc, producer, periodCreation } = info;
    const {
        standart, expirationDate, pack, title,
    } = desc;

    const detailsStr = details.reduce((total, detailsObj) => {
        const { amount, sort } = detailsObj;
        const detailsRow = `- ${title} ${sort} - ${amount} кг`;
        total = `${total}${detailsRow}\n`;
        return total;
    }, '');

    const producerStr = `Изготовитель:${producer}`;
    const periodStr = `Период изготовления: ${periodCreation}`;
    const descStr = `${pack}\n${producerStr}\n${expirationDate}\n${standart}\n${periodStr}\n`;
    const productStr = `${detailsStr}\n${descStr}\n`;

    return productStr;
};
