/* eslint-disable no-param-reassign */
import { addToAmount } from '../../../stores/tablesStore/utils/initAmount';
import { ProductT, ProductionInfoT } from '../../../types/typesLetter';
import { MateRowT } from '../../../types/typesTables';
import { isStOff } from './isStOff';

const initProduct = (tableRow: MateRowT): ProductT => {
    const { product, vessel } = tableRow;

    return {
        details: [],
        info: {
            desc: { ...product },
            producer: vessel,
        },
    };
};

export const groupByProduct = (groupVessel: MateRowT[]): ProductionInfoT => {
    return groupVessel.reduce<ProductionInfoT>((productionTypes, tableRow) => {
        const { product, sort, amount } = tableRow;

        let productObj = productionTypes[product.codeName];
        if (!productObj) {
            productObj = initProduct(tableRow);
            productionTypes[product.codeName] = productObj;
        }

        const details = { sort, amount: amount.total };

        const matchedDetails = productObj.details.find((d) => d.sort === sort);
        if (isStOff(sort)) {
            addToAmount(productObj.details[0].amount, details.amount.count);
            return productionTypes;
        }

        if (matchedDetails) {
            addToAmount(matchedDetails.amount, details.amount.count);
            return productionTypes;
        }

        productionTypes[product.codeName].details.push(details);
        return productionTypes;
    }, {});
};
