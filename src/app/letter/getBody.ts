import { TableRowT, BodyRowT } from '../types/types';
import { groupByProduct } from '../groupByProduct';
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

    return groupsVessel.reduce<BodyRowT[]>((total, group) => {
        const bodyRow = getBodyRow(group);
        total.push(bodyRow);
        return total;
    }, []);
};
