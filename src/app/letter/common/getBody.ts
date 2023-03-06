/* eslint-disable no-param-reassign */
import { selectVesselSp } from '../../stores/letterStore/selectProductSp';
import { TableRowT, BodyRowT } from '../../types/types';
import { groupByProduct } from './groupByProduct';
import { groupByVessel } from './groupByVessel';

const getBodyRow = (group: TableRowT[]) => {
    const bodyRow: BodyRowT = {
        vessel: selectVesselSp(group[0].vessel),
        production: groupByProduct(group),
    };

    console.log(group[0].vessel);
    return bodyRow;
};

export const getBody = (table: TableRowT[], vessels: string[]) => {
    const groupsVessel = groupByVessel(vessels, table);

    const bodyObj = groupsVessel.reduce<BodyRowT[]>((total, group) => {
        const bodyRow = getBodyRow(group);
        total.push(bodyRow);
        return total;
    }, []);

    return bodyObj;
};
