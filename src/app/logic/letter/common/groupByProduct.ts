/* eslint-disable no-param-reassign */
import { MateRowT } from '../../../stores/tablesStore/set/setMates';
import { addToAmount } from '../../../stores/tablesStore/utils/initAmount';
import { ProductT, ProductionInfoT } from '../../../types/typesLetter';
import { groupify } from '../../utils/groupify/groupify';
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

        const productObj = groupify(productionTypes, initProduct(tableRow), product.code);

        const newDetails = { sort, amount: amount.placesTotal };

        if (productObj.details.length === 0) {
            productObj.details.push(newDetails);
            return productionTypes;
        }

        const matchedDetails = productObj.details.find((d) => d.sort === newDetails.sort);
        if (isStOff(newDetails.sort)) {
            addToAmount(productObj.details[0].amount, newDetails.amount.count);
            return productionTypes;
        }

        if (matchedDetails) {
            addToAmount(matchedDetails.amount, newDetails.amount.count);
            return productionTypes;
        }

        productObj.details.push(newDetails);
        return productionTypes;
    }, {});
};
