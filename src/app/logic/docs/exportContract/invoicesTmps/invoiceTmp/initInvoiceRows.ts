/* eslint-disable no-param-reassign */
import { InitInvoicePartT } from '../../../../../types/typesExcelUtils';
import { initRowMaker } from '../../../../excel/utils/excelUtilsObj/initRows';

export const initInvoiceRows: InitInvoicePartT = (utils, invoice) => {
    const { productSortGroups } = invoice;

    ['eng', 'ru'].forEach((language) => {
        // prettier-ignore
        const cellName = language === 'eng' ? 'Инвойс_Bl_массив' : 'Инвойс_Bl_массив_п';
        const docType = language === 'eng' ? 'exportEng' : 'exportRu';
        const { insertRows } = initRowMaker(utils.ws, cellName);

        insertRows({
            records: Object.values(productSortGroups),
            rowSettings: (group) => {
                const r = group.record;
                const { places, placesTotal, priceTotal } = group.total;
                const { price } = r.amount;

                const fields = {
                    emptyFirst: '',
                    bl: r.blNo || '-',
                    vessel: r.vessel.eng.name,
                    desc: r.product.eng.name,
                    pack: `1/${r.pack} kg`,
                    places: places.count,
                    placesTotal: placesTotal.count,
                    price: price.count,
                    priceTotal: priceTotal.count,
                };

                if (language === 'ru') {
                    fields.desc = r.product.ru.name;
                    fields.vessel = r.vessel.ru.name;
                    fields.pack = `1/${r.pack} кг`;
                }

                if (invoice.agreement.record.terms === 'FCA') {
                    delete fields.vessel;
                    delete fields.pack;
                    delete fields.places;
                }

                // prettier-ignore
                return {
                    fields,
                    docType,
                    style: {
                        common: {
                            height: 45,
                            alignment: 'center',
                            border: 'edges',
                            font: { size: 10 },
                        },
                    },
                };
            },
        });
    });
};
