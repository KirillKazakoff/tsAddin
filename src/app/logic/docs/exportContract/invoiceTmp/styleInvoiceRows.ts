/* eslint-disable no-param-reassign */
import { ProductInfoExportT } from '../../../../types/typesContract';
import { GetRowBoundT } from '../../../../types/typesExcelUtils';

export const styleBlRows = (
    products: ProductInfoExportT[],
    getRow: GetRowBoundT,
    arrayClName: string,
) => {
    products.forEach((product, i) => {
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
        console.log(row.number);
        row.height = 25;
        row.commit();
    });
};
