import { Style, Worksheet } from 'exceljs';
import { styleRowCells, borderAll } from '../styleRowCells';
import { AssortimentTableT } from '../../../types/typesAssortiment';
import { calcFreezing } from './calcFreezing';

/* eslint-disable no-param-reassign */
export const addAssortimentTable = (
    table: AssortimentTableT,
    ws: Worksheet,
    rowIndex: number,
    isSample: boolean,
) => {
    const {
        product, vessel, pack, blNo, seller,
    } = table.record;
    const { places, placesTotal } = table.amount;

    const sampleClStyle: Partial<Style> = {
        alignment: { horizontal: 'center' },
        font: { color: { argb: 'FF0000' } },
        border: borderAll,
    };

    // headerInsert
    // prettier-ignore
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

    ws.addRows([rows.product, rows.pack]);

    if (!isSample) {
        const infoRow = ws.addRow(rows.info);
        styleRowCells(infoRow, {
            font: { bold: true },
            alignment: { horizontal: 'center' },
        });

        rows.titles.pop();
    }

    // Add percentage column in the end
    rows.titles.push('Percentage');

    const titlesRow = ws.addRow(rows.titles);
    styleRowCells(titlesRow, {
        font: { bold: true },
        alignment: { horizontal: 'center', vertical: 'middle' },
        border: borderAll,
    });

    // tableInsert
    table.rows.forEach((row, i) => {
        const fields = {
            sort: row.sort,
            weight: row?.sortSp?.weight,
            places: row.amount.places.count,
            placesTotal: row.amount.placesTotal.count * 1000,
            samples: table.samples.rows[i],
            percentage: (row.amount.placesTotal.count * 1000) / placesTotal.count,
        };
        if (!isSample) delete fields.samples;
        const rowTable = ws.addRow(Object.values(fields));

        styleRowCells(rowTable, {
            border: borderAll,
        });

        const rowObj = {
            places: rowTable.getCell(3),
            placesTotal: rowTable.getCell(4),
            sample: rowTable.getCell(5),
            percentage: isSample ? rowTable.getCell(6) : rowTable.getCell(5),
        };
        [rowObj.places, rowObj.placesTotal].forEach((cell) => {
            cell.style.alignment = {
                horizontal: 'right',
            };
        });
        rowObj.places.numFmt = '# ###';
        rowObj.placesTotal.numFmt = '# ###.00';
        rowObj.percentage.numFmt = '0.00%';
        rowObj.percentage.value = {
            formula: `${rowObj.placesTotal.$col$row} / ${placesTotal.count}`,
            result: (row.amount.placesTotal.count * 1000) / placesTotal.count,
            sharedFormula: `${rowObj.placesTotal.$col$row} / ${placesTotal.count}`,
            date1904: false,
        };

        if (isSample) rowObj.sample.style = sampleClStyle;
    });

    // addTotalRow
    const totalFields = {
        empty: '',
        title: 'Total:',
        places: places.count,
        placesTotal: placesTotal.count,
        samples: table.samples.total,
    };
    if (!isSample) delete totalFields.samples;
    const totalRow = ws.addRow(Object.values(totalFields));

    const rowObj = {
        places: totalRow.getCell(3),
        placesTotal: totalRow.getCell(4),
        samples: totalRow.getCell(5),
    };

    styleRowCells(totalRow, {
        border: borderAll,
        alignment: { horizontal: 'right' },
        font: { bold: true },
    });
    rowObj.placesTotal.numFmt = '# ###.00';
    rowObj.places.numFmt = '# ###';

    if (isSample) rowObj.samples.style = sampleClStyle;
    // creating empty space for next tables
    ws.addRows([[''], ['']]);
};
