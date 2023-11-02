import { SalesRowT } from '../../../types/typesTables';
import { CellUtilsT } from '../../excel/utils/excelUtilsObj/initExcelUtils';

type SettingsT = {
    rows: SalesRowT[];
    utils: CellUtilsT<''>;
    isContract: boolean;
};
export const initSalesTableRows = (settings: SettingsT) => {
    const { rows, utils, isContract } = settings;
    const cellName = isContract ? 'Контракт_предмет_массив' : 'Инвойс_предмет_массив';
    const { insertRows } = utils.initRowMaker({ cellName });

    const fontSize = isContract ? 9 : 11;

    insertRows({
        records: rows,
        deleteStartAmount: 1,
        rowSettings: (r) => {
            const fields = {
                bl: r.blNo,
                product: `${r.product.name}`,
                vessel: r.vessel,
                sort: r.sort,
                price: r.amount.price.count,
                placesTotal: r.amount.placesTotal.count,
                priceTotal: r.amount.priceTotal.count,
            };

            if (isContract) {
                delete fields.bl;
                delete fields.vessel;
            }

            // prettier-ignore
            return {
                fields,
                docType: 'sales',
                style: {
                    common: {
                        height: 35,
                        alignment: 'center',
                        border: 'outside',
                        font: { size: fontSize, name: 'Batang' },
                    },
                },
            };
        },
    });
};
