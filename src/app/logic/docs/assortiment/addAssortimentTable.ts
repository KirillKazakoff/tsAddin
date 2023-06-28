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
            height: 25,
            font: { bold: true },
            alignment: { horizontal: 'center' },
        });

        rows.titles.pop();
    }

    const titlesRow = ws.addRow(rows.titles);
    styleRowCells(titlesRow, {
        height: 25,
        font: { bold: true },
        alignment: { horizontal: 'center', vertical: 'middle' },
        border: borderAll,
    });

    // tableInsert
    table.rows.forEach((row, i) => {
        const fields = {
            sort: row.sort,
            weight: row?.sortSp?.weight,
            places: row.amount.places.str,
            placesTotal: row.amount.placesTotal.str,
            samples: table.samples.rows[i],
        };
        if (!isSample) delete fields.samples;
        const rowTable = ws.addRow(Object.values(fields));

        styleRowCells(rowTable, {
            height: 25,
            border: borderAll,
        });

        const cells = [rowTable.getCell(3), rowTable.getCell(4)];
        cells.forEach((cell) => {
            cell.style.alignment = {
                horizontal: 'right',
            };
        });

        if (isSample) rowTable.getCell(5).style = sampleClStyle;
    });

    // addTotalRow
    const totalFields = {
        empty: '',
        title: 'Total:',
        places: places.str,
        placesTotal: placesTotal.str,
        samples: table.samples.total,
    };
    if (!isSample) delete totalFields.samples;
    const totalRow = ws.addRow(Object.values(totalFields));

    styleRowCells(totalRow, {
        height: 25,
        border: borderAll,
        alignment: { horizontal: 'right' },
        font: { bold: true },
    });

    if (isSample) totalRow.getCell(5).style = sampleClStyle;
    ws.addRows([[''], ['']]);
};
