/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../../types/typesExcelUtils';
import { initRowMaker } from '../../../excel/utils/excelUtilsObj/initRows';
import { alignmentCenter, borderAll } from '../../styleRowCells';
import { RequestT } from '../groupContractByNameSort';

export const initRequestRows = (requests: RequestT[], utils: CellUtilsT) => {
    const { insertRows } = initRowMaker(utils.ws, 'Заявка_массив');

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
                        alignment: alignmentCenter,
                        height: 55,
                        border: borderAll,
                    },
                },
            };
        },
    });
};
