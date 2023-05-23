import { initAmount } from '../../../stores/tablesStore/utils/initAmount';
import {
    AssortimentT,
    AssortimentTableT,
    AssortimentTablesT,
} from '../../../types/typesAssortiment';
import type { ExportRowT } from '../../../types/typesTables';

export const initAssortimentTable = (row: ExportRowT) => {
    const initObj: AssortimentTableT = {
        record: row,
        rows: [],
        amount: {
            places: initAmount(0, 0, 0),
            placesTotal: initAmount(0, 1, 1),
        },
        samples: {
            rows: [],
            total: 0,
        },
    };
    return initObj;
};

export const initAssortimentObj = (
    tables: AssortimentTablesT,
    isSample: boolean,
) => {
    const assortiment: AssortimentT = {
        record: Object.values(tables)[0].record,
        tables,
        isSample,
    };
    return assortiment;
};
