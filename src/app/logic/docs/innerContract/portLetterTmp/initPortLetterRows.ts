/* eslint-disable no-param-reassign */
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import pageStatusStore from '../../../../stores/pageStatusStore.ts/pageStatusStore';
import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateNumeric } from '../../../excel/utils/getExcelDate';
import { ContractRowT } from '../groupByContractNo';

export const initPortLetterRows = (rows: ContractRowT[], utils: CellUtilsT<''>) => {
    const { insertRows } = utils.initRowMaker({ cellName: 'Письмо_массив' });

    insertRows({
        records: rows,
        deleteStartAmount: 1,
        rowSettings: ({ row: r, mateRow }) => {
            const date = mateRow?.date;
            if (!date) {
                pageStatusStore.setPageStatus('mismatchKonosamentId', r.konosament);
                return null;
            }
            // prettier-ignore
            const fields = {
                konosament: `${r.konosament} от ${getExcelDateNumeric(mateRow.date, 'ru')}`,
                product: `${r.product.ru.name} ${r.sort}`,
                vessel: r.vessel.ru.name,
                pack: `1/${r.pack} кг`,
                places: r.amount.places.count,
                placesTotal: r.amount.placesTotal.count,
            };

            if (portLetterStore.fields.termsPort === 'FCA') {
                delete fields.places;
                delete fields.pack;
            }

            return {
                fields,
                docType: 'inner',
                style: {
                    common: {
                        border: 'all',
                        alignment: 'center',
                        height: 35,
                    },
                },
            };
        },
    });
};
