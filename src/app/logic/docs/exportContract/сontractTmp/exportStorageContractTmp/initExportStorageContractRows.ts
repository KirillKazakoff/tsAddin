/* eslint-disable no-param-reassign */
import { InvoicesT, ProductGroupT } from '../../../../../types/typesContract';
import { CellUtilsDoubleT } from '../../../../../types/typesExcelUtils';
import { setFormats } from '../../../../utils/formats';
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
        const fields = {
            empty1: '',
            product: `${r.product.ru.name}\n${r.product.eng.name}`,
            empty3: '',
            vessel: `${r.vessel.ru.name}\n${r.vessel.eng.name}`,
            consignee: `${r.consignee.fullName}\n${r.consignee.addres}`,
            empty6: '',
            empty7: '',
            placesTotal: group.total.placesTotal.count,
        };

        const rowIndex = +arrayCl.cellEng.row + index;
        const row = utils.ws.insertRow(rowIndex, Object.values(fields));

        // merge
        const mergeArrays = [
            [2, 3],
            [5, 7],
        ];
        mergeArrays.forEach(([startCol, endCol]) => {
            utils.mergeCells({ startCol, endCol, row: rowIndex });
        });

        // styleRow
        setFormats(row, fields, 'exportEng');
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
