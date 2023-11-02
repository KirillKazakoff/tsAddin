/* eslint-disable no-param-reassign */
import { InnerRowT } from '../../../../types/typesTables';
import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';

export const initRequestRows = (rows: InnerRowT[], utils: CellUtilsT<''>) => {
    const { insertRows } = utils.initRowMaker({ cellName: 'Заявка_массив' });

    insertRows({
        records: rows,
        deleteStartAmount: 1,
        rowSettings: (r) => {
            const fields = {
                vessel: r.vessel.ru.name,
                product: r.product.ru.name,
                sort: r.sort,
                pack: r.product.ru.pack,
                placesTotal: r.amount.places.count,
                price: r.amount.price.count,
                priceTotal: r.amount.priceTotal.count,
            };

            return {
                fields,
                docType: 'inner',
                style: {
                    common: {
                        alignment: 'center',
                        height: 55,
                        border: 'all',
                    },
                },
            };
        },
    });
};
