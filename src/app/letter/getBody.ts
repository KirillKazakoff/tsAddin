/* eslint-disable no-param-reassign */
import { TableRowT, BodyRowT } from '../types/types';
import { groupByProduct, productToString } from '../groupByProduct';
import { transformTable } from '../transformTable';
import { getUniqueVessels } from '../getUniqueVessels';
import { groupByVessel } from '../groupByVessel';

const getBodyRow = (group: TableRowT[]) => {
    const production = groupByProduct(group);

    const bodyRow: BodyRowT = {
        vesselName: group[0].vessel,
        production,
    };

    return bodyRow;
};

export const getBody = (srcTable: any[][], vessels: any[][]) => {
    const transformedTable = transformTable(srcTable);
    const uniqueVessels = getUniqueVessels(vessels);
    const groupsVessel = groupByVessel(uniqueVessels, transformedTable);

    const bodyObj = groupsVessel.reduce<BodyRowT[]>((total, group) => {
        const bodyRow = getBodyRow(group);
        total.push(bodyRow);
        return total;
    }, []);

    // console.log(bodyObj);
    console.log('hey');
    const body = bodyObj.reduce((bodyStr, bodyRow) => {
        const { vesselName, production } = bodyRow;
        bodyStr = `\n${bodyStr} ${vesselName}\n`;

        const productionValues = Object.values(production);
        const productionStr = productionValues.reduce((total, prodVal) => {
            total = `${total}${productToString(prodVal)}`;
            return total;
        }, '');
        console.log(productionStr.trimStart());

        return bodyStr;
    }, '');
    // console.log(bodyObj);
};
