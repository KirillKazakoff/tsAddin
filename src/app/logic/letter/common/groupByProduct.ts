/* eslint-disable no-param-reassign */
import { selectProductSp, selectVesselSp } from '../../../stores/spsStore/select';
import { addToAmount } from '../../../stores/tablesStore/utils/initAmount';
import { ProductT, ProductionInfoT } from '../../../types/typesLetter';
import { MateRowT } from '../../../types/typesTables';
import { isStOff } from './isStOff';

const initProduct = (tableRow: MateRowT): ProductT => {
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

export const groupByProduct = (groupVessel: MateRowT[]): ProductionInfoT => {
    return groupVessel.reduce<ProductionInfoT>((productionTypes, tableRow) => {
        const { product, sort, amount } = tableRow;

        let productObj = productionTypes[product];
        if (!productObj) {
            productObj = initProduct(tableRow);
            productionTypes[product] = productObj;
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

        productionTypes[product].details.push(details);
        return productionTypes;
    }, {});
};
