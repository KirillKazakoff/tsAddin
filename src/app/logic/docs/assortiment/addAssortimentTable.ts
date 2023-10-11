/* eslint-disable max-len */
import { Worksheet } from 'exceljs';
import { AssortimentTableT } from '../../../types/typesAssortiment';
import { calcFreezing } from './calcFreezing';
import { AddressT, getAddress } from '../../excel/utils/createFormula';
import { initRowMaker } from '../../excel/utils/excelUtilsObj/initRows';

/* eslint-disable no-param-reassign */
export const addAssortimentTable = (
    table: AssortimentTableT,
    ws: Worksheet,
    rowIndex: number,
    isSample: boolean,
) => {
    const { insertRows, insertRow } = initRowMaker(ws);
    const {
        product, vessel, pack, blNo, seller,
    } = table.record;
    const { places, placesTotal } = table.amount;

    // headerInsert
    const freezing = calcFreezing(product.codeName, vessel.codeName);
    const rows = {
        product: [
            `${rowIndex + 1}. ${freezing} ${
                product.eng.name
            } producing by ${vessel.eng.name.toUpperCase()}`,
        ],
        pack: [`package - carton box 1/${pack} kg`],
        info: ['', '', seller.codeName, blNo],
        titles: ['grade', 'weight', 'c/t', 'kg', 'Sampling Plan'],
    };

    if (vessel.codeName.includes('Шалин')) {
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
        records: table.rows,
        rowSettings: (r, insertIndex, cycleIndex, rowObj) => {
            const fields = {
                sort: r.sort,
                weight: r?.sortSp?.weight,
                places: r.amount.places.count,
                placesTotal: r.amount.placesTotal.count * 1000,
                samples: table.samples.rows[cycleIndex],
                percentage: (r.amount.placesTotal.count * 1000) / placesTotal.count,
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
                        sample: {
                            style: {
                                alignment: { horizontal: 'center' },
                                font: { color: { argb: 'FF0000' } },
                            },
                        },
                        percentage: {
                            style: { alignment: { horizontal: 'right' } },
                            formulaCb: (address) => {
                                const colTotal = getAddress(rowObj.getCell(3)).col;
                                return `${colTotal}${address.row} / ${colTotal}${
                                    +address.row + table.rows.length - cycleIndex
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
        samples: table.samples.total,
    };
    if (!isSample) delete totalFields.samples;

    const sumCb = (address: AddressT) => `SUM(${address.col}${+address.row - 1}:${address.col}${
        +address.row - table.rows.length
    })`;

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
                samples: { formulaCb: sumCb },
            },
        },
    });

    insertRows({ records: [[''], ['']] });
};
