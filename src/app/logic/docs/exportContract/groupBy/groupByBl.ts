/* eslint-disable no-param-reassign */
import { GroupedBlT } from '../../../../types/typesContract';
import { ExportRowT } from '../../../../types/typesTables';
import { addBlAmount, initBlAmount } from './invoiceAmount';

export const groupByBl = (rows: ExportRowT[]) => {
    const blGrouped = rows.reduce<GroupedBlT>((total, row) => {
        let group = total[row.blNo];

        if (!group) {
            group = {
                record: row,
                rows: [],
                total: initBlAmount(),
            };
            total[row.blNo] = group;
        }

        group.rows.push(row);

        addBlAmount(group.total, row.amount);
        return total;
    }, {});

    return Object.values(blGrouped);
};
