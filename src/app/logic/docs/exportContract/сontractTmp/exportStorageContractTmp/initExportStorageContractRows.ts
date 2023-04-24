/* eslint-disable no-param-reassign */
import { ConsigneeGroupT } from '../../../../../types/typesContract';
import { CellUtilsDoubleT } from '../../../../../types/typesExcelUtils';
import { ExportRowT } from '../../../../../types/typesTables';
import { alignmentCenter, borderAll, styleRowCells } from '../../../styleRowCells';

export const initExportStorageContractRows = (
    consigneesGroup: ConsigneeGroupT,
    utils: CellUtilsDoubleT,
) => {
    const {
        ws, getCell, deleteRow, getRow,
    } = utils;
    const cellName = 'Сертификаты_массив';
    const arrayCl = getCell(cellName);

    const groups = Object.values(consigneesGroup);
    const rows = groups.reduce<ExportRowT[]>((total, group) => {
        total.push(...group.rows);
        return total;
    }, []);

    rows.forEach((row, index) => {
        const rowArr = [
            '',
            `${row.consignee.fullName}\n${row.consignee.addres}`,
            row.amount.placesTotal.str,
            `${row.product.ru.name}\n${row.product.eng.name}`,
            `${row.vessel.ru.name}\n${row.vessel.eng.name}`,
        ];

        ws.insertRow(+arrayCl.cellEng.row + index, rowArr).commit();
    });

    rows.forEach((r, i) => {
        const row = getRow(cellName, -i - 1);
        styleRowCells(row, {
            height: 45,
            border: borderAll,
            alignment: alignmentCenter,
            font: { size: 9 },
        });

        row.getCell(1).border = {};
    });

    deleteRow(cellName);
};
