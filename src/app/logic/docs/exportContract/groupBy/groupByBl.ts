/* eslint-disable no-param-reassign */
import { CommonRowT } from '../../../../types/typesTables';
import { groupify } from '../../../utils/groupify';
import type { ProductionSalesT, ProductionT } from '../../../../types/typesSP';
import {
    AmountObjT,
    addToAmountObj,
} from '../../../../stores/tablesStore/utils/initAmount';
import { BlGroupsT, initBlGroup, initProductGroup } from './initBlGroup';

type RowBlExtendT = {
    blNo: string;
    amount: AmountObjT;
    pack: number;
    product: ProductionT | ProductionSalesT;
    sort: string;
    // vessel?: VesselT;
} & CommonRowT;

export const groupByBl = <RowT extends RowBlExtendT>(rows: RowT[]) => {
    const blGrouped = rows.reduce<BlGroupsT<RowT>>((total, row) => {
        const bl = groupify(total, initBlGroup(row), row.blNo);

        const productGroup = groupify(
            bl.groupedBy.product,
            initProductGroup(row),
            `${row.product.codeName}${row.pack}`,
        );
        productGroup.rows.push(row);

        const productSortGroup = groupify(
            bl.groupedBy.productSort,
            initProductGroup(row),
            `${row.product.codeName}${row.sort}`,
        );

        productSortGroup.rows.push(row);

        addToAmountObj(productSortGroup.total, row.amount);
        addToAmountObj(productGroup.total, row.amount);
        addToAmountObj(bl.total, row.amount);
        return total;
    }, {});

    Object.values(blGrouped).forEach((group) => {
        group.groupedProductsArr.push(...Object.values(group.groupedBy.product));
    });
    Object.values(blGrouped).forEach((group) => {
        group.groupedProductsSortArr.push(
            ...Object.values(group.groupedBy.productSort),
        );
    });

    // console.log(blGrouped);
    return blGrouped;
};
