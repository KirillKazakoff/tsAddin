import { VesselT } from '../../../stores/spsStore/set/setVessels';
import { MateRowT } from '../../../stores/tablesStore/set/setMates';

export const groupByVessel = (vessels: VesselT[], mates: MateRowT[]) => {
    return vessels.reduce<MateRowT[][]>((groupVessel, vessel) => {
        const group = mates.reduce<MateRowT[]>((total, row) => {
            if (vessel.code === row.vessel.code) total.push(row);
            return total;
        }, []);

        if (group.length > 0) {
            groupVessel.push(group);
        }

        return groupVessel;
    }, []);
};
