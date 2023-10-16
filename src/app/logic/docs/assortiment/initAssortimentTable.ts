import {
    AmountObjT,
    initAmount,
} from '../../../stores/tablesStore/utils/initAmount';
import type { ExportRowT } from '../../../types/typesTables';
import { BlGroupsT } from '../exportContract/groupBy/initBlGroup';

export const initAssortimentTable = (row: ExportRowT) => {
    const initObj = {
        record: row,
        groupedByBlRows: <BlGroupsT<ExportRowT>>{},
        groupedByProduct: <ExportRowT[]>[],
        rows: <ExportRowT[]>[],
        amount: <AmountObjT>{
            places: initAmount(0, 0, 0),
            placesTotal: initAmount(0, 1, 1),
        },
        samples: {
            rows: <number[]>[],
            total: 0,
        },
    };
    return initObj;
};

export type AssortimentTableT = ReturnType<typeof initAssortimentTable>;
export type AssortimentTablesT = {
    [key: string]: AssortimentTableT;
};

export const initAssortimentObj = (
    tables: AssortimentTablesT,
    isSample: boolean,
) => {
    const tablesArr = Object.values(tables);
    if (tablesArr.length === 0) return null;

    const assortiment = {
        record: tablesArr[0].record,
        tables,
        isSample,
    };
    return assortiment;
};

export type AssortimentT = ReturnType<typeof initAssortimentObj>;
export type SamplesT = { [key: string]: AssortimentT };
