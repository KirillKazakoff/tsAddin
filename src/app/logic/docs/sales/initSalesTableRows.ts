import salesContractStore from '../../../stores/docsStores/salesContractStore';
import { CellUtilsT } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { SalesGroupT } from './groupSalesContract';

type SettingsT = {
    groups: SalesGroupT[];
    utils: CellUtilsT<''>;
    isContract: boolean;
};
export const initSalesTableRows = (settings: SettingsT) => {
    const { groups, utils, isContract } = settings;
    const cellName = isContract ? 'Контракт_предмет_массив' : 'Инвойс_предмет_массив';
    const { insertRows } = utils.initRowMaker({ cellName });

    const fontSize = isContract ? 9 : 11;

    insertRows({
        records: groups,
        deleteStartAmount: 1,
        rowSettings: ({ record: r, total }) => {
            const fields = {
                bl: r.blNo,
                product: `${r.product.name}`,
                vessel: r.vessel,
                sort: salesContractStore.fields.isSortGroup ? '-' : r.sort,
                price: r.amount.price.count,
                placesTotal: total.placesTotal.count,
                priceTotal: total.priceTotal.count,
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
