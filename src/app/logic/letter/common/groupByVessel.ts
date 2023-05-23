import { VesselT } from '../../../types/typesSP';
import { MateRowT } from '../../../types/typesTables';

export const groupByVessel = (vessels: VesselT[], mates: MateRowT[]) => {
    return vessels.reduce<MateRowT[][]>((groupVessel, vessel) => {
        const group = mates.reduce<MateRowT[]>((total, row) => {
            if (vessel.codeName === row.vessel.codeName) total.push(row);
            return total;
        }, []);

        if (group.length > 0) {
            groupVessel.push(group);
        }

        return groupVessel;
    }, []);
};
