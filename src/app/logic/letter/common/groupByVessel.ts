import { MateRowT } from '../../../types/typesTables';
import { checkOperation } from './checkOperation';

export const groupByVessel = (vessels: string[], table: MateRowT[]) => {
    return vessels.reduce<MateRowT[][]>((groupVessel, vessel) => {
        const group = table.reduce<MateRowT[]>((total, row) => {
            if (!checkOperation(row)) return total;

            if (vessel === row.vessel) total.push(row);
            return total;
        }, []);

        if (group.length > 0) {
            groupVessel.push(group);
        }

        return groupVessel;
    }, []);
};
