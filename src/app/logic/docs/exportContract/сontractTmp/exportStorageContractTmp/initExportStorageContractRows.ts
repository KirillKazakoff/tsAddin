/* eslint-disable no-param-reassign */
import { ConsigneeGroupT } from '../../../../../types/typesContract';
import { CellUtilsDoubleT } from '../../../../../types/typesExcelUtils';
import { styleRowCells } from '../../../styleRowCells';

export const initExportStorageContractRows = (
    consigneesGroup: ConsigneeGroupT,
    utils: CellUtilsDoubleT,
) => {
    const {
        ws, getCell, deleteRow, getRow,
    } = utils;
    const cellName = 'Сертификаты_массив';
    const arrayCl = getCell(cellName);

    Object.values(consigneesGroup).forEach(({ rows }) => {
        rows.forEach((row, index) => {
            const rowArr = [
                `${row.consignee.fullName}\n${row.consignee.adress}`,
                row.amount.placesTotal,
                `${row.product.ru.name}\n${row.product.eng.name}`,
                `${row.vessel.ru.name}\n${row.vessel.eng.name}`,
            ];

            ws.insertRow(+arrayCl.cellEng.row + index, rowArr).commit();
        });

        rows.forEach((r, i) => {
            const row = getRow(cellName, -i - 1);
            styleRowCells(row, 45);
        });
    });

    deleteRow(cellName);
};
