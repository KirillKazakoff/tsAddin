/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { addToAmount } from '../../../../stores/tablesStore/utils/initAmount';
import { ExportRowT } from '../../../../types/typesTables';
import { groupify } from '../../../utils/groupify';
import {
    AssortimentTablesT,
    initAssortimentObj,
    initAssortimentTable,
} from '../initAssortimentTable';
import { isProductForAssortiment } from './isProductForAssortiment';
import { groupByBl } from '../../exportContract/groupBy/groupByBl';

export const groupAssortiment = (rows: ExportRowT[]) => {
    const tables = rows.reduce<AssortimentTablesT>((total, row) => {
        if (!isProductForAssortiment(row.product)) return total;
        const initObj = initAssortimentTable(row);

        const table = groupify(total, initObj, `${row.blNo}${row.pack}`);

        const isStorageRowInExport = table.record.type === 'export' && row.type === 'exportStorage';
        if (isStorageRowInExport) return total;

        addToAmount(table.amount.places, row.amount.places.count);
        addToAmount(table.amount.placesTotal, row.amount.placesTotal.count * 1000);
        table.rows.push(row);

        // sort
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

        return total;
    }, {});

    // groupProductByBL
    Object.values(tables).forEach((table) => {
        table.groupedByBlRows = groupByBl(table.rows);

        table.rows = Object.values(table.groupedByBlRows).reduce<ExportRowT[]>(
            (total, bl) => {
                const clone = _.cloneDeep(bl);

                clone.groupedProductsSortArr.forEach((group) => {
                    const row = group.record;
                    row.amount = group.total;
                    total.push(row);
                });
                return total;
            },
            [],
        );
    });

    const assortiment = initAssortimentObj(tables, false);
    console.log(assortiment);
    return assortiment;
};
