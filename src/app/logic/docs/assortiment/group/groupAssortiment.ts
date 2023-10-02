import { addToAmount } from '../../../../stores/tablesStore/utils/initAmount';
import {
    AssortimentTablesT,
    AssortimentTableT,
} from '../../../../types/typesAssortiment';
import { ExportRowT } from '../../../../types/typesTables';
import { groupify } from '../../../utils/groupify';
import { initAssortimentObj, initAssortimentTable } from '../initAssortimentTable';
import { isProductForAssortiment } from './isProductForAssortiment';

export const groupAssortiment = (rows: ExportRowT[]) => {
    const tables = rows.reduce<AssortimentTablesT>((total, row) => {
        if (!isProductForAssortiment(row.product)) return total;
        const initObj = initAssortimentTable(row);

        const table = groupify<AssortimentTableT>(total, initObj, row.blNo);

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

    const assortiment = initAssortimentObj(tables, false);
    return assortiment;
};
