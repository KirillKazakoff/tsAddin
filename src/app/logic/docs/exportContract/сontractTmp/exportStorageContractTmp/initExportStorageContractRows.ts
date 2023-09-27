/* eslint-disable no-param-reassign */
import { InvoicesT, ProductGroupT } from '../../../../../types/typesContract';
import { CellUtilsDoubleT } from '../../../../../types/typesExcelUtils';
import { alignmentCenter, borderAll, styleRowCells } from '../../../styleRowCells';

export const initExportStorageContractRows = (
    // invoices
    invoices: InvoicesT,
    utils: CellUtilsDoubleT,
) => {
    const cellName = 'Сертификаты_массив';
    const arrayCl = utils.getCell(cellName);

    // Get product groups
    const invoicesArr = Object.values(invoices);
    const groups = invoicesArr.reduce<ProductGroupT[]>((total, invoice) => {
        const invoiceGroups = Object.values(invoice.productGroups);
        total.push(...invoiceGroups);
        return total;
    }, []);

    groups.forEach((group, index) => {
        const { record: r } = group;

        // empty spaces since additional columns for pictures
        const rowArr = [
            '',
            `${r.product.ru.name}\n${r.product.eng.name}`,
            '',
            `${r.vessel.ru.name}\n${r.vessel.eng.name}`,
            `${r.consignee.fullName}\n${r.consignee.addres}`,
            '',
            '',
            group.total.placesTotal.str,
        ];

        const rowIndex = +arrayCl.cellEng.row + index;
        utils.ws.insertRow(rowIndex, rowArr).commit();

        // merge
        const mergeArrays = [
            [2, 3],
            [5, 7],
        ];
        mergeArrays.forEach(([startCol, endCol]) => {
            utils.mergeCells({ startCol, endCol, row: rowIndex });
        });

        // styleRow
        const row = utils.ws.getRow(rowIndex);
        styleRowCells(row, {
            height: 45,
            border: borderAll,
            alignment: alignmentCenter,
            font: { size: 9 },
        });

        row.getCell(1).border = {};
    });

    utils.deleteRow(cellName);
};
