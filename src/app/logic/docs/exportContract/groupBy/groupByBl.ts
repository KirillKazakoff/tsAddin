/* eslint-disable no-param-reassign */
import {
    BlGroupT,
    BlProductGroupedT,
    GroupedBlT,
} from '../../../../types/typesContract';
import { CommonRowT } from '../../../../types/typesTables';
import { groupify } from '../../../utils/groupify';
import type {
    PackageT,
    ProductionSalesT,
    ProductionT,
} from '../../../../types/typesSP';
import {
    AmountObjT,
    addToAmountObj,
    initAmountObj,
} from '../../../../stores/tablesStore/utils/initAmount';

type RowBlExtendT = {
    blNo: string;
    amount: AmountObjT;
    packSp?: PackageT;
    product: ProductionT | ProductionSalesT;
} & CommonRowT;

export const groupByBl = <RowT extends RowBlExtendT>(rows: RowT[]) => {
    const blGrouped = rows.reduce<GroupedBlT<RowT>>((total, row) => {
        const initBlGroup: BlGroupT<RowT> = {
            record: row,
            groupedBy: {
                product: {},
            },
            groupedProductsArr: [],
            total: initAmountObj(row.type),
        };
        const bl = groupify(total, initBlGroup, row.blNo);

        const initProductGroup = <BlProductGroupedT<RowT>>{
            record: row,
            total: initAmountObj(row.type),
            rows: [],
        };
        const productRow = groupify(
            bl.groupedBy.product,
            initProductGroup,
            row.product.codeName,
        );
        productRow.rows.push(row);

        addToAmountObj(productRow.total, row.amount);
        addToAmountObj(bl.total, row.amount);
        return total;
    }, {});

    Object.values(blGrouped).forEach((group) => {
        group.groupedProductsArr.push(...Object.values(group.groupedBy.product));
    });

    return blGrouped;
};
