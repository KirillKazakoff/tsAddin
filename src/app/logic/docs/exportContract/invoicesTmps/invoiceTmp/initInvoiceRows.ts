/* eslint-disable no-param-reassign */
import { InitInvoicePartT } from '../../../../../types/typesExcelUtils';
import { setFormats } from '../../../../utils/formats';
import { alignmentCenter, fontDefault, styleRowCells } from '../../../styleRowCells';

export const initInvoiceRows: InitInvoicePartT = (utils, invoice) => {
    const { ws } = utils;
    const { productGroups } = invoice;

    ['eng', 'ru'].forEach((language) => {
        // prettier-ignore
        const cellName = language === 'eng' ? 'Инвойс_Bl_массив' : 'Инвойс_Bl_массив_п';
        const arrayCl = utils.getCell(cellName);

        // insert rows
        Object.values(productGroups).forEach((group, i) => {
            const r = group.record;
            const { places, placesTotal, priceTotal } = group.total;
            const { price } = r.amount;

            // there are two empty cols implemented for borders
            // in excel template
            const fields = {
                emptyFirst: '',
                bl: r.blNo || '-',
                vessel: r.vessel.eng.name,
                desc: r.product.eng.name,
                pack: `1/${r.pack} KG`,
                places: places.count,
                placesTotal: placesTotal.count,
                price: price.count,
                priceTotal: priceTotal.count,
            };

            if (language === 'ru') {
                fields.desc = r.product.ru.name;
                fields.vessel = r.vessel.ru.name;
                fields.pack = `1/${r.pack} КГ`;
            }

            if (invoice.agreement.record.terms === 'FCA') {
                delete fields.vessel;
                delete fields.pack;
                delete fields.places;
            }

            const rowIndex = +arrayCl.row + i;
            ws.insertRow(rowIndex, Object.values(fields)).commit();

            // styleRow
            const row = ws.getRow(rowIndex);
            const docType = language === 'ru' ? 'exportEng' : 'exportRu';
            setFormats(row, fields, docType);

            styleRowCells(row, {
                height: 45,
                alignment: alignmentCenter,
                font: fontDefault,
            });
            // styleEndAndStartBorders
            row.getCell(2).border = {
                left: { style: 'thin' },
            };
            row.getCell(row.actualCellCount).border = {
                right: { style: 'thin' },
            };
        });
    });
};
