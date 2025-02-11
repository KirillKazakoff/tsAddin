import { calcFreezing } from './calcFreezing';
import { AddressT, getAddress } from '../../excel/utils/createFormula';
import { RowMakerT } from '../../excel/utils/excelUtilsObj/initRows';
import { AssortimentObjT } from './initAssortimentObj';
import { calcSamples } from './calcSamples';

/* eslint-disable no-param-reassign */
export const addAssortimentTable = (
    table: AssortimentObjT['tables'][number],
    { insertRow, insertRows }: RowMakerT,
    tableIndex: number,
    isSample: boolean,
) => {
    const {
        product, vessel, pack, blNo, seller,
    } = table.record;
    const { places, placesTotal } = table.total;

    // headerInsert
    const freezing = calcFreezing(product.code, vessel.code);
    const rows = {
        product: [
            `${tableIndex + 1}. ${freezing} ${
                product.eng.name
            } producing by ${vessel.eng.name.toUpperCase()}`,
        ],
        pack: [`package - carton box 1/${pack} kg`],
        info: ['', '', seller.code, blNo],
        titles: ['grade', 'weight', 'c/t', 'kg', 'Sampling Plan'],
    };

    if (vessel.code.includes('Шалин')) {
        rows.pack = [`package - laminated bag 1/${pack} kg`];
    }

    insertRows({ records: [rows.product, rows.pack] });

    if (!isSample) {
        insertRow({
            fields: rows.info,
            style: {
                common: {
                    font: { bold: true },
                    alignment: { horizontal: 'center' },
                },
            },
        });
        rows.titles.pop();
    }

    // Add percentage column in the end
    rows.titles.push('Percentage');

    insertRow({
        fields: rows.titles,
        style: {
            common: {
                font: { bold: true },
                alignment: 'center',
                border: 'all',
            },
        },
    });

    // tableInsert
    insertRows({
        records: table.groupedBy.sort,
        rowSettings: (r, insertIndex, cycleIndex, rowObj) => {
            const fields = {
                sort: r.record.sort,
                weight: r?.record?.sortSp?.weight,
                places: r?.total?.places.count,
                placesTotal: r.total.placesTotal.count * 1000,
                samples: calcSamples(r.total.placesTotal.count * 1000, r.record.pack),
                percentage: (r.total.placesTotal.count * 1000) / placesTotal.count,
            };

            if (!isSample) delete fields.samples;

            // prettier-ignore

            return {
                fields,
                docType: 'assortiment',
                style: {
                    common: { border: 'all' },
                    special: {
                        sort: { style: { alignment: { horizontal: 'right' } } },
                        places: { style: { alignment: { horizontal: 'right' } } },
                        placesTotal: { style: { alignment: { horizontal: 'right' } } },
                        weight: { style: { alignment: { horizontal: 'center' } } },
                        samples: {
                            style: {
                                alignment: { horizontal: 'center' },
                                font: { color: { argb: 'FF0000' } },
                            },
                        },
                        percentage: {
                            style: { alignment: { horizontal: 'right' } },
                            formulaCb: (address: AddressT) => {
                                const colTotal = getAddress(rowObj.getCell(3)).col;
                                return `${colTotal}${address.row} / ${colTotal}${
                                    +address.row + table.groupedBy.sort.length - cycleIndex
                                }`;
                            },
                        },
                    },
                },
            };
        },
    });

    const totalFields = {
        empty: '',
        title: 'Total:',
        places: places.count,
        placesTotal: placesTotal.count,
        samples: table.additional.samples,
    };
    if (!isSample) delete totalFields.samples;

    const sumCb = (address: AddressT) => {
        const { length } = table.groupedBy.sort;

        return `SUM(${address.col}${+address.row - 1}:${address.col}${
            +address.row - length
        })`;
    };

    insertRow({
        fields: totalFields,
        docType: 'assortiment',
        style: {
            common: {
                alignment: { horizontal: 'right' },
                border: 'all',
                font: { bold: true },
            },
            special: {
                places: { formulaCb: sumCb },
                placesTotal: { formulaCb: sumCb },
                samples: {
                    formulaCb: sumCb,
                    style: {
                        alignment: { horizontal: 'center' },
                        font: { color: { argb: 'FF0000' } },
                    },
                },
            },
        },
    });

    insertRows({ records: [[''], ['']] });
};
