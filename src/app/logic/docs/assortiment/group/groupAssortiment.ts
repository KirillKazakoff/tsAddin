/* eslint-disable no-param-reassign */
import { ExportRowT } from '../../../../types/typesTables';
import { groupTotal } from '../../../utils/groupTotal';
import { initAssortimentObj } from '../initAssortimentObj';
import { isProductForAssortiment } from './isProductForAssortiment';

const groupFn = (rows: ExportRowT[]) => {
    return groupTotal({
        rows,
        input: (row) => ({
            init: () => isProductForAssortiment(row.product),
            code: `${row.blNo}${row.product.codeName}${row.pack}`,
            groupedBy: {
                sort: { code: row.sort },
            },
            additional: {
                samples: {
                    rows: <number[]>[],
                    total: 0,
                },
            },
            groupModify: (group) => {
                const isStorageRowInExport = group.record.type === 'export' && row.type === 'exportStorage';
                return !isStorageRowInExport;
            },
        }),
    });
};

export type AssortimentGroupT = ReturnType<typeof groupFn>[number];

export const groupAssortiment = (rows: ExportRowT[]) => {
    const assortimentTables = groupFn(rows);

    assortimentTables.forEach((table) => {
        table.rows = table.rows.sort((a, b) => {
            const prev = a.sort.length;
            const next = b.sort.length;

            if (prev < next) return 1;
            if (prev > next) return -1;
            if (prev === next) {
                if (a.sort === 'M' && b.sort === 'L') return 1;
                if (a.sort < b.sort) return 1;
            }

            return -1;
        });
    });

    return initAssortimentObj(assortimentTables, false);
};
