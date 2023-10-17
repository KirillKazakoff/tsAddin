/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../../types/typesExcelUtils';
import { NordmileRowT } from '../../../../types/typesTables';
import { alignmentCenter, borderAll } from '../../styleRowCells';
import { initRowMaker } from '../../../excel/utils/excelUtilsObj/initRows';

export const initRequestRowsNordmile = (rows: NordmileRowT[], utils: CellUtilsT) => {
    const { insertRows } = initRowMaker(utils.ws, 'Заявка_массив');

    insertRows({
        records: rows,
        deleteStartAmount: 1,
        rowSettings: (r) => {
            const fields = {
                vessel: r.producer,
                product: r.product,
                pack: r.pack,
                placesTotal: r.amount.placesTotal.count,
                price: r.amount.price.count,
                priceTotal: r.amount.priceTotal.count,
            };
            return {
                fields,
                docType: 'inner',
                style: {
                    common: {
                        alignment: alignmentCenter,
                        height: 45,
                        border: borderAll,
                    },
                },
            };
        },
    });
};
