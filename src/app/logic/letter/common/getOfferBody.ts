import { VesselT } from '../../../stores/spsStore/set/setVessels';
import { MateRowT } from '../../../stores/tablesStore/set/setMates';
import { BodyRowT } from '../../../types/typesLetter';
import { groupByProduct } from './groupByProduct';
import { groupByVessel } from './groupByVessel';

const getBodyRow = (group: MateRowT[]) => {
    const bodyRow: BodyRowT = {
        vessel: group[0].vessel,
        production: groupByProduct(group),
    };

    return bodyRow;
};

export const getOfferBody = (table: MateRowT[], vessels: VesselT[]) => {
    const groupsVessel = groupByVessel(vessels, table);

    const bodyObj = groupsVessel.reduce<BodyRowT[]>((total, group) => {
        const bodyRow = getBodyRow(group);
        total.push(bodyRow);
        return total;
    }, []);

    return bodyObj;
};
