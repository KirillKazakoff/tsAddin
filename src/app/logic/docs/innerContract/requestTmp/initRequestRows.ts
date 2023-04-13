/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../../types/typesExcelUtils';
import { InnerRowT } from '../../../../types/typesTables';

export const initRequestRows = (rows: InnerRowT[], utils: CellUtilsT) => {
    const {
        ws, getCell, deleteRow, getRow,
    } = utils;
    const cellName = 'Заявка_массив';
    const requestsArrayCl = getCell(cellName);

    rows.forEach((row, index) => {
        const producerCol = row.vessel.ru.name;
        const productCol = row.product.ru.name;
        const sortCol = row.sort;
        const packCol = row.product.ru.pack;
        const placesTotalCol = row.amount.placesTotal.str;
        const priceUnitCol = row.amount.price.str;
        const priceTotalCol = row.amount.priceTotal.str;

        const rowArr = [
            producerCol,
            productCol,
            sortCol,
            packCol,
            placesTotalCol,
            priceUnitCol,
            priceTotalCol,
        ];

        ws.insertRow(+requestsArrayCl.row + index, rowArr).commit();
    });

    rows.forEach((r, i) => {
        const row = getRow(cellName, -i - 1);
        row.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' },
            };
            cell.alignment = {
                horizontal: 'center',
                wrapText: true,
                vertical: 'middle',
            };
        });

        row.height = 50;
        row.commit();
    });

    deleteRow('Заявка_массив');
};
