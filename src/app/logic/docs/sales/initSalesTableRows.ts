import salesContractStore from '../../../stores/docsStores/salesContractStore';
import { CellUtilsT } from '../../../types/typesExcelUtils';
import { SalesRowT } from '../../../types/typesTables';
import { initRowMaker } from '../../excel/utils/excelUtilsObj/initRows';
import { alignmentCenter } from '../styleRowCells';

type SettingsT = {
    rows: SalesRowT[];
    utils: CellUtilsT;
    isContract: boolean;
};
export const initSalesTableRows = (settings: SettingsT) => {
    const { rows, utils, isContract } = settings;
    const cellName = isContract
        ? 'Контракт_предмет_массив'
        : 'Инвойс_предмет_массив';
    const { insertRows } = initRowMaker(utils.ws, cellName);

    const fontSize = isContract ? 9 : 11;

    console.log(rows);

    insertRows({
        records: rows,
        deleteStartAmount: 1,
        rowSettings: (r) => {
            const filling = r.isLive
                ? `\nFilling: ${salesContractStore.fields.filling}`
                : '';
            const fields = {
                bl: r.blNo,
                product: `${r.product.name}${filling}`,
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
                        height: 40,
                        alignment: alignmentCenter,
                        font: { size: fontSize, name: 'Batang' },
                        border: { bottom: { style: 'thin' } },
                    },
                    special: [
                        {
                            index: 1,
                            style: { border: { bottom: { style: 'thin' }, left: { style: 'thin' } } },
                        },
                        {
                            index: 'last',
                            style: { border: { bottom: { style: 'thin' }, right: { style: 'thin' } } },
                        },
                    ],
                },
            };
        },
    });
};
