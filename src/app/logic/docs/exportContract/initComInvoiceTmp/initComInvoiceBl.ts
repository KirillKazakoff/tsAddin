import { InitInvoicePartT } from '../../../../types/typesExcelUtils';

export const initComInvoiceBl: InitInvoicePartT = (utils, invoice) => {
    const { setCell, getCell, ws } = utils;
    const { products } = invoice;

    const blArrayCl = getCell('Инвойс_Bl_массив');

    products.forEach((p, index) => {
        const { record, product } = p;
    });
};
