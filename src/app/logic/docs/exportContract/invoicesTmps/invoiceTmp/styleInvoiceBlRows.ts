/* eslint-disable no-param-reassign */
import { GetRowBoundT } from '../../../../../types/typesExcelUtils';
import { ExportRowT } from '../../../../../types/typesTables';

export const styleInvoiceBlRows = (
    rows: ExportRowT[],
    getRow: GetRowBoundT,
    arrayClName: string,
) => {
    rows.forEach((product, i) => {
        const row = getRow(arrayClName, -i - 1);
        row.eachCell((cell) => {
            cell.font = {
                size: 10,
                bold: false,
            };
            cell.alignment = { horizontal: 'center' };
        });

        const amountPlacesCl = row.getCell(4);
        amountPlacesCl.alignment = { horizontal: 'right' };
        row.height = 25;
        row.commit();
    });
};
