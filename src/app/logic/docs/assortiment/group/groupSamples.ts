/* eslint-disable no-param-reassign */
import { addToAmount } from '../../../../stores/tablesStore/utils/initAmount';
import {
    AssortimentT,
    AssortimentTableT,
    AssortimentTablesT,
    SamplesT,
} from '../../../../types/typesAssortiment';
import { ExportRowT } from '../../../../types/typesTables';
import { groupify } from '../../../utils/getGroup';
import { calcSamples } from '../calcSamples';
import { initAssortimentTable } from '../initAssortimentTable';

export const groupSamples = (rows: ExportRowT[]) => {
    const tables = rows.reduce<AssortimentTablesT>((total, row) => {
        if (!row.product.eng.name.includes('crab')) return total;

        const tableCode = `${row.consignee.codeName}${row.vessel.codeName}${row.product.codeName}`;
        const initTableObj = initAssortimentTable(row);
        const table = groupify<AssortimentTableT>(total, initTableObj, tableCode);

        // groupBySort
        const rowSameSort = table.rows.find((r) => r.sort === row.sort);
        if (rowSameSort) {
            addToAmount(rowSameSort.amount.places, row.amount.places.count);
            addToAmount(
                rowSameSort.amount.placesTotal,
                row.amount.placesTotal.count,
            );
        } else {
            table.rows.push(row);
        }

        addToAmount(table.amount.places, row.amount.places.count);
        addToAmount(table.amount.placesTotal, row.amount.placesTotal.count * 1000);

        return total;
    }, {});

    // setSamplesCount
    const tablesArr = Object.values(tables);
    tablesArr.forEach((table) => {
        table.rows.forEach((row) => {
            const rowSamples = calcSamples(
                row.amount.placesTotal.count * 1000,
                row.pack,
            );
            table.samples.rows.push(rowSamples);
            table.samples.total += rowSamples;
        });
    });

    // groupByConsignee
    const samples = tablesArr.reduce<SamplesT>((total, table) => {
        const initAssortimentObj: AssortimentT = {
            isSample: true,
            record: table.record,
            tables: {},
        };

        const assortiment = groupify<AssortimentT>(
            total,
            initAssortimentObj,
            table.record.consignee.codeName,
        );

        assortiment.tables[table.record.vessel.codeName] = table;
        return total;
    }, {});

    return samples;
};