/* eslint-disable no-param-reassign */
import { BlGroupT, GroupedBlT } from '../../../../types/typesContract';
import { ExportRowT } from '../../../../types/typesTables';
import {
    addBlAmount,
    initBlAmount,
} from '../../../../stores/tablesStore/utils/invoiceAmount';
import { groupify } from '../../../utils/getGroup';

export const groupByBl = (rows: ExportRowT[]) => {
    const blGrouped = rows.reduce<GroupedBlT>((total, row) => {
        if (!row.blNo) return total;

        const initObj = {
            record: row,
            rows: [],
            total: initBlAmount(),
        };
        const bl = groupify<BlGroupT>(total, initObj, row.blNo);
        bl.rows.push(row);

        addBlAmount(bl.total, row.amount, row?.packSp?.coefficient);
        return total;
    }, {});

    return Object.values(blGrouped);
};
