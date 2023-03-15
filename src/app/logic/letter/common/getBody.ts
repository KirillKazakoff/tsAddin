/* eslint-disable no-param-reassign */
import type { BodyRowT } from '../../types/types';
import type { MateRowT } from '../../types/typesTables';

import { selectVesselSp } from '../../stores/spsStore/select';
import { groupByProduct } from './groupByProduct';
import { groupByVessel } from './groupByVessel';

const getBodyRow = (group: MateRowT[]) => {
    const bodyRow: BodyRowT = {
        vessel: selectVesselSp(group[0].vessel),
        production: groupByProduct(group),
    };

    return bodyRow;
};

export const getBody = (table: MateRowT[], vessels: string[]) => {
    const groupsVessel = groupByVessel(vessels, table);

    const bodyObj = groupsVessel.reduce<BodyRowT[]>((total, group) => {
        const bodyRow = getBodyRow(group);
        total.push(bodyRow);
        return total;
    }, []);

    return bodyObj;
};
