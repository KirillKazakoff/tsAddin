/* eslint-disable no-param-reassign */
import { ExportRowT } from '../../../../stores/tablesStore/set/setExport';
import { groupTotal } from '../../../utils/groupify/groupTotal';
import { calcSamples } from '../calcSamples';
import { initAssortimentObj } from '../initAssortimentObj';
import { isProductForAssortiment } from './isProductForAssortiment';

export const groupSamples = (rows: ExportRowT[]) => {
    const samples = groupTotal({
        rows,
        input: (row) => ({
            init: () => isProductForAssortiment(row.product),
            code: `${row.consignee.code}`,
            groupedBy: {
                table: {
                    code: `${row.vessel.code}${row.product.code}${row.pack}`,
                    groupedBy: {
                        sort: { code: row.sort },
                    },
                    additional: {
                        samples: {
                            rows: <number[]>[],
                            total: 0,
                        },
                    },
                },
            },
            groupModify: (group) => {
                const isStorageRowInExport = group.record.type === 'exportT' && row.type === 'exportStorageT';
                return !isStorageRowInExport;
            },
        }),
    });

    samples.forEach((sample) => {
        sample.groupedBy.table.forEach((table) => {
            table.groupedBy.sort.forEach((row) => {
                const samplesCount = calcSamples(
                    row.total.placesTotal.count * 1000,
                    row.record.pack,
                );
                table.additional.samples.rows.push(samplesCount);
                table.additional.samples.total += samplesCount;
            });
        });
    });

    const assortments = samples.map((sample) => {
        return initAssortimentObj(sample.groupedBy.table, true);
    });

    return assortments;
};

export type SamplesT = ReturnType<typeof groupSamples>;
