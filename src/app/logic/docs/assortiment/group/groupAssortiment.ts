/* eslint-disable no-param-reassign */
import { ExportRowT } from '../../../../stores/tablesStore/set/setExport';
import { groupTotal } from '../../../utils/groupify/groupTotal';

import { initAssortimentObj } from '../initAssortimentObj';
import { isProductForAssortiment } from './isProductForAssortiment';

const groupFn = (rows: ExportRowT[]) => {
    return groupTotal({
        rows,
        input: (row) => ({
            init: () => isProductForAssortiment(row.product),
            code: `${row.blNo}${row.product.code}${row.pack}`,
            groupedBy: {
                sort: { code: row.sort },
            },
            additional: { samples: 0 },
            groupModify: (group) => {
                const isStorageRowInExport = group.record.type === 'exportT' && row.type === 'exportStorageT';
                return !isStorageRowInExport;
            },
        }),
    });
};

export type AssortimentGroupT = ReturnType<typeof groupFn>[number];

export const groupAssortiment = (rows: ExportRowT[]) => {
    const assortimentTables = groupFn(rows);

    return initAssortimentObj(assortimentTables, false);
};
