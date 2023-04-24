/* eslint-disable no-param-reassign */
import { GroupedBlT } from '../../../../types/typesContract';
import { ExportRowT } from '../../../../types/typesTables';

export const groupByBl = (rows: ExportRowT[]) => {
    const blGrouped = rows.reduce<GroupedBlT>((total, row) => {
        let group = total[row.blNo];

        if (!group) {
            group = {
                record: row,
                rows: [],
            };
            total[row.blNo] = group;
        }

        group.rows.push(row);
        return total;
    }, {});

    return Object.values(blGrouped);
};
