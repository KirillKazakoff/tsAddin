import { Worksheet } from 'exceljs';
import { styleRowCells, borderAll } from '../styleRowCells';
import { AssortimentTableT } from './group/groupAssortiment';
import { selectSortAssortiment } from '../../../stores/spsStore/select';

/* eslint-disable no-param-reassign */
export const addAssortimentTable = (
    assortiment: AssortimentTableT,
    ws: Worksheet,
    rowIndex: number,
) => {
    const {
        product, vessel, pack, blNo, seller,
    } = assortiment.record;
    const { places, placesTotal } = assortiment.amount;

    // headerInsert
    // prettier-ignore
    const rows = {
        product: [`${rowIndex + 1}. ${product.eng.name} producing by "${vessel.eng.name.toUpperCase()}"`],
        pack: [`package - carton box 1/${pack} kg`],
        empty: [''],
        info: ['', '', seller.codeName, blNo],
        titles: ['grade', 'weight', 'c/t', 'kg'],
    };

    ws.addRows([rows.product, rows.pack, rows.empty]);
    const infoRow = ws.addRow(rows.info);
    const titlesRow = ws.addRow(rows.titles);

    styleRowCells(infoRow, {
        height: 25,
        font: { bold: true },
        alignment: { horizontal: 'center' },
    });
    styleRowCells(titlesRow, {
        height: 25,
        font: { bold: true },
        alignment: { horizontal: 'center' },
        border: borderAll,
    });

    // tableInsert
    assortiment.rows.forEach((row) => {
        const sortSp = selectSortAssortiment(row.sort, row.product.codeName);

        const rowTable = ws.addRow([
            row.sort,
            sortSp?.weight,
            row.amount.places.str,
            row.amount.placesTotal.str,
        ]);

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
    });

    const totalRow = ws.addRow(['', 'Total:', places.str, placesTotal.str]);
    styleRowCells(totalRow, {
        height: 25,
        border: borderAll,
        alignment: { horizontal: 'right' },
        font: { bold: true },
    });

    ws.addRows([[''], ['']]);
};
