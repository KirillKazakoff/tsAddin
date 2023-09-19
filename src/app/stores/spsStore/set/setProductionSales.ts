/* eslint-disable no-param-reassign */
import { ProductionSalesT, ProductionsSalesT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setProductionSales = (spRange: any[][]) => {
    const production = spRange.reduce<ProductionsSalesT>((total, row) => {
        const [name, codeName, expirationDate] = row;
        const rowObj: ProductionSalesT = {
            name,
            codeName,
            expirationDate,
        };

        total[codeName] = rowObj;
        return total;
    }, {});

    spsStore.setSp.productionSales(production);
};
