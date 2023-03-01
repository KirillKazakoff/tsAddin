/* eslint-disable no-param-reassign */
import {
    selectProductSp,
    selectVesselSp,
} from '../../stores/select/selectProductSp';
import { ProductionInfoT, ProductT, TableRowT } from '../../types/types';

const initProduct = (tableRow: TableRowT): ProductT => {
    const { product, vessel, periodCreation } = tableRow;
    const productSp = selectProductSp(product);
    const vesselSp = selectVesselSp(vessel);

    return {
        details: [],
        info: {
            desc: { ...productSp },
            producer: vesselSp,
            periodCreation,
        },
    };
};

export const groupByProduct = (groupVessel: TableRowT[]): ProductionInfoT => {
    return groupVessel.reduce<ProductionInfoT>((productionTypes, tableRow) => {
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
        standart, expirationDate, pack, name,
    } = desc;

    const detailsStr = details.reduce((total, detailsObj) => {
        const { amount, sort } = detailsObj;
        const detailsRow = `- ${name} ${sort} - ${amount} кг`;
        total = `${total}${detailsRow}\n`;
        return total;
    }, '');

    const producerStr = `Изготовитель:${producer}`;
    const periodStr = `Период изготовления: ${periodCreation}`;
    const descStr = `${pack}\n${producerStr}\n${expirationDate}\n${standart}\n${periodStr}\n`;
    const productStr = `${detailsStr}\n${descStr}\n`;

    return productStr;
};
