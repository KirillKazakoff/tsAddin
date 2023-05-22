/* eslint-disable no-param-reassign */
import {
    addToAmount,
    initAmount,
} from '../../../../stores/tablesStore/utils/initAmount';
import { AmountT, ExportRowT } from '../../../../types/typesTables';

export type AssortimentTableT = {
    record: ExportRowT;
    rows: ExportRowT[];
    amount: {
        places: AmountT;
        placesTotal: AmountT;
    };
};
export type AssortimentTablesT = {
    [key: string]: AssortimentTableT;
};
export type AssortimentT = {
    tables: AssortimentTablesT;
    record: ExportRowT;
};

function getGroup<ReturnT>(
    total: any,
    initObj: any,
    code: string | number,
): ReturnT {
    let group = total[code];

    if (!group) {
        group = initObj;
        total[code] = group;
    }
    return group;
}

export const groupAssortiment = (rows: ExportRowT[]) => {
    const grouped = rows.reduce<AssortimentTablesT>((total, row) => {
        if (!row.product.eng.name.includes('crab')) return total;

        const initObj: AssortimentTableT = {
            record: row,
            rows: [],
            amount: {
                places: initAmount(0, 0, 0),
                placesTotal: initAmount(0, 1, 1),
            },
        };

        const group = getGroup<AssortimentTableT>(total, initObj, row.blNo);

        addToAmount(group.amount.places, row.amount.places.count);
        addToAmount(group.amount.placesTotal, row.amount.placesTotal.count * 1000);
        group.rows.push(row);

        return total;
    }, {});

    const assortiment: AssortimentT = {
        record: Object.values(grouped)[0].record,
        tables: grouped,
    };

    return assortiment;
};
