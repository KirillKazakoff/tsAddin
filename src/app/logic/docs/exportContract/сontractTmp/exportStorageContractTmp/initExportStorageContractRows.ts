/* eslint-disable no-param-reassign */
import { InvoicesT, ProductGroupT } from '../../../../../types/typesContract';
import { CellUtilsDoubleT } from '../../../../../types/typesExcelUtils';
import { alignmentCenter, borderAll, styleRowCells } from '../../../styleRowCells';

export const initExportStorageContractRows = (
    // invoices
    invoices: InvoicesT,
    utils: CellUtilsDoubleT,
) => {
    const {
        ws, getCell, deleteRow, getRow,
    } = utils;
    const cellName = 'Сертификаты_массив';
    const arrayCl = getCell(cellName);

    // Get product groups
    const invoicesArr = Object.values(invoices);
    const rows = invoicesArr.reduce<ProductGroupT[]>((total, invoice) => {
        const invoiceGroups = Object.values(invoice.productGroups);
        total.push(...invoiceGroups);
        return total;
    }, []);

    rows.forEach((group, index) => {
        const { record } = group;
        const QT = group.rows.reduce<string>((total, row) => {
            total += `${row.amount.placesTotal.str}\n`;
            return total;
        }, `\nИТОГО ${group.total.str}\n`);

        const rowArr = [
            '',
            `${record.product.ru.name}\n${record.product.eng.name}`,
            `${record.vessel.ru.name}\n${record.vessel.eng.name}`,
            `${record.consignee.fullName}\n${record.consignee.addres}`,
            QT,
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
