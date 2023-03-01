import { TableRowT } from '../../types/types';

export const groupByVessel = (vessels: string[], table: TableRowT[]) => {
    return vessels.reduce<TableRowT[][]>((groupVessel, vessel) => {
        const group = table.reduce<TableRowT[]>((total, row) => {
            if (vessel === row.vessel) total.push(row);
            return total;
        }, []);

        groupVessel.push(group);
        return groupVessel;
    }, []);
};
