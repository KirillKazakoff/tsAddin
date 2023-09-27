/* eslint-disable no-param-reassign */
import type { GroupedBlT } from '../../../../types/typesContract';
import { CellUtilsDoubleT } from '../../../../types/typesExcelUtils';
import { ExportRowT } from '../../../../types/typesTables';
import { styleRowCells, borderAll, alignmentCenter } from '../../styleRowCells';

export const initExportContractRowsR = (
    blGrouped: GroupedBlT<ExportRowT>,
    utils: CellUtilsDoubleT,
) => {
    const cellName = 'Сертификаты_массив';
    const arrayCl = utils.getCell(cellName);

    const groups = Object.values(blGrouped);
    groups.forEach((group, index) => {
        group.groupedProductsArr.forEach((r) => {
            const Qt = `\nИТОГО: ${group.total.placesTotal.str}`;
            let amount = r.rows.reduce<string>((total, row) => {
                total = `${total} ${row.amount.placesTotal.str}\n`;
                return total;
            }, '');
            amount += Qt;

            // empty spaces since additional columns for pictures
            const rowArr = [
                '',
                `${r.record.product.ru.name}\n${r.record.product.eng.name}`,
                '',
                `${r.record.vessel.ru.name}\n${r.record.vessel.eng.name}`,
                '',
                '',
                `${r.record.consignee.fullName}\n${r.record.consignee.addres}`,
                '',
                '',
                amount,
            ];

            const rowIndex = +arrayCl.cellEng.row + index;
            utils.ws.insertRow(rowIndex, rowArr).commit();

            // merge
            const mergeArrays = [
                [2, 3],
                [4, 6],
                [7, 9],
            ];
            mergeArrays.forEach(([startCol, endCol]) => {
                utils.mergeCells({ startCol, endCol, row: rowIndex });
            });

            // style
            const row = utils.ws.getRow(rowIndex);
            const height = 40 + r.rows.length * 10;

            styleRowCells(row, {
                height,
                border: borderAll,
                alignment: alignmentCenter,
                font: { size: 9 },
            });

            row.getCell(1).border = {};
        });
    });

    utils.deleteRow(cellName);
};
