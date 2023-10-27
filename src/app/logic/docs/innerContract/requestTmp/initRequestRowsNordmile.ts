/* eslint-disable no-param-reassign */
import { NordmileRowT } from '../../../../types/typesTables';
import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { alignmentCenter, borderAll } from '../../../excel/utils/styleRowCells';

export const initRequestRowsNordmile = (rows: NordmileRowT[], utils: CellUtilsT<0>) => {
    const { insertRows } = utils.initRowMaker({ cellName: 'Заявка_массив' });

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
