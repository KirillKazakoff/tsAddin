/* eslint-disable no-param-reassign */
import { TableRowT, BodyRowT } from '../types/types';
import { groupByProduct, productToString } from './groupBy/groupByProduct';
import { groupByVessel } from './groupBy/groupByVessel';

const getBodyRow = (group: TableRowT[]) => {
    const production = groupByProduct(group);

    const bodyRow: BodyRowT = {
        vesselName: group[0].vessel,
        production,
    };

    return bodyRow;
};

export const getBody = (table: TableRowT[], vessels: string[]) => {
    const groupsVessel = groupByVessel(vessels, table);

    const bodyObj = groupsVessel.reduce<BodyRowT[]>((total, group) => {
        const bodyRow = getBodyRow(group);
        total.push(bodyRow);
        return total;
    }, []);

    const body = bodyObj.reduce((bodyStr, bodyRow) => {
        const { production, vesselName } = bodyRow;

        const productionValues = Object.values(production);
        const productionStr = productionValues.reduce((total, prodVal) => {
            total = `${total}${productToString(prodVal)}`;
            return total;
        }, '');

        bodyStr = `\n${bodyStr}${vesselName}\n${productionStr}`;

        return bodyStr;
    }, '');

    return body;
};
