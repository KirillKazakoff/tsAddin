import { InitInvoicePartT } from '../../../../types/typesExcelUtils';
import { formatCount } from '../../../utils/formatCount';

export const initComInvoiceBl: InitInvoicePartT = (utils, invoice) => {
    const {
        getCell, ws, getRow, deleteRow,
    } = utils;
    const { products } = invoice;

    const blArrayCl = getCell('Инвойс_Bl_массив');

    products.forEach((p, index) => {
        const { record, product } = p;

        const bl = record.blNo;
        const desc = product.nameEng;
        const pack = `1/${record.pack} KG`;
        const amountPlaces = `${record.amountPlaces} PCS/`;
        const amountTotal = `${formatCount(record.amountTotal, 3, 4)}`;
        const priceUnit = `${formatCount(record.price, 2, 2)} USD`;
        const priceTotal = `${formatCount(record.priceTotal, 2, 2)} USD`;

        const rowArr = [
            bl,
            desc,
            pack,
            amountPlaces,
            amountTotal,
            priceUnit,
            priceTotal,
        ];

        ws.insertRow(+blArrayCl.row + index, rowArr, 'i').commit();
    });
};
