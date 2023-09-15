/* eslint-disable no-param-reassign */
import { BlGroupT, GroupedBlT } from '../../../../types/typesContract';
import { AmountObjT } from '../../../../types/typesTables';
import {
    addBlAmount,
    initBlAmount,
} from '../../../../stores/tablesStore/utils/specialAmount';
import { groupify } from '../../../utils/groupify';
import { PackageT } from '../../../../types/typesSP';

type RowExtendT = { blNo: string; amount: AmountObjT; packSp?: PackageT };

export const groupByBl = <RowT extends RowExtendT>(rows: RowT[]) => {
    const blGrouped = rows.reduce<GroupedBlT<RowT>>((total, row) => {
        if (!row.blNo) return total;

        const initObj = {
            record: row,
            rows: [],
            total: initBlAmount(),
        };
        const bl = groupify<BlGroupT<RowT>>(total, initObj, row.blNo);
        bl.rows.push(row);

        addBlAmount(bl.total, row.amount, row?.packSp?.coefficient);
        return total;
    }, {});

    return blGrouped;
};
