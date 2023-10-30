/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { RequestT } from '../groupContractByNameSort';

export const initRequestRows = (requests: RequestT[], utils: CellUtilsT<''>) => {
    const { insertRows } = utils.initRowMaker({ cellName: 'Заявка_массив' });

    insertRows({
        records: requests,
        deleteStartAmount: 1,
        rowSettings: ({ record, amountTotal }) => {
            const fields = {
                vessel: record.vessel.ru.name,
                product: record.product.ru.name,
                sort: record.sort,
                pack: record.product.ru.pack,
                placesTotal: amountTotal.count,
                price: record.amount.price.count,
                priceTotal: record.amount.priceTotal.count,
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
