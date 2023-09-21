/* eslint-disable no-param-reassign */
import {
    BlGroupT,
    BlProductGroupedT,
    GroupedBlT,
} from '../../../../types/typesContract';
import { AmountObjT, CommonRowT } from '../../../../types/typesTables';
import {
    addBlAmount,
    initBlAmount,
} from '../../../../stores/tablesStore/utils/specialAmount';
import { groupify } from '../../../utils/groupify';
import { PackageT, ProductionSalesT, ProductionT } from '../../../../types/typesSP';

type RowBlExtendT = {
    blNo: string;
    amount: AmountObjT;
    packSp?: PackageT;
    product: ProductionT | ProductionSalesT;
} & CommonRowT;

export const groupByBl = <RowT extends RowBlExtendT>(rows: RowT[]) => {
    const blGrouped = rows.reduce<GroupedBlT<RowT>>((total, row) => {
        if (!row.blNo) return total;
        let blAmount: AmountObjT;

        if (row.type === 'sales') {
            blAmount = initBlAmount('kg');
        } else {
            blAmount = initBlAmount('tn');
        }

        const initObj: BlGroupT<RowT> = {
            record: row,
            groupedBy: {
                product: {},
            },
            rows: [],
            total: blAmount,
        };
        const bl = groupify<BlGroupT<RowT>>(total, initObj, row.blNo);

        const initProductGroup = {
            record: row,
            total: blAmount,
        };
        const productRow = groupify<BlProductGroupedT<RowT>>(
            bl.groupedBy.product,
            initProductGroup,
            row.product.codeName,
        );

        addBlAmount(productRow.total, row.amount, row?.packSp?.coefficient);
        return total;
    }, {});

    Object.values(blGrouped).forEach((group) => {
        group.rows.push(...Object.values(group.groupedBy.product));
    });

    return blGrouped;
};
