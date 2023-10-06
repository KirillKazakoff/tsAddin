import { InitInvoicePartT } from '../../../../../types/typesExcelUtils';
import { initRowMaker } from '../../../../excel/utils/excelUtilsObj/initRows';
import { alignmentCenter, fontDefault } from '../../../styleRowCells';

export const initInvoiceRowsFCA: InitInvoicePartT = (utils, invoice) => {
    // initRows
    const { productGroups } = invoice;

    ['eng', 'ru'].forEach((language) => {
        // initTitles
        const cellName = language === 'eng' ? 'Инвойс_Bl_массив' : 'Инвойс_Bl_массив_п';
        const docType = language === 'ru' ? 'exportEng' : 'exportRu';
        const { insertRows } = initRowMaker(utils.ws, cellName);

        const titlesRow = utils.getRow(cellName, -1);
        utils.mergeCells({ startCol: 1, endCol: 4, row: titlesRow.number });
        utils.mergeCells({ startCol: 5, endCol: 6, row: titlesRow.number });

        insertRows({
            records: Object.values(productGroups),
            rowSettings: (group) => {
                const r = group.record;
                const { placesTotal, priceTotal } = group.total;
                const { price } = r.amount;

                const fields = {
                    emptyFirst: '',
                    desc: r.product.eng.name,
                    placesTotal: placesTotal.count,
                    price: price.count,
                    priceTotal: priceTotal.count,
                };

                if (language === 'ru') {
                    fields.desc = r.product.ru.name;
                }

                // prettier-ignore
                return {
                    fields,
                    docType,
                    merge: [{ start: 1, end: 4 }, { start: 5, end: 6 }],
                    style: {
                        common: {
                            height: 30,
                            alignment: alignmentCenter,
                            font: fontDefault,
                        },
                        special: [
                            { index: 2, style: { border: { left: { style: 'thin' } } } },
                            { index: 'last', style: { border: { right: { style: 'thin' } } } },
                        ],
                    },
                };
            },
        });
    });
};
