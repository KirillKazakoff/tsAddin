/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { InnerGroupT } from '../groupByContractNo';

export const initRequestRows = (groups: InnerGroupT[], utils: CellUtilsT<''>) => {
    const { insertRows } = utils.initRowMaker({ cellName: 'Заявка_массив' });

    insertRows({
        records: groups,
        deleteStartAmount: 1,
        rowSettings: ({ record: r, total }) => {
            const fields = {
                vessel: r.row.vessel.ru.name,
                product: r.row.product.ru.name,
                sort: r.row.sort,
                pack: r.row.product.ru.pack,
                placesTotal: total.placesTotal.count,
                price: r.row.amount.price.count,
                priceTotal: total.priceTotal.count,
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
