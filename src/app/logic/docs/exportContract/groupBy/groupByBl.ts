/* eslint-disable no-param-reassign */
import { BlGroupT, GroupedBlT } from '../../../../types/typesContract';
import { AmountObjT, CommonRowT } from '../../../../types/typesTables';
import {
    BlAmountT,
    addBlAmount,
    initBlAmount,
} from '../../../../stores/tablesStore/utils/specialAmount';
import { groupify } from '../../../utils/groupify';
import { PackageT } from '../../../../types/typesSP';

type RowBlExtendT = {
    blNo: string;
    amount: AmountObjT;
    packSp?: PackageT;
} & CommonRowT;

export const groupByBl = <RowT extends RowBlExtendT>(rows: RowT[]) => {
    const blGrouped = rows.reduce<GroupedBlT<RowT>>((total, row) => {
        if (!row.blNo) return total;
        let blAmount: BlAmountT;
        if (row.type === 'sales') {
            blAmount = initBlAmount('kg');
        } else {
            blAmount = initBlAmount('tn');
        }

        const initObj = {
            record: row,
            rows: [],
            total: blAmount,
        };
        const bl = groupify<BlGroupT<RowT>>(total, initObj, row.blNo);
        bl.rows.push(row);

        addBlAmount(bl.total, row.amount, row?.packSp?.coefficient);
        return total;
    }, {});

    return blGrouped;
};
