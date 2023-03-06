/* eslint-disable no-param-reassign */
import {
    selectProductSp,
    selectVesselSp,
} from '../../stores/letterStore/selectProductSp';
import { ProductionInfoT, ProductT, TableRowT } from '../../types/types';
import { isSameSort } from './isSameSort';

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
        const productObj = productionTypes[product];

        if (isSameSort(productObj, details)) {
            productObj.details[0].amount += details.amount;
            return productionTypes;
        }

        productionTypes[product].details.push(details);
        return productionTypes;
    }, {});
};
