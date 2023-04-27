/* eslint-disable no-param-reassign */
import { BodyRowT } from '../../../types/typesLetter';
import { VesselT } from '../../../types/typesSP';
import { MateRowT } from '../../../types/typesTables';
import { groupByProduct } from './groupByProduct';
import { groupByVessel } from './groupByVessel';

const getBodyRow = (group: MateRowT[]) => {
    const bodyRow: BodyRowT = {
        vessel: group[0].vessel,
        production: groupByProduct(group),
    };

    return bodyRow;
};

export const getBody = (table: MateRowT[], vessels: VesselT[]) => {
    const groupsVessel = groupByVessel(vessels, table);

    const bodyObj = groupsVessel.reduce<BodyRowT[]>((total, group) => {
        const bodyRow = getBodyRow(group);
        total.push(bodyRow);
        return total;
    }, []);

    return bodyObj;
};
